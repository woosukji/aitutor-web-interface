<template>
  <v-dialog v-model="showDialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"
        >문제 오류 신고</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">문제 오류 신고</span>
      </v-card-title>
      <v-card-text>
        <v-checkbox
          v-for="(fault, idx) in possibleFaults"
          :key="idx"
          v-model="selectedFaults"
          :label="fault"
          :value="fault"
        ></v-checkbox>
        <v-checkbox
          v-model="selectedFaults"
          label="기타"
          value="기타"
        ></v-checkbox>
        <v-text-field
          :disabled="!selectedFaults.includes('기타')"
          v-model="faultDescription"
          lable="문제 오류 설명"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="initAndClose"> 취소 </v-btn>
        <v-btn text @click="onSubmit"> 제출하기 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ReportBadProblem",
  props: {
    currentProblem: Object,
  },
  data() {
    return {
      showDialog: false,
      possibleFaults: [
        "문제 텍스트에 오타가 있어 문제를 풀 수 없음",
        "선지에 오타가 있어 문제를 풀 수 없음",
        "있어야 할 표가 보이지 않음",
        "있어야 할 그림(도형, 그래프)이 보이지 않음",
      ],
      selectedFaults: [],
      faultDescription: "",
    };
  },
  computed: {},
  methods: {
    initAndClose() {
      this.selectedFaults = [];
      this.faultDescription = "";
      this.showDialog = false;
    },
    async onSubmit() {
      this.$store.commit("loading");

      await this.$store.dispatch("recordBadProblemReport", {
        problemUid: this.currentProblem.uid,
        faults: this.selectedFaults,
        description: this.faultDescription,
      });
      this.initAndClose();

      this.$store.commit("unLoading");

      this.$store.commit("alert", {
        message: "문제 오류가 접수되었습니다. 해당 문제는 적당히 풀어주세요.",
      });
      console.log("done");
    },
  },
};
</script>

<style scoped lang="scss"></style>
