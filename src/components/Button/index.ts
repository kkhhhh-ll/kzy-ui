import type { App } from 'vue'
import Button from './Button.vue' 
Button.install = (app: App) => {
  app.component(Button.name!, Button)
}

export {
 Button
} 
export * from './types'