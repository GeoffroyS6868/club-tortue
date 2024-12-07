<script lang="ts">
import NavbarComponent from "@/components/Navbar.component.vue";

export default {
  name: "NavigationLayout",
  components: {
    NavbarComponent,
  },
};
</script>

<template>
  <div class="navigation-layout">
    <NavbarComponent />
    <router-view class="navigation-view" />
  </div>
</template>

<style scoped>
.navigation-layout {
  width: 100vw;
  min-height: 100svh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}

.navigation-view {
  min-height: 90svh;
}
</style>
