/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from "../router";
import Buefy from "buefy";

// Styles
import "buefy/dist/css/buefy.css";
import "@mdi/font/css/materialdesignicons.css";

// Types
import type { App } from "vue";
import { createPinia } from "pinia";

export function registerPlugins(app: App) {
  app.use(Buefy).use(router).use(createPinia());
}
