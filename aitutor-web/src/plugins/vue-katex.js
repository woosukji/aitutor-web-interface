import Vue from "vue";
import VueKatex from "vue-katex";

Vue.use(VueKatex);

const katexConfig = {
  options: {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    strict: false,
  },
};

export default katexConfig;
