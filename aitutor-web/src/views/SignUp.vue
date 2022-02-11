<template>
  <div class="sign-up">
    <h1>This is a signup page</h1>
    <router-link to="/">sign up</router-link>
    <div class="katex-test">
      <textarea v-model="formula" cols="30" rows="10"></textarea>
      <div v-katex:auto="katexConfig" :key="formula">{{ formula }}</div>
    </div>
  </div>
</template>

<script>
import katexConfig from "@/plugins/vue-katex";

export default {
  name: "SignUp",
  components: {},
  data() {
    return {
      katexConfig,
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
    };
  },
  methods: {},
};
</script>
