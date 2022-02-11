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

export default {
  name: "ChapterTest",
  components: { ChapterSelection, Problem },
  data() {
    return {
      mode: "select-chapter",
      loading: false,
      chapterList: ["소단원1", "소단원2", "소단원3"],
      nSolved: 0,
      nProblems: 3,
      problems: [
        {
          imgSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          questionText:
            "+ 확인 1* 다음은 오른쪽 그림에서 $\\overline{\\mathrm{PA}}$, $\\overline{\\mathrm{PB}}$ 가 원 $\\mathrm{O}$ 의 접선이고 두 점 $\\mathrm{A}, \\mathrm{B}$ 가 접점일 때, $\\overline{\\mathrm{PB}}$ 의 길이를 구하는 과정이다. 간ㅆㅂ배에 알맞은 것을 구하여 가",
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
