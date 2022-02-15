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
      <div>Your Choice: {{ choices }}</div>
      <div>채점 결과: {{ results }}</div>
    </v-container>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import ChapterSelection from "@/components/ChapterSelection.vue";
import Problem from "@/components/Problem.vue";
import { chapterLists } from "@/util/DemoHelper";

export default {
  name: "ChapterTest",
  components: { ChapterSelection, Problem },
  data() {
    return {
      chapterList: chapterLists["중등 3-2"],
      mode: "select-chapter",
      loading: false,
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
    getOptionListFromText(questionText) {
      const optionPos = [];
      for (let optionNum = 1; optionNum < 6; optionNum += 1) {
        optionPos.push(questionText.lastIndexOf(`(${optionNum})`));
      }
      const optionPosSorted = [...optionPos].sort((a, b) => a - b);

      const isValid =
        optionPos.length > 0 &&
        optionPos.every((ele) => ele > 0) &&
        JSON.stringify(optionPos) === JSON.stringify(optionPosSorted);

      if (isValid) {
        const optionList = optionPos.map((ele, idx, arr) => {
          return questionText.slice(ele + 3, arr[idx + 1]).trim();
        });

        let questionTextFiltered = questionText.slice(0, optionPos[0]).trim();

        const firstWord = questionTextFiltered.split(/\s+/)[0];
        if (!Number.isNaN(firstWord - parseFloat(firstWord))) {
          questionTextFiltered = questionTextFiltered.slice(firstWord.length);
        }

        return { isValid, questionTextFiltered, optionList };
      }
      return { isValid };
    },
    async handleChapterSelected(chapter) {
      this.loading = true;

      const chapterProblems = await this.$store.dispatch(
        "loadChapterTestProblems",
        chapter
      );

      this.problems = chapterProblems
        .map((data) => {
          const { uid, 파일명: imgSrc, text: questionText, answer = 1 } = data;

          const {
            isValid,
            questionTextFiltered = "",
            optionList = [],
          } = this.getOptionListFromText(questionText);

          return {
            uid,
            imgSrc,
            questionText: questionTextFiltered,
            optionList,
            answer,
            isValid,
          };
        })
        .filter((data) => data.isValid);

      this.nProblems = this.problems.length;

      this.currentProblem = { ...this.problems[0] };

      this.mode = "solve-problems";

      this.loading = false;
    },
    async handleProblemSolved(studentChoice) {
      this.choices.push(studentChoice);

      const isCorrect = studentChoice === this.currentProblem.answer;
      this.results.push(isCorrect);

      this.nSolved += 1;
      if (this.nSolved < this.problems.length) {
        this.currentProblem = { ...this.problems[this.nSolved] };

        const log = {
          problemUid: this.currentProblem.uid,
          studentChoice,
          isCorrect,
          elapsedTime: 100,
        };
        this.$store.dispatch("recordProblemSolveLog", log);
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
