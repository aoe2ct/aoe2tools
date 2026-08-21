import { createApp } from "vue";

import App from "./App.vue";
import { registerPlugins } from "@/plugins";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");

// Apply saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
  if (!("theme" in localStorage)) {
    return;
  }
  const savedTheme = localStorage.getItem("theme") || "light";

  document.documentElement.setAttribute("data-theme", savedTheme);
});
