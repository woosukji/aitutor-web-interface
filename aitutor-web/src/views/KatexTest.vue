<template>
  <div class="katex-test">
    <textarea v-model="formula" cols="30" rows="10"></textarea>
    <div v-katex:auto="katexConfig" :key="formula" style="max-width: 600px">
      {{ formula }}
    </div>
  </div>
</template>

<script>
import katexConfig from "@/plugins/vue-katex";

export default {
  name: "KatexTest",
  components: {},
  data() {
    return {
      katexConfig,
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
    };
  },
  methods: {},
};
</script>
