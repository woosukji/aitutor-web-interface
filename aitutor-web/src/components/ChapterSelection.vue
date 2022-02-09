<template>
  <v-card max-width="800" elevation="0">
    <v-list-item>
      <div class="text-h6">학습할 소단원을 선택해 주세요.</div>

      <v-spacer></v-spacer>

      <v-btn large :disabled="selection === undefined" @click="onSelected"
        >Done</v-btn
      >
    </v-list-item>

    <v-autocomplete
      class="mx-4"
      :items="chapterList"
      v-model="selection"
      chips
    ></v-autocomplete>
  </v-card>
</template>

<script>
export default {
  name: "ChapterSelection",
  props: {
    chapterList: Array,
  },
  data() {
    return {
      selection: undefined,
    };
  },
  computed: {},
  methods: {
    onSelected() {
      this.$emit("selected", this.selection);
    },
  },
};
</script>

<style scoped lang="scss"></style>
