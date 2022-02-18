<template>
  <base-top-bar color="primary" dark app>
    <div class="main-dash-toggle d-flex align-center" v-if="showMainDashToggle">
      <v-btn to="/main" text>
        <span>Main</span>
      </v-btn>
      <v-btn to="/dashboard" text>
        <span>Dashboard</span>
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-btn v-if="showExitBtn" to="/main" text>
      <span>Go to Main</span>
    </v-btn>

    <v-menu open-on-hover offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/change-info">
          <span>Change Info</span>
        </v-list-item>
        <v-list-item to="/">
          <span>Log out</span>
        </v-list-item>
      </v-list>
    </v-menu>
  </base-top-bar>
</template>

<script>
import BaseTopBar from "@/components/BaseTopBar.vue";

export default {
  name: "Nagivation",
  components: { BaseTopBar },
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
