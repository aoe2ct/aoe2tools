<template>
  <v-app :theme="theme">
    <v-app-bar title="AoE2 Tournaments">
      <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" text="Toggle Theme" slim
        @click="toggleTheme"></v-btn>
      <v-btn min-width="92" slim prepend-icon="mdi-account" @click="login">
        {{ userInfo.authenticated ? userInfo.display_name : 'Login' }}
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, watchEffect, type Ref } from 'vue';

const theme = ref('dark')

const userInfo: Ref<{ authenticated: false } | { authenticated: true, display_name: string }> = ref({ authenticated: false })

watchEffect(async () => {
  try {
    userInfo.value = await fetchProfile()
  } catch (error) {
    console.error("Could not get user profile", error);
  }
})

function toggleTheme() {
  theme.value = theme.value == 'dark' ? 'light' : 'dark'
}

async function fetchProfile() {
  const userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, { headers: getAuthorizationHeaders(), credentials: "include" })
  if (userResponse.status == 200) {
    return { ...(await userResponse.json()), authenticated: true }
  }
  localStorage.removeItem('credentials')
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

function login() {
  window.location.assign(`${import.meta.env.VITE_API_BASE_URL}/login`)
}
</script>
