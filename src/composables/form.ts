import type { UnwrapRef } from 'vue'
import type { EmitFn } from '@arco-design/web-vue/es/_utils/types'

export const defaultValidateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])

export const hideFormLabel = breakpoints.smaller('md')

export function createSearchForm<T = any>(getBase: () => T, emits: EmitFn<string>) {
  const formModel = ref<T>(getBase())
  const search = () => emits?.('fetchData')
  const reset = () => formModel.value = getBase() as UnwrapRef<T>
  const getSearchFormParams = () => {
    return clone(formModel.value)
  }

  return {
    formModel,
    search,
    reset,
    getSearchFormParams,
  }
}
