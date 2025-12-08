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
  if (!('theme' in localStorage)) {
    return
  }
  const savedTheme = localStorage.getItem('theme') || 'light';

  document.documentElement.setAttribute('data-theme', savedTheme);
});
