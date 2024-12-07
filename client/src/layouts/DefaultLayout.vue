<script lang="ts">
export default {
  name: "DefaultLayout",
};
</script>

<template>
  <div class="default-layout">
    <router-view />
  </div>
</template>

<style scoped>
.default-layout {
  width: 100vw;
  min-height: 100svh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
</style>
