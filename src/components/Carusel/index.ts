import type { App } from 'vue'
import Carusel from './Carusel.vue'

Carusel.install = (app: App) => {
  app.component(Carusel.name!, Carusel)
}

export default Carusel
export * from './types'