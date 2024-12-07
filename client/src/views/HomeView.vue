<script lang="ts">
export default {
  name: "NavbarComponent",
};
</script>

<template>
  <div class="home-view">
    <main>
      <div class="welcome">
        <div class="welcome-div justify-center align-center">
          <img alt="ClubTortue" src="/src/assets/images/ClubTortue.png" />
        </div>
        <div class="welcome-div">
          <h1>Bienvenue sur Club Tortue</h1>
          <p>
            Club Tortue est un jeu multijoueur qui permet de s'amuser sur
            différents jeux afin de récupérer des récompenses pour personnaliser
            son expérience. Vous pouvez également rencontrer plein d'autres
            tortues toutes plus fun les unes que les autres. Bon jeu !
          </p>
          <RouterLink to="/game" class="action-link">
            Jouer maintenant
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-view {
  width: 100%;
  height: 90svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  background-image: var(--white);
}

.home-view main {
  width: 100%;
  padding: 5svh;
}

.welcome {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
}

.welcome-div {
  width: 50%;
  height: 70svh;
  display: flex;
  flex-direction: column;
}

.welcome-div img {
  height: 100%;
}

.welcome-div h1 {
  color: var(--black);
  font-size: var(--fs-6);
  font-weight: 800;
  padding: 0;
  margin: 0;
  margin: 15svh 0 2.5svh 0;
}

.welcome-div p {
  width: 50rem;
  color: var(--black-2);
  font-size: var(--fs-2);
  font-weight: 500;
  padding: 0;
  margin: 0;
}

.action-link {
  width: fit-content;
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
  margin-top: 2.5svh;
  overflow: hidden;
  text-decoration: none;
  transition-duration: 300ms;
}

.action-link:hover {
  background-color: var(--black-2);
}
</style>
