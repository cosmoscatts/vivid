import type { UnwrapRef } from 'vue'

export const defaultValidateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])

export const hideFormLabel = breakpoints.smaller('md')

export function createSearchForm<T = any>(getBase: () => T) {
  const formModel = ref<T>(getBase())
  const reset = () => formModel.value = getBase() as UnwrapRef<T>
  const getSearchFormParams = () => {
    return clone(formModel.value)
  }

  return {
    formModel,
    reset,
    getSearchFormParams,
  }
}
