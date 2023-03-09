import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from './format'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
})

export default router
