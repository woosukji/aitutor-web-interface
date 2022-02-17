<template>
  <v-card max-width="300" elevation="0">
    <v-card-text class="font-weight-bold text-left">
      <div v-katex:auto="katexConfig">{{ cardText }}</div>
    </v-card-text>

    <v-img
      v-if="cardImageSrc.length > 0"
      class="white--text align-end rounded-lg"
      height="200px"
      :src="cardImageSrc"
    >
    </v-img>
  </v-card>
</template>

<script>
import katexConfig from "@/plugins/vue-katex";

export default {
  name: "CardProblem",
  props: {
    cardImageSrc: String,
    cardText: String,
  },
  data() {
    return {
      katexConfig,
    };
  },
  computed: {},
};
</script>

<style scoped lang="scss"></style>
