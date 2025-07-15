import type { App } from 'vue'
import Dropdown from './Dropdown.vue' 
Dropdown.install = (app: App) => {
  app.component(Dropdown.name!, Dropdown)
}

export {
 Dropdown
} 
export * from './types'