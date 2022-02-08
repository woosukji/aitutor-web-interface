<template>
  <v-app>
    <navigation v-if="showNavigation" />
    <v-content>
      <router-view />
    </v-content>
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
</style>
