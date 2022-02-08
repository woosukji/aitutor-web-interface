<template>
  <div class="chapter-test d-flex justify-center align-center">
    <chapter-selection
      style="flex-grow: 1"
      :chapter-list="chapterList"
      @selected="handleSelected"
    ></chapter-selection>
  </div>
</template>

<script>
// @ is an alias to /src
import ChapterSelection from "@/components/ChapterSelection.vue";

export default {
  name: "ChapterTest",
  components: { ChapterSelection },
  data() {
    return {
      chapterList: ["hi", "chapter", "list"],
    };
  },
  computed: {},
  methods: {
    handleSelected(e) {
      console.log(`selection recieved: ${e}`);
    },
  },
};
</script>

<style scoped lang="scss">
.chapter-test {
  height: 100%;
}
</style>
