<template>
  <div class="n-choice d-flex flex-column">
    <div class="options d-flex flex-column">
      <v-btn
        v-for="(option, i) in optionList"
        :key="i"
        :disabled="choice === i"
        @click="choice = i"
        color="accent"
        class="mb-2"
        >{{ option }}</v-btn
      >
    </div>
    <v-spacer></v-spacer>
    <v-btn
      class="chosen mt-4"
      :disabled="choice === undefined"
      @click="onChosen"
      color="primary"
      >done!</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "NChoice",
  props: {
    optionList: Array,
  },
  data() {
    return {
      choice: undefined,
    };
  },
  computed: {},
  methods: {
    onChosen() {
      this.$emit("chosen", this.choice);
    },
  },
};
</script>

<style scoped lang="scss"></style>
