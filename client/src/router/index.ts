import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import GameView from "@/views/GameView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import NavigationLayout from "@/layouts/NavigationLayout.vue";
import { API_URL } from "@/config";
import axios from "axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { layout: NavigationLayout },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { layout: NavigationLayout },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { layout: NavigationLayout },
    },
    {
      path: "/game",
      name: "game",
      component: GameView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");

    if (token === null) {
      next("/login");
      return;
    }

    const response = await axios.get(`${API_URL}/users/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success && response.data.success === true) {
      next();
      return;
    }

    next("/login");
    return;
  }
  next();
});

export default router;
