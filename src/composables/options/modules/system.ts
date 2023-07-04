import type { SelectOptionData } from '@arco-design/web-vue'

export function registerUserOptions(): Promise<SelectOptionData[]> {
  return new Promise((resolve) => {
    resolve(Array.from({ length: 10 }, (_, idx) => {
      return {
        value: idx + 1,
        label: ensurePrefix('用户', String(idx + 1)),
      }
    }))
  })
}

export function registerRoleOptions(): Promise<SelectOptionData[]> {
  return new Promise((resolve) => {
    resolve(Array.from({ length: 10 }, (_, idx) => {
      return {
        value: idx + 1,
        label: ensurePrefix('角色', String(idx + 1)),
      }
    }))
  })
}
