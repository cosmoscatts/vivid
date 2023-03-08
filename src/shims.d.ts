/// <reference types="vite/client" />

declare interface Window {}


declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

