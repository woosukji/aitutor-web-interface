<template>
  <v-row no-gutters class="landing pa-0 ma-0">
    <v-col class="d-none d-md-block grey" cols="4"> </v-col>
    <v-col class="col-12 col-md-8">
      <v-app-bar class="main_bar" elevation="0" color="transparent">
        <div class="logo d-flex align-center">
          <v-img
            alt="Agilesoda Logo"
            class="shrink mr-2"
            contain
            src="../assets/agilesoda_logo.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Agilesoda Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="../assets/agilesoda_name.png"
            width="100"
          />
        </div>

        <v-spacer></v-spacer>
      </v-app-bar>
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
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: { LoginForm },
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
