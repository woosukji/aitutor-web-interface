import Vue from "vue";
import Vuex from "vuex";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
  /* setDoc, */
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import {
  auth,
  storage,
  usersCollection,
  problemsCollection,
  logsCollection,
} from "../plugins/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
    showLoading: false,
    showError: false,
    errorMessage: "",
  },
  mutations: {
    loading(state) {
      state.showLoading = true;
    },
    unLoading(state) {
      state.showLoading = false;
    },
    error(state, message, time = 3000) {
      state.showError = true;
      state.errorMessage = message;
      setTimeout(() => {
        state.showError = false;
      }, time);
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val;
    },
  },
  actions: {
    async signup(/* { dispatch } */ _, form) {
      // sign user up
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await deleteUser(user);

      /* // create user object in userCollections
      const userRef = doc(usersCollection, user.uid);
      setDoc(userRef, {
        email: form.email,
        name: form.name,
        semester: form.semester,
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user); */
    },
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await signInWithEmailAndPassword(auth, form.email, form.password);

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userRef = doc(usersCollection, user.uid);
      const userProfile = await getDoc(userRef);

      // set user profile in state
      commit("setUserProfile", { uid: userProfile.id, ...userProfile.data() });
    },
    async logout({ commit }) {
      // log user out
      await signOut(auth);

      // clear user data from state
      commit("setUserProfile", {});
    },

    async loadChapterTestProblems(_, chapter) {
      const problemsQuery = query(
        problemsCollection,
        where("학년", "==", "중등 3-2"),
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
    loadProblemFigure(_, problemImgName = "풍산자  테스트북 중3_2_본문(학생용)1024_008_0.jpg") {
      const figName = `${problemImgName.slice(0, problemImgName.lastIndexOf(".jpg"))}_fig.jpg`;
      const figDir = `problem_images/mid_3_2/${figName}`;

      const problemImageRef = ref(storage, figDir);

      return getDownloadURL(problemImageRef);
    },
  },
  modules: {},
});
