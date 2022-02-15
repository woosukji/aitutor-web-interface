<template>
  <div class="n-choice d-flex flex-column">
    <div class="options d-flex flex-column">
      <v-btn
        v-for="(option, idx) in optionList"
        :key="idx"
        :disabled="choiceIdx === idx"
        @click="choiceIdx = idx"
        color="accent"
        class="mb-2"
      >
        <div v-katex:auto="katexConfig">{{ option }}</div>
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <v-btn
      class="chosen mt-4"
      :disabled="choiceIdx === undefined"
      @click="onChosen"
      color="primary"
      >done!</v-btn
    >
  </div>
</template>

<script>
import katexConfig from "@/plugins/vue-katex";

export default {
  name: "NChoice",
  props: {
    optionList: Array,
  },
  data() {
    return {
      katexConfig,
      choiceIdx: undefined,
    };
  },
  computed: {
    choiceNum() {
      return this.choiceIdx + 1;
    },
  },
  methods: {
    onChosen() {
      this.$emit("chosen", this.choiceNum);
    },
  },
};
</script>

<style scoped lang="scss"></style>
