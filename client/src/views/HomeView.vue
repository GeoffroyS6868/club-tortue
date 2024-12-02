<script setup lang="ts"></script>

<template>
  <div class="homeview">
    <div class="navbar">
      <RouterLink to="/" class="link">Club Tortue</RouterLink>
      <RouterLink to="/game" class="link">Jouer</RouterLink>
    </div>
    <main>
      <div class="welcome">
        <h1>Bienvenue sur Club Tortue</h1>
        <p>
          Club Tortue est un jeu multijoueur qui permet de s'amuser sur
          différents jeux afin de récupérer des récompenses pour personnaliser
          son expérience. Vous pouvez également rencontrer plein d'autres
          tortues toutes plus fun les unes que les autres. Bon jeu !
        </p>
      </div>
    </main>
  </div>
</template>

<style>
.homeview {
  width: 100%;
  height: 100lvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  background-image: var(--white);
}

.navbar {
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 4rem;
}

.link {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  text-decoration: none;
  color: var(--black);
  font-weight: 600;
  font-size: 1.2rem;
  overflow: hidden;
  text-decoration: none;
  transition-duration: 300ms;
}

.link:hover {
  color: var(--main-3);
  transition-duration: 300ms;
}

main {
  width: 100%;
  padding: 3rem;
}

.welcome {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome h1 {
  padding: 0;
  margin: 0;
  color: var(--black);
  font-weight: 600;
  font-size: 3rem;
}

.welcome p {
  width: 50rem;
  color: var(--black);
  font-weight: 400;
  font-size: 1.2rem;
}
</style>
