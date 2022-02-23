<template>
  <v-container class="problem-result font-weight-bold">
    <v-row class="mt-n6 ml-n6">
      <card-problem
        :card-image-src="currentProblem.imgSrc"
        :card-text="currentProblem.questionText"
      >
      </card-problem>
    </v-row>
    <v-row>
      {{ `정답: ${["①", "②", "③", "④", "⑤"][currentProblem.answer - 1]} ` }}
      <span class="ml-2" v-katex:auto="katexConfig">{{
        currentProblem.optionList[currentProblem.answer - 1]
      }}</span>
    </v-row>
    <v-row v-if="!isCorrect">
      {{ `내가 고른 답: ${["①", "②", "③", "④", "⑤"][studentChoice - 1]} ` }}
      <span class="ml-2" v-katex:auto="katexConfig">{{
        currentProblem.optionList[studentChoice - 1]
      }}</span>
    </v-row>
    <v-row class="mt-6">
      <v-btn color="primary" @click="$emit('previous')"> 이전 문제 </v-btn>
      <v-btn color="primary" @click="$emit('next')" class="ml-4">
        다음 문제
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import CardProblem from "@/components/CardProblem.vue";
import katexConfig from "@/plugins/vue-katex";

export default {
  name: "ProblemResult",
  components: { CardProblem },
  props: {
    currentProblem: Object,
    studentChoice: Number,
    isCorrect: Boolean,
  },
  data() {
    return {
      katexConfig,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss"></style>
