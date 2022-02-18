<template>
  <v-row no-gutters class="landing pa-0 ma-0">
    <v-col class="d-none d-md-block grey" cols="4"> </v-col>
    <v-col class="col-12 col-md-8">
      <base-top-bar class="main_bar" elevation="0" color="transparent">
      </base-top-bar>
      <v-container
        class="main_panel d-flex flex-column justify-center align-center"
      >
        <login-form @submit="handleLogin" style="width: 200px"></login-form>
        <v-btn to="/sign-up" class="mt-4" style="width: 200px">Sign Up</v-btn>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import BaseTopBar from "@/components/BaseTopBar.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: { BaseTopBar, LoginForm },
  name: "Landing",
  methods: {
    handleLogin(form) {
      this.$store.dispatch("login", {
        email: form.email,
        password: form.password,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.landing {
  height: 100%;
  width: 100%;
}
.main_panel {
  height: calc(100vh - 64px);
}
</style>
