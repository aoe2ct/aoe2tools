/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { useAuthStore } from '@/store/auth'
import { inject, type Ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeResolve(async to => {
  if (to.path != '/auth') {
    return
  }
  if (!to.query?.code) {
    return { path: '/' }
  }
  const authStore = useAuthStore();
  const authResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth?code=${to.query.code}&state=${to.query.state}`, { credentials: 'include' })
  const authTokens = await authResponse.text()
  authStore.setCredentials(authTokens);
  return { path: '/' }
})

export default router
