<template>
  <div class="sign-up">
    <base-top-bar elevation="0" color="transparent">
      <v-btn to="/" color="primary">
        <span>Back</span>
      </v-btn>
    </base-top-bar>
    <v-container class="panel d-flex justify-center align-center pa-8">
      <v-form
        class="login-form flex-grow-1 d-flex flex-column"
        @submit.prevent="handleSignUp"
        v-model="valid"
        ref="signUpForm"
        lazy-validation
        style="max-width: 300px"
      >
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="이름"
          required
        ></v-text-field>
        <v-autocomplete
          :items="semesterList"
          v-model="semester"
          :rules="semesterRules"
          chips
        ></v-autocomplete>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :error-messages="emailErrors"
          label="이메일"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="비밀번호"
          required
        ></v-text-field>
        <v-text-field
          v-model="passwordAgain"
          :rules="passwordAgainRules"
          type="password"
          label="비밀번호 확인"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary">Sign In</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import BaseTopBar from "@/components/BaseTopBar.vue";
import { semesterList } from "@/util/DemoHelper";

export default {
  name: "SignUp",
  components: { BaseTopBar },
  data() {
    return {
      valid: false,
      name: "",
      nameRules: [(v) => !!v || "이름을 입력해 주세요."],
      semesterList,
      semester: "",
      semesterRules: [(v) => !!v || "학기를 선택해 주세요."],
      email: "example@agilesoda.ai",
      emailRules: [
        (v) => !!v || "이메일을 입력해 주세요.",
        (v) => /.+@.+\..+/.test(v) || "올바르지 않은 이메일입니다.",
      ],
      emailErrors: [],
      password: "",
      passwordRules: [
        (v) => !!v || "비밀번호를 입력해 주세요.",
        (v) => v.length >= 6 || "비밀번호는 6자 이상이어야 합니다.",
      ],
      passwordAgain: "",
      passwordAgainRules: [
        (v) => v === this.password || "비밀번호가 같지 않습니다.",
      ],
    };
  },
  computed: {},
  methods: {
    async handleSignUp() {
      if (!this.$refs.signUpForm.validate()) {
        return;
      }
      this.$store.commit("loading");

      try {
        await this.$store.dispatch("signup", {
          email: this.email,
          password: this.password,
          name: this.name,
          semester: this.semester,
        });
        this.$router.push("/");
        this.$store.commit("alert", {
          message:
            "회원가입이 완료되었습니다! 1~2일 내 계정 확인 후 로그인 가능합니다.",
          type: "success",
          timeMs: 10000,
        });
      } catch (e) {
        switch (e.code) {
          case "auth/email-already-in-use": {
            this.emailErrors = ["이미 가입된 이메일입니다."];
            const unwatch = this.$watch("email", () => {
              this.emailErrors = [];
              unwatch();
            });
            break;
          }
          default:
            this.$store.commit("alert", { message: e.code });
            console.dir(e);
        }
      }

      this.$store.commit("unLoading");
    },
  },
};
</script>

<style scoped lang="scss">
.sign-up {
  height: 100%;
  width: 100%;
  .panel {
    height: calc(100vh - 64px);
  }
}
</style>
