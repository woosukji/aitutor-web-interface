import Vue from "vue";
import { onAuthStateChanged } from "firebase/auth";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth } from "./plugins/firebase";
import {} from "./plugins/vue-katex";
import "katex/dist/katex.min.css";

Vue.config.productionTip = false;

let app;
onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }

  if (user) {
    store.dispatch("fetchUserProfile", user);
  } else if (router.currentRoute.path !== "/") {
    // redirect to login view
    router.push("/");
  }
});
