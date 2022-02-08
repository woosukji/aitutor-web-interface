<template>
  <div class="landing">
    <img alt="Vue logo" src="../assets/agilesoda_logo.png" />
    <div>Welcome to Agilesoda AI Tutor service!</div>
    <div class="register">
      <router-link to="/main">login</router-link>
      <router-link to="/sign-up">sign up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing",
};
</script>
