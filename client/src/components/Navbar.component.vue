<script lang="ts">
export default {
  name: "NavbarComponent",
};
</script>

<template>
  <div class="navbar">
    <div class="navbar-edge justify-flex-start">
      <RouterLink to="/" class="club-tortle link">Club Tortue</RouterLink>
    </div>
    <div class="navbar-edge justify-flex-end">
      <RouterLink to="/game" class="action-link">Jouer</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  width: 100%;
  min-height: 10svh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 6rem;
}

.navbar-edge {
  width: 10rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.link {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  text-decoration: none;
  color: var(--black);
  font-weight: 800;
  font-size: var(--fs-3);
  overflow: hidden;
  text-decoration: none;
  transition-duration: 300ms;
}

.link:hover {
  color: var(--main-2);
  transition-duration: 300ms;
}

.club-tortle {
  color: var(--main-2);
  font-size: var(--fs-4);
  transition-duration: 300ms;
}

.club-tortle:hover {
  color: var(--main-1);
  transition-duration: 300ms;
}

.action-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  text-decoration: none;
  background-color: var(--black);
  color: var(--white);
  font-weight: 600;
  font-size: var(--fs-3);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  text-decoration: none;
  transition-duration: 300ms;
}

.action-link:hover {
  background-color: var(--black-2);
}
</style>
