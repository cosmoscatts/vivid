import { preload } from './preload'
import type { AppContext, UserModule } from '~/types'
export const setupModules = async (app: AppContext) => {
  const { bool: wait, setFalse } = useBool(true)
  useTimeoutFn(setFalse, 500)
  preload()
  Object.values(import.meta.glob<{ install: UserModule }>('../modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(app))
  await until(wait).not.toBeTruthy()
  app.mount('#app')
}
