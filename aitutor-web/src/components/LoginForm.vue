<template>
  <v-form
    @submit.prevent="onSubmit"
    class="login-form d-flex flex-column"
    v-model="valid"
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      type="password"
      label="Password"
      required
    ></v-text-field>
    <v-btn type="submit" color="primary">Sign In</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "LoginForm",
  props: {},
  data() {
    return {
      valid: false,
      email: "example@agilesoda.ai",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      password: "",
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      this.$emit("submit", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
