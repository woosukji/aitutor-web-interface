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

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import ChapterSelection from "@/components/ChapterSelection.vue";
import Problem from "@/components/Problem.vue";

export default {
  name: "ChapterTest",
  components: { ChapterSelection, Problem },
  data() {
    return {
      mode: "select-chapter",
      loading: false,
      chapterList: ["대단원1", "대단원2", "대단원3"],
      nSolved: 0,
      nProblems: 3,
      problems: [
        {
          imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          questionText: "1. 다음 그림에서 x의 값은?",
          optionList: ["1", "2", "4", "8", "없다없다없다없다없다없다없다없다"],
          answer: 1,
        },
        {
          imgSrc: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          questionText: "2. 다음 그림에서 y의 값은?",
          optionList: ["88", "44", "22", "11", "없다"],
          answer: 2,
        },
        {
          imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          questionText: "3. 다음 그림에서 z의 값은?",
          optionList: ["121", "2324", "43213", "11230", "없다"],
          answer: 5,
        },
      ],
      currentProblem: {},
      choices: [],
    };
  },
  computed: {},
  methods: {
    handleChapterSelected(e) {
      console.log(`selection recieved: ${e}`);

      this.loadProblems();

      this.mode = "solve-problems";
    },
    loadProblems() {
      this.currentProblem = { ...this.problems[0] };
    },
    async handleProblemSolved(e) {
      const choice = e + 1;
      this.nSolved += 1;

      this.choices.push(choice);

      await this.loadAnswer();
      this.loading = false;
      this.mode = "show-answer";
    },
    loadAnswer() {
      this.loading = true;
      return new Promise((resolve) => setTimeout(this.resolver, 500, resolve));
    },
    handleNextProblem() {
      this.mode = "solve-problems";
    },
    resolver(resolve) {
      this.loading = true;
      resolve();
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
