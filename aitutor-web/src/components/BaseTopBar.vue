<template>
  <v-app-bar v-bind="$attrs">
    <div class="logo d-flex align-center">
      <v-img
        alt="Agilesoda Logo"
        class="shrink mr-2"
        contain
        src="../assets/agilesoda_logo.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Agilesoda Name"
        class="shrink mt-1 d-none d-sm-block"
        contain
        min-width="100"
        :src="
          require($attrs.color === 'transparent'
            ? '../assets/agilesoda_name.png'
            : '../assets/agilesoda_name_white.png')
        "
        width="100"
      />
    </div>

    <v-spacer></v-spacer>

    <slot></slot>
  </v-app-bar>
</template>

<script>
export default {
  name: "BaseTopBar",
  inheritAttrs: false,
};
</script>

<style scoped lang="scss"></style>
