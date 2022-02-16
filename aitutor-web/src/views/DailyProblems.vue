<template>
  <div class="daily-problems d-flex justify-center align-center">
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
          <problem
            :current-problem="currentProblem"
            @chosen="handleProblemSolved"
            :key="nSolved"
          ></problem>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else-if="mode === 'show-answer'" class="show-answer">
      <div>You picked {{ choices[choices.length - 1] }}</div>
      <div>answer is {{ currentProblem.answer }}</div>
      <v-btn large @click="handleNextProblem">OK</v-btn>
    </v-container>
  </div>
</template>

<script>
import ChapterSelection from "@/components/ChapterSelection.vue";
import Problem from "@/components/Problem.vue";
import { problems } from "@/util/DemoHelper";

export default {
  name: "ChapterTest",
  components: { ChapterSelection, Problem },
  data() {
    return {
      problems,
      mode: "select-chapter",
      chapterList: ["대단원1", "대단원2", "대단원3"],
      nSolved: 0,
      nProblems: 3,
      currentProblem: {},
      choices: [],
    };
  },
  computed: {},
  methods: {
    async handleChapterSelected(e) {
      console.log(`selection recieved: ${e}`);

      await this.loadProblems();

      this.mode = "solve-problems";
    },
    loadProblems() {
      this.$state.commit("loading");
      this.currentProblem = { ...this.problems[0] };
      return this.loadingResolver();
    },
    async handleProblemSolved(choice) {
      this.nSolved += 1;
      this.choices.push(choice);

      await this.loadAnswer();
      this.mode = "show-answer";
    },
    loadAnswer() {
      this.$state.commit("loading");
      return this.loadingResolver();
    },
    handleNextProblem() {
      this.mode = "solve-problems";
    },
    loadingResolver(time = 500) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.$state.commit("unLoading");
          resolve();
        }, time);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.daily-problems {
  height: 100%;
}

.solve-problems {
  max-width: 800px;
}
</style>
