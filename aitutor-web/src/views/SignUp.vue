<template>
  <div class="sign-up">
    <h1>This is a signup page</h1>
    <router-link to="/">sign up</router-link>
    <div class="mathjax-test">
      <textarea v-model="formula" cols="30" rows="10"></textarea>
      <div v-katex:auto="katexConfig" :key="formula">{{ formula }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  components: {},
  data() {
    return {
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
      katexConfig: {
        options: {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true },
          ],
        },
      },
    };
  },
  methods: {},
};
</script>
