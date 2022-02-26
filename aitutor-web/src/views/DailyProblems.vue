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
        <v-col class="d-flex justify-end">
          <report-bad-problem
            :current-problem="currentProblem"
          ></report-bad-problem>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pa-0">
          <problem
            :current-problem="currentProblem"
            @chosen="handleProblemSolved"
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
import ReportBadProblem from "@/components/ReportBadProblem.vue";
import { aggregateProblemAndFigure } from "@/util/ProblemHelper";

export default {
  name: "DailyProblems",
  components: { ChapterSelection, Problem, ReportBadProblem },
  data() {
    return {
      mode: "select-chapter",
      chapter: "",
      chapterList: [],
      currentProblem: {},
      sessionRecords: [],
      nSolved: 0,
      choices: [],
      results: [],
    };
  },
  computed: {},
  async mounted() {
    this.$store.commit("loading");

    this.chapterList = await this.$store.dispatch("loadMiddleChapterList");

    this.$store.commit("unLoading");
  },
  methods: {
    aggregateProblemAndFigure,
    async handleChapterSelected(chapter) {
      this.chapter = chapter;

      await this.loadNextProblem();

      this.mode = "solve-problems";
    },
    async loadNextProblem() {
      this.$store.commit("loading");

      const recommendedProblem = await this.$store.dispatch(
        "loadRecommendedProblem",
        {
          middleChapter: this.chapter,
          sessionRecords: this.sessionRecords,
        }
      );
      console.log(recommendedProblem);

      const figureUrl =
        (await this.$store
          .dispatch("loadProblemFigureUrl", recommendedProblem["파일명"])
          .catch(() => {})) ?? "";

      this.currentProblem = {
        ...aggregateProblemAndFigure(recommendedProblem, figureUrl),
      };

      this.$store.commit("unLoading");
    },
    async handleProblemSolved(studentChoice, elapsedTime) {
      this.choices.push(studentChoice);

      const isCorrect = studentChoice === this.currentProblem.answer;
      this.results.push(isCorrect);

      this.sessionRecords.push({
        problemUid: this.currentProblem.uid,
        isCorrect,
      });

      const log = {
        problemUid: this.currentProblem.uid,
        studentChoice,
        isCorrect,
        elapsedTime,
      };
      this.$store.dispatch("recordProblemSolveLog", log);

      await this.loadAnswer();
      this.mode = "show-answer";
    },
    loadAnswer() {
      this.$state.commit("loading");
      return this.loadingResolver();
    },
    async handleNextProblem() {
      await this.loadNextProblem();

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
