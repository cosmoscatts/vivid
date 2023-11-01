import type { UnwrapRef } from 'vue'

export const defaultValidateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])

export const hideFormLabel = breakpoints.smaller('md')

export function useSearchForm<T = any>(getBase: () => T, resetData = getBase) {
  const formModel = ref<T>(getBase())
  const reset = () => formModel.value = resetData() as UnwrapRef<T>
  const getSearchFormParams = () => {
    return clone(formModel.value)
  }

  return {
    formModel,
    reset,
    getSearchFormParams,
  }
}

export function useFormModel<T extends object, K extends object = any>({
  getBase,
  refForm,
}: {
  getBase: () => K
  refForm: Ref<any>
}) {
  const formModel = reactive<K>(getBase())
  const { loading, startLoading, endLoading } = useLoading()

  const assign = (data: T | K) => {
    assignObj(data, formModel)
  }

  const ok = (fn: () => void) => {
    const [last, now] = [useTimestamp().value, useTimestamp()]
    refForm.value.validate((errors: any) => {
      if (errors) return
      startLoading()
      fn?.()
    })
    const needClose = computed(() => (now.value - last) > 5000)
    watchOnce(needClose, endLoading)
  }

  const reset = () => {
    assignObj(getBase(), formModel)
    refForm.value?.clearValidate()
  }

  return {
    formModel,
    loading,
    startLoading,
    endLoading,
    assign,
    ok,
    reset,
  }
}
