/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from '../router'
import pinia from '../store'
import Buefy from 'buefy'

// Styles
import 'buefy/dist/css/buefy.css'
import '@mdi/font/css/materialdesignicons.css'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app
    .use(Buefy)
    .use(router)
    .use(pinia)
}
