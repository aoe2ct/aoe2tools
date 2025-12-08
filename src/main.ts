/**
 * main.ts
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const fallbackTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
  const savedTheme = localStorage.getItem('theme') || fallbackTheme;

  document.documentElement.setAttribute('data-theme', savedTheme);
});
