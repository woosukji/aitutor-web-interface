<template>
  <div class="chapter-test d-flex justify-center align-center pa-8">
    <chapter-selection
      v-if="mode === 'select-chapter'"
      class="select-chapter flex-grow-1"
      :chapter-list="chapterList"
      @selected="handleChapterSelected"
    ></chapter-selection>

    <v-container
      v-else-if="mode === 'solve-problems'"
      class="solve-problems mb-auto mt-sm-16"
    >
      <v-row>
        <v-col class="d-flex justify-end">
          <report-bad-problem
            :current-problem="currentProblem"
          ></report-bad-problem>
        </v-col>
      </v-row>

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
        <v-col class="pa-0">
          <problem
            :current-problem="currentProblem"
            @chosen="handleProblemSolved"
            :key="nSolved"
          ></problem>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      v-else-if="mode === 'show-result'"
      class="show-result mb-auto mt-sm-16"
    >
      <v-row class="justify-center pa-4 font-weight-bold text-h5">
        <div class="blue--text">{{ `${totalScore} / ${nProblems}` }}</div>
        <div class="ml-4">잘 하고 있어요!</div>
      </v-row>
      <v-row class="flex-column flex-sm-row">
        <v-col class="flex-grow-0 d-flex justify-start justify-sm-end pb-0">
          <div style="position: relative">
            <span class="text-h6">{{ showResultIdx + 1 }}.</span>
            <v-icon
              v-if="results[showResultIdx]"
              style="position: absolute; top: 0; left: 0"
              color="red"
            >
              mdi-checkbox-blank-circle-outline
            </v-icon>
            <v-icon
              v-else
              style="position: absolute; top: 0; left: 0"
              color="red"
            >
              mdi-check
            </v-icon>
          </div>
        </v-col>
        <v-col class="flex-grow-1">
          <problem-result
            :current-problem="problems[showResultIdx]"
            :student-choice="choices[showResultIdx]"
            :isCorrect="results[showResultIdx]"
            @next="showResultIdx = Math.min(nProblems - 1, showResultIdx + 1)"
            @previous="showResultIdx = Math.max(0, showResultIdx - 1)"
            :key="showResultIdx"
          ></problem-result>
        </v-col>
        <v-col class="problem-list">
          <v-btn-toggle v-model="showResultIdx" class="d-flex flex-wrap" group>
            <v-btn v-for="(_, idx) in problems" :key="idx">
              {{ `${idx + 1}번` }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ChapterSelection from "@/components/ChapterSelection.vue";
import Problem from "@/components/Problem.vue";
import ReportBadProblem from "@/components/ReportBadProblem.vue";
import ProblemResult from "@/components/ProblemResult.vue";
import { aggregateProblemAndFigure } from "@/util/ProblemHelper";

export default {
  name: "ChapterTest",
  components: { ChapterSelection, Problem, ReportBadProblem, ProblemResult },
  data() {
    return {
      chapterList: [],
      mode: "select-chapter",
      nSolved: 0,
      nProblems: 3,
      problems: [],
      currentProblem: {},
      choices: [],
      results: [],
      showResultIdx: 0,
    };
  },
  computed: {
    totalScore() {
      return this.results.reduce((acc, cur) => acc + cur, 0);
    },
  },
  async mounted() {
    this.$store.commit("loading");

    this.chapterList = await this.$store.dispatch("loadSmallChapterList");

    this.$store.commit("unLoading");
  },
  methods: {
    aggregateProblemAndFigure,
    async handleChapterSelected(chapter) {
      this.$store.commit("loading");

      const chapterProblems = await this.$store.dispatch(
        "loadChapterTestProblems",
        chapter
      );

      const figurePromiseList = chapterProblems.map((data) => {
        return this.$store.dispatch("loadProblemFigureUrl", data["파일명"]);
      });

      const figureUrlList = (await Promise.allSettled(figurePromiseList)).map(
        (promise) => (promise.status === "fulfilled" ? promise.value : "")
      );

      this.problems = chapterProblems
        .map((data, idx) => {
          const figureUrl = figureUrlList[idx];
          return this.aggregateProblemAndFigure(data, figureUrl);
        })
        .filter((data) => data.isValid);

      this.nProblems = this.problems.length;
      this.currentProblem = { ...this.problems[0] };

      this.mode = "solve-problems";
      this.$store.commit("unLoading");
    },
    async handleProblemSolved(studentChoice, elapsedTime) {
      this.choices.push(studentChoice);

      const isCorrect = studentChoice === this.currentProblem.answer;
      this.results.push(isCorrect);

      const log = {
        problemUid: this.currentProblem.uid,
        studentChoice,
        isCorrect,
        elapsedTime,
      };
      this.$store.dispatch("recordProblemSolveLog", log);

      this.nSolved += 1;
      if (this.nSolved === this.problems.length) {
        await this.loadResult();
        this.mode = "show-result";
        return;
      }

      this.currentProblem = { ...this.problems[this.nSolved] };
    },
    loadResult() {
      this.$store.commit("loading");
      return this.loadingResolver(1000);
    },
    loadingResolver(time = 500) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.$store.commit("unLoading");
          resolve();
        }, time);
      });
    },
  },
  beforeRouteLeave(_to, _from, next) {
    if (window.confirm("소단원 테스트를 종료하시겠습니까?")) {
      next();
    }
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

.show-result {
  max-width: 700px;

  .problem-list {
    max-width: 300px;
  }
}
</style>
