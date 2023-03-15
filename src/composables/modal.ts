import type { Ref, UnwrapRef } from 'vue'
import type { EmitFn } from '@arco-design/web-vue/es/_utils/types'

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
  emits = defineEmits(['saveData']),
  preHandleOk,
}: {
  getBase: () => K
  refForm: Ref<any>
  emits?: EmitFn<string>
  preHandleOk?: () => void
}) {
  const formModel = reactive<K>(getBase())
  const { loading, startLoading, endLoading } = useLoading()

  const assign = (data: T | K) => {
    assignObj(data, formModel)
  }

  const handleOk = () => {
    refForm.value.validate((errors: any) => {
      if (errors) return
      startLoading()
      preHandleOk?.()
      emits('saveUser', formModel)
    })
  }

  return {
    formModel,
    loading,
    startLoading,
    endLoading,
    assign,
    handleOk,
  }
}
