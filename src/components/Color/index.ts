
import type { App } from 'vue'
import Color from './Color.vue'

Color.install = (app: App) => {
  app.component(Color.name!, Color)
}
export default Color
export * from './types'
