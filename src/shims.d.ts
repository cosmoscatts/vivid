/// <reference types="vite/client" />

declare interface Window {
  g: {
    url: string
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module '@arco-design/color'

declare module '~icons/*'
