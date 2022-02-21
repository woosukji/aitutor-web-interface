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
      class="solve-problems mb-auto mb-sm-0 pa-8"
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
        <v-col class="pa-0">
          <problem
            :current-problem="currentProblem"
            @chosen="handleProblemSolved"
            :key="nSolved"
          ></problem>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else-if="mode === 'show-result'">
      <div>Your Choice: {{ choices }}</div>
      <div>채점 결과: {{ results }}</div>
    </v-container>
  </div>
</template>

<script>
import ChapterSelection from "@/components/ChapterSelection.vue";
import Problem from "@/components/Problem.vue";
import aggregateProblemAndFigure from "@/util/ProblemHelper";
import { chapterLists } from "@/util/DemoHelper";

export default {
  name: "ChapterTest",
  components: { ChapterSelection, Problem },
  data() {
    return {
      chapterList: chapterLists["중등 3-2"],
      mode: "select-chapter",
      nSolved: 0,
      nProblems: 3,
      problems: [],
      currentProblem: {},
      choices: [],
      results: [],
    };
  },
  computed: {},
  methods: {
    aggregateProblemAndFigure,
    async handleChapterSelected(chapter) {
      this.$store.commit("loading");

      const chapterProblems = await this.$store.dispatch(
        "loadChapterTestProblems",
        chapter
      );

      const figurePromiseList = chapterProblems.map((data) => {
        return this.$store.dispatch("loadProblemFigure", data["파일명"]);
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
</style>
