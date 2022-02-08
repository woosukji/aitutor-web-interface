<template>
  <v-card :to="cardTo" max-width="300" elevation="0">
    <v-img
      class="white--text align-end rounded-lg"
      height="200px"
      :src="cardImageSrc"
    >
      <v-card-title>{{ cardTitle }}</v-card-title>
    </v-img>

    <v-card-text text-center class="font-weight-bold">
      <slot> </slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardVertical",
  props: {
    cardTo: String,
    cardTitle: String,
    cardImageSrc: String,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped lang="scss"></style>
