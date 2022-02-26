import Vue from "vue";
import Vuex from "vuex";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import {
  auth,
  storage,
  usersCollection,
  problemsCollection,
  logsCollection,
  smallChapterListsCollection,
  middleChapterListsCollection,
  reportsCollection,
} from "../plugins/firebase";
import { extractOptionListFromText } from "../util/ProblemHelper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
    showLoading: false,
    showAlert: false,
    alertMessage: "",
    alertType: "error",
  },
  mutations: {
    loading(state) {
      state.showLoading = true;
    },
    unLoading(state) {
      state.showLoading = false;
    },
    alert(state, alertConfig) {
      /*
      지정한 시간동안 App.vue 의 <v-alert> 표시
      type : ["success", "info", "warning", "error"]
      */
      const { message, type = "error", timeMs = 3000 } = alertConfig;

      state.alertMessage = message;
      state.alertType = type;

      state.showAlert = true;
      setTimeout(() => {
        state.showAlert = false;
      }, timeMs);
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val;
    },
  },
  actions: {
    async signup(_, form) {
      // sign user up
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);

      // create user object in userCollections
      const userRef = doc(usersCollection, user.uid);
      setDoc(userRef, {
        email: form.email,
        name: form.name,
        semester: form.semester,
        authorized: false,
      });
    },
    async login({ dispatch, commit }, form) {
      // sign user in
      const { user } = await signInWithEmailAndPassword(auth, form.email, form.password);

      // fetch user profile
      const userRef = doc(usersCollection, user.uid);
      const userProfile = await getDoc(userRef);
      const userData = userProfile.data();

      const { authorized: isUserAuthorized = false } = userData;
      if (!isUserAuthorized) {
        await dispatch("logout");
        const error = { code: "user-unauthorized" };
        throw error;
      }

      // set user profile in state
      commit("setUserProfile", { uid: userProfile.id, ...userData });
    },
    async logout({ commit }) {
      // log user out
      await signOut(auth);

      // clear user data from state
      commit("setUserProfile", {});
    },

    async loadSmallChapterList({ state }) {
      const smallChapterListRef = doc(smallChapterListsCollection, state.userProfile.semester);
      const smallChapterList = await getDoc(smallChapterListRef);
      return smallChapterList.data().smallChapterList;
    },
    async loadMiddleChapterList({ state }) {
      const middleChapterListRef = doc(middleChapterListsCollection, state.userProfile.semester);
      const middleChapterList = await getDoc(middleChapterListRef);
      return middleChapterList.data().middleChapterList;
    },
    async loadChapterTestProblems({ state }, chapter) {
      const problemsQuery = query(
        problemsCollection,
        where("학년", "==", state.userProfile.semester),
        where("소단원", "==", chapter),
        orderBy("confidence_rate", "desc"),
        limit(15)
      );

      const chapterTestProblems = [];
      const querySnapshot = await getDocs(problemsQuery);
      querySnapshot.forEach((document) => {
        chapterTestProblems.push({ uid: document.id, ...document.data() });
      });
      return chapterTestProblems;
    },
    async loadRecommendedProblem({ state, dispatch }, data) {
      const { middleChapter, sessionRecords } = data;

      const recommendedProblemUid = await dispatch("loadRecommendedProblemUid", {
        userUid: state.userProfile.uid,
        middleChapter,
        sessionRecords,
      });
      console.log(recommendedProblemUid);

      const problemRef = doc(problemsCollection, recommendedProblemUid);
      const recommendedProblem = await getDoc(problemRef);
      console.log(recommendedProblem);

      return { uid: recommendedProblem.id, ...recommendedProblem.data() };
    },
    async loadRecommendedProblemUid(_, data) {
      /*
      TODO: 문제 추천 알고리즘 implementation
      *** input(data): 현재 문제풀이 세션에서 유저의 사용 정보
                        - userUid: 유저 UID
                        - middleChapter: 선택한 중단원 이름
                        - sessionRecords: 현재 세션의 풀이 기록;
                                          {problemUid: 문제 UID, isCorrect: 정답 여부}
                                          와 같은 Object가 풀이 순서에 따라 나열된 Array
      */
      const { middleChapter } = data;

      const problemsQuery = query(
        problemsCollection,
        where("중단원", "==", middleChapter),
        orderBy("confidence_rate", "desc"),
        limit(15)
      );
      const querySnapshot = await getDocs(problemsQuery);

      const filteredRecommendedProblems = querySnapshot.docs
        .map((document) => {
          return { uid: document.id, ...document.data() };
        })
        .filter((problem) => {
          return extractOptionListFromText(problem.text).isValid;
        });

      const index = Math.floor(Math.random() * filteredRecommendedProblems.length);
      return filteredRecommendedProblems[index].uid;
    },
    async recordProblemSolveLog({ state }, data) {
      const { problemUid, studentChoice, isCorrect, elapsedTime } = data;
      await addDoc(logsCollection, {
        submitTime: serverTimestamp(),
        userUid: state.userProfile.uid,
        problemUid,
        studentChoice,
        isCorrect,
        elapsedTime,
      });
    },
    loadProblemFigureUrl(_, problemImgName = "풍산자  테스트북 중3_2_본문(학생용)1024_008_0.jpg") {
      const figName = `${problemImgName.slice(0, problemImgName.lastIndexOf(".jpg"))}_fig.jpg`;
      const figDir = `problem_images/mid_3_2/${figName}`;

      const problemImageRef = ref(storage, figDir);

      return getDownloadURL(problemImageRef);
    },
    async recordBadProblemReport({ state }, reportData) {
      const { description, problemUid } = reportData;
      const faults = reportData.faults.slice();

      await addDoc(reportsCollection, {
        submitTime: serverTimestamp(),
        userUid: state.userProfile.uid,
        problemUid,
        description,
        faults,
      });
    },
  },
  modules: {},
});
