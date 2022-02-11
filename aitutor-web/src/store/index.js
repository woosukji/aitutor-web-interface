import Vue from "vue";
import Vuex from "vuex";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, usersCollection, problemsCollection } from "../plugins/firebase";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val;
    },
  },
  actions: {
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);

      // create user object in userCollections
      await usersCollection.doc(user.uid).set({
        name: form.name,
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
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

      console.log(userProfile.exists());

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      console.log(this.state.userProfile);

      // change route to dashboard
      if (router.currentRoute.path === "/") {
        router.push("/main");
      }
    },
    async logout({ commit }) {
      // log user out
      await signOut(auth);

      // clear user data from state
      commit("setUserProfile", {});

      // redirect to login view
      router.push("/login");
    },

    async loadChapterTestProblems(_, chapter) {
      console.log(chapter);
      const problemsQuery = query(
        problemsCollection,
        where("학년", "==", "중등 3-1"),
        where("교재 이름", "==", "개념완성 중3_1_강의용 부록(강의용)"),
        where("소단원", "==", chapter),
        where("confidence_rate", ">=", 0.7)
      );

      const chapterTestProblems = [];
      const querySnapshot = await getDocs(problemsQuery);
      console.log(querySnapshot);
      querySnapshot.forEach((document) => {
        console.log(document.data());
        chapterTestProblems.push(document.data());
      });
      return chapterTestProblems;
    },
  },
  modules: {},
});
