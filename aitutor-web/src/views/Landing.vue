<template>
  <div class="landing">
    <img alt="Vue logo" src="../assets/agilesoda_logo.png">
    <router-link to="/main">login</router-link>
    <router-link to="/sign-up">sign up</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Landing',
  components: {
    HelloWorld,
  },
};
</script>
