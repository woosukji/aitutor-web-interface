<template>
  <v-card max-width="300" elevation="0">
    <v-img
      class="white--text align-end rounded-lg"
      height="200px"
      :src="cardImageSrc"
    >
    </v-img>

    <v-card-text text-center class="font-weight-bold">
      <slot> </slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardProblem",
  props: {
    cardImageSrc: String,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped lang="scss"></style>
