import type { App } from 'vue'
import Switch from './Switch.vue' 
Switch.install = (app: App) => {
  app.component(Switch.name!, Switch)
}

export {
 Switch
} 
export * from './types'