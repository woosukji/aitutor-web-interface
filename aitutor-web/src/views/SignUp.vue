<template>
  <div class="sign-up">
    <base-top-bar elevation="0" color="transparent"></base-top-bar>
    <h1>This is a signup page</h1>
    <router-link to="/">sign up</router-link>
  </div>
</template>

<script>
import BaseTopBar from "@/components/BaseTopBar.vue";

export default {
  name: "SignUp",
  components: { BaseTopBar },
  data() {
    return {};
  },
  methods: {},
};
</script>
