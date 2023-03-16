import type { Ref, UnwrapRef } from 'vue'

type ModalAction = 'add' | 'edit'

export function useControlModal<T = any>() {
  const modalType = ref<ModalAction>('add')
  const modalVisible = ref(false)
  const selectedItem = ref<T | null>(null)

  const showModal = ({ type = 'add', data = null }: { type?: ModalAction; data?: T | null }) => {
    modalType.value = type
    selectedItem.value = data as UnwrapRef<T>
    modalVisible.value = true
  }

  return {
    modalType,
    modalVisible,
    selectedItem,
    showModal,
  }
}

export function createModalData<T extends object, K extends object = any>({
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
    refForm.value.validate((errors: any) => {
      if (errors) return
      startLoading()
      fn?.()
    })
  }

  return {
    formModel,
    loading,
    startLoading,
    endLoading,
    assign,
    ok,
  }
}
