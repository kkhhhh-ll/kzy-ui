import type { App } from 'vue'
import Input from './Input.vue' 
Input.install = (app: App) => {
  app.component(Input.name!, Input)
}

export {
 Input
} 
export * from './types'