<template>
  <v-form
    @submit.prevent="onSubmit"
    class="login-form d-flex flex-column"
    v-model="valid"
    ref="loginForm"
    lazy-validation
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
        (v) => !!v || "이메일을 입력해 주세요.",
        (v) => /.+@.+\..+/.test(v) || "올바르지 않은 이메일입니다.",
      ],
      password: "",
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }

      this.$emit("submit", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
