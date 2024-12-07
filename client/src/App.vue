<script setup lang="ts">
import { RouterView } from "vue-router";
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue";

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout || DefaultLayout;
});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
