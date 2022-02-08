<template>
  <div class="navigation">
    <img alt="Logo" src="../assets/agilesoda_logo.png" />
    <span class="main-dash-toggle" v-if="showMainDashToggle">
      <router-link to="main">main</router-link>
      <router-link to="dashboard">dashboard</router-link>
    </span>
    <span class="exit" v-if="showExitBtn">
      <router-link to="/main">go to main</router-link>
    </span>
    <span class="profile">
      <router-link to="/change-info">profile</router-link>
      <router-link to="/">logout</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "Nagivation",
  data() {
    return {};
  },
  computed: {
    showMainDashToggle() {
      return ["/main", "/dashboard"].includes(this.$route.path);
    },
    showExitBtn() {
      return ["/daily-problems", "/chapter-test"].includes(this.$route.path);
    },
  },
};
</script>

<style scoped lang="scss"></style>
