<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();
const loginUrl = `${import.meta.env.VITE_API_BASE_URL}/login`


function logout() {
  authStore.removeCredentials();
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
        <b-navbar-item tag="router-link" :to="{ path: '/' }">Tournament list</b-navbar-item>
        <b-navbar-item v-if="authStore.userInfo.authenticated" tag="router-link" :to="{ path: '/tournament/new' }">Add
          tournament</b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <b-button inverted @click="toggleTheme">
            <b-icon icon="theme-light-dark" /><span>Toggle theme</span>
          </b-button>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a v-if="!authStore.userInfo.authenticated" class="button is-light" :href="loginUrl"><b-icon
                icon="account" />
              <span>Login with Discord</span></a>
            <a v-else class="button is-light" @click="logout"><b-icon icon="logout" /> <span>{{
              authStore.userInfo.display_name
                }}</span></a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </section>
</template>
