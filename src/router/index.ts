import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from './format'
import createRouterGuard from './guards'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
})
createRouterGuard(router)

export default router
