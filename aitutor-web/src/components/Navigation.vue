<template>
  <base-top-bar color="primary" dark app>
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
        <v-list-item @click="handleLogout">
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
    showExitBtn() {
      return ["/daily-problems", "/chapter-test"].includes(this.$route.path);
    },
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss"></style>
