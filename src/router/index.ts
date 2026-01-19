/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { useAuthStore } from "@/store/auth";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeResolve(async (to) => {
  if (to.path != "/auth") {
    return;
  }
  if (!to.query?.code) {
    return { path: "/" };
  }
  const authStore = useAuthStore();
  const authResponse = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth?code=${to.query.code}&state=${to.query.state}`,
    { credentials: "include" },
  );
  const authTokens = await authResponse.text();
  authStore.setCredentials(authTokens);
  return { path: "/" };
});

export default router;
