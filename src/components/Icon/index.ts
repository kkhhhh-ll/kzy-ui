import type { App } from 'vue'
import Icon from './Icon.vue' 
Icon.install = (app: App) => {
  app.component(Icon.name!, Icon)
}

export {
 Icon
} 
export * from './types'