<template>
  <v-app>
    <navigation v-if="showNavigation" />
    <v-main>
      <router-view />
    </v-main>
    <v-overlay :value="$store.state.showLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-alert
      class="alert"
      :value="$store.state.showError"
      type="error"
      transition="fade-transition"
      >{{ $store.state.errorMessage }}</v-alert
    >
  </v-app>
</template>

<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";

export default {
  name: "App",
  components: { Navigation },
  data() {
    return {};
  },
  computed: {
    showNavigation() {
      return !["/", "/sign-up"].includes(this.$route.path);
    },
  },
  beforeMount() {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = ""; // eslint-disable-line no-param-reassign
    });
    window.addEventListener("unload", () => {
      if (Object.keys(this.$store.state.userProfile).length !== 0) {
        this.$store.dispatch("logout");
      }
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

a {
  padding: 1rem;

  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}

.alert {
  position: absolute !important;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
