import preload from './preload'
import setupAssets from './setup-assets'

export async function setupModules(app: AppContext) {
  const { bool: wait, setFalse } = useBool(true)
  useTimeoutFn(setFalse, 500)
  batchInvoke([setupAssets, preload])
  Object.values(import.meta.glob<{ install: UserModule }>('../modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(app))
  await until(wait).not.toBeTruthy()
  app.mount('#app')
}
