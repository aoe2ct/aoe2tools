<template>
  <NavBar />
  <!--
    <v-app-bar title="AoE2 Tournaments">
      <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" text="Toggle Theme" slim
        @click="toggleTheme"></v-btn>
    </v-app-bar>
-->
  <main>
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import { ref  } from 'vue';

const theme = ref('dark')


function toggleTheme() {
  theme.value = theme.value == 'dark' ? 'light' : 'dark'
}
</script>
