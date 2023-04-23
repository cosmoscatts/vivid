export function useBool(initValue = false) {
  const bool = ref(initValue)
  const setBool = (value: boolean) => bool.value = value
  const setTrue = () => setBool(true)
  const setFalse = () => setBool(false)
  const toggle = () => setBool(!bool.value)
  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  }
}

/**
 * 通用 loading 状态
 */
export function useLoading(initValue = false) {
  const _ = useBool(initValue)
  return {
    loading: _.bool,
    setLoading: _.setBool,
    startLoading: _.setTrue,
    endLoading: _.setFalse,
    toggleLoading: _.toggle,
    Loading: {
      get state() {
        return _.bool.value
      },
      set(value: boolean) {
        _.setBool(value)
      },
      start() {
        _.setBool(true)
      },
      end() {
        _.setBool(false)
      },
      toggle() {
        _.toggle()
      },
    },
  }
}
