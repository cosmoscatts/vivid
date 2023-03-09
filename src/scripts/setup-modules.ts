import type { AppContext, UserModule } from '~/types'

export const setupModules = (app: AppContext) => {
  Object.values(import.meta.glob<{ install: UserModule }>('../modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(app))
  app.mount('#app')
}
