<template>
  <div class="chapter-test d-flex justify-center align-center">
    <chapter-selection
      v-if="mode === 'select-chapter'"
      class="select-chapter"
      style="flex-grow: 1"
      :chapter-list="chapterList"
      @selected="handleChapterSelected"
    ></chapter-selection>

    <v-container
      v-else-if="mode === 'solve-problems'"
      class="solve-problems pa-8"
    >
      <v-row>
        <v-col>
          <v-progress-linear
            :value="(nSolved / nProblems) * 100"
            round
            height="25"
          >
            <div class="font-weight-bold">
              {{ `${nSolved} / ${nProblems}` }}
            </div>
          </v-progress-linear>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <problem
            :current-problem="currentProblem"
            @chosen="handleProblemSolved"
            :key="nSolved"
          ></problem>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else-if="mode === 'show-result'">
      {{ choices }}
    </v-container>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import ChapterSelection from "@/components/ChapterSelection.vue";
import Problem from "@/components/Problem.vue";
import { chapterList } from "@/util/DemoHelper";

export default {
  name: "ChapterTest",
  components: { ChapterSelection, Problem },
  data() {
    return {
      chapterList,
      mode: "select-chapter",
      loading: false,
      nSolved: 0,
      nProblems: 3,
      problems: [],
      currentProblem: {},
      choices: [],
    };
  },
  computed: {},
  methods: {
    async handleChapterSelected(chapter) {
      this.loading = true;

      const chapterProblems = await this.$store.dispatch(
        "loadChapterTestProblems",
        chapter
      );

      this.problems = chapterProblems.map((data) => {
        const {
          파일명: imgSrc,
          text: questionText,
          optionList = ["88", "44", "22", "11", "없다"],
          answer = 1,
        } = data;
        return { imgSrc, questionText, optionList, answer };
      });

      this.nProblems = this.problems.length;

      this.currentProblem = { ...this.problems[0] };

      this.mode = "solve-problems";

      this.loading = false;
    },
    async handleProblemSolved(choice) {
      this.nSolved += 1;

      this.choices.push(choice);

      if (this.nSolved < this.problems.length) {
        this.currentProblem = { ...this.problems[this.nSolved] };
      } else {
        await this.loadResult();
        this.mode = "show-result";
      }
    },
    loadResult() {
      this.loading = true;
      return this.loadingResolver(1000);
    },
    loadingResolver(time = 500) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.loading = false;
          resolve();
        }, time);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.chapter-test {
  height: 100%;
}

.solve-problems {
  max-width: 800px;
}
</style>
