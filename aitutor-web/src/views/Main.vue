<template>
  <div class="main d-flex justify-center align-center">
    <div class="main_selection d-flex flex-grow-1 flex-wrap justify-center">
      <card-vertical
        card-to="/chapter-test"
        card-title="Chapter Test"
        card-image-src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      >
        <div>배운 단원을 복습하면서</div>
        <div>실력을 확인하세요.</div>
      </card-vertical>
      <card-vertical
        card-to="/daily-problems"
        card-title="Daily Problems"
        card-image-src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <div>오늘의 추천 문제를 풀고</div>
        <div>당신의 수학 실력을 향상시키세요.</div>
      </card-vertical>
      <!--       <router-link to="/daily-problems">Daily Problems</router-link>
      <router-link to="/chapter-test">Chapter test</router-link> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardVertical from "@/components/CardVertical.vue";

export default {
  name: "Main",
  components: { CardVertical },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.main {
  height: 100%;
}
</style>
