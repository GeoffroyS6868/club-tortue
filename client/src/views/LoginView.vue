<script lang="ts">
import FormInputComponent from "@/components/form/FormInput.component.vue";
import { API_URL } from "@/config";
import axios from "axios";

export default {
  name: "LoginView",
  components: {
    FormInputComponent,
  },
  methods: {
    async login(event: Event) {
      if (event) {
        if (this.email === "" || this.password === "") {
          return;
        }
        try {
          const response = await axios.post(`${API_URL}/users/login`, {
            email: this.email,
            password: this.password,
          });

          const token: string = response.data.token;
          localStorage.setItem("token", token);

          this.$router.push("/game");
        } catch (error) {
          console.error("Login failed:", error);
        }
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<template>
  <div class="register-view">
    <form class="register-form" @submit.prevent>
      <h1>Connexion</h1>
      <FormInputComponent
        name="Email"
        v-model:value="email"
        id="email-input"
        type="email"
        autocomplete="email"
      />
      <FormInputComponent
        name="Mot de passe"
        v-model:value="password"
        id="password-input"
        type="password"
        autocomplete="current-password"
      />
      <button class="action-button" v-on:click="login">Se Connecter</button>
    </form>
  </div>
</template>

<style scoped>
.register-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
}

.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  border-radius: 1rem;
  margin-top: 5rem;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.register-form h1 {
  padding: 0;
  margin: 0 0 3rem 0;
}

.action-button {
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
  margin-top: 3rem;
  border: none;
  overflow: hidden;
  text-decoration: none;
  transition-duration: 300ms;
}

.action-button:hover {
  background-color: var(--black-2);
}
</style>
