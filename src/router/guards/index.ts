import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { APP_META } from '~/constants'
import createPermissionGuard from './permission'

export default function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    createPermissionGuard(to, from, next)
  })
  router.afterEach((to) => {
    useTitle(to.meta?.title as string ?? APP_META.name)
    NProgress.done()
  })
}
