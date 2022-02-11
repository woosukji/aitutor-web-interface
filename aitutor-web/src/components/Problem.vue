<template>
  <v-container class="problem">
    <v-row align="center" class="flex-column flex-sm-row">
      <v-col class="d-flex justify-center justify-sm-start">
        <card-problem
          :card-image-src="currentProblem.imgSrc"
          :card-text="currentProblem.questionText"
        >
        </card-problem>
      </v-col>

      <v-col>
        <n-choice
          :option-list="currentProblem.optionList"
          @chosen="onChosen"
        ></n-choice>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardProblem from "@/components/CardProblem.vue";
import NChoice from "@/components/NChoice.vue";

export default {
  name: "Problem",
  components: { CardProblem, NChoice },
  props: {
    currentProblem: Object,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onChosen(e) {
      this.$emit("chosen", e);
    },
  },
};
</script>

<style scoped lang="scss"></style>
