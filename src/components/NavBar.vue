<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { ref, watchEffect, type Ref } from 'vue';
const authStore = useAuthStore();
const userInfo: Ref<{ authenticated: false } | { authenticated: true, display_name: string }> = ref({ authenticated: false })
const loginUrl = `${import.meta.env.VITE_API_BASE_URL}/login`

watchEffect(async () => {
  try {
    userInfo.value = await fetchProfile()
  } catch (error) {
    console.error("Could not get user profile", error);
  }
})

async function fetchProfile() {
  if (!authStore.hasTokens()) {
    return { authenticated: false }
  }
  const userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, { headers: authStore.getAuthorizationHeaders(), credentials: "include" })
  if (userResponse.status == 200) {
    return { ...(await userResponse.json()), authenticated: true }
  }
  authStore.removeCredentials()
  return { authenticated: false }

}


function getAuthorizationHeaders(): {} | { Authorization: string } {
  if (!('credentials' in localStorage)) {
    return {}
  }
  const credentials = JSON.parse(localStorage['credentials']);
  return {
    Authorization: `Bearer ${credentials.access_token}`
  }
}

function logout() {
  authStore.removeCredentials();
  localStorage.removeItem('credentials');
  userInfo.value = { authenticated: false };
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');

  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
</script>
<template>
  <section>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="h1" class="title">AoE2 Tournament Tools</b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item href="#">Tournament list</b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <b-button inverted @click="toggleTheme">
            <b-icon icon="theme-light-dark" /><span>Toggle theme</span>
          </b-button>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a v-if="!userInfo.authenticated" class="button is-light" :href="loginUrl"><b-icon icon="account" />
              <span>Login with Discord</span></a>
            <a v-else class="button is-light" @click="logout"><b-icon icon="logout" /> <span>{{ userInfo.display_name
            }}</span></a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </section>
</template>
