import dayjs from 'dayjs'
import { NAME_CHARACTERS, SURPER_NAMES } from '~/constants'

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

/**
 * 打开窗口
 */
type TargetContext = '_self' | '_parent' | '_blank' | '_top'
export function useOpenWindow(
  url: string,
  opts?: {
    target?: TargetContext
    [key: string]: any
  },
) {
  const { target = '_blank', ...others } = opts || {}
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(','),
  )
}

/**
 * 格式化时间
 */
export function formatDate(date?: dayjs.ConfigType, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}

/**
 * 获取随机整数
 *
 * @param max 最大值
 */
export function getRandomInteger(max = 100) {
  return ~~(Math.random() * max)
}

/**
 * 获取随机人名
 */
export function getRandomName(length = getRandomInteger(2) + 1) {
  const [l1, l2] = [SURPER_NAMES.length, NAME_CHARACTERS.length]
  return [
    SURPER_NAMES[getRandomInteger(l1)],
    ...Array.from({ length }, () => NAME_CHARACTERS[getRandomInteger(l2)]),
  ].join('')
}

/**
 * 获取近两年随机日期时间
 */
export function getRandomDate() {
  const now = dayjs()
  const year = now.subtract(getRandomInteger(3), 'year').format('YYYY')
  const [y, r, s, f, m] = [12, 30, 23, 59, 59].map(i => getRandomInteger(i))
  const dateStr = `${year}-${y}-${r} ${s}:${f}:${m}`
  return formatDate(dateStr)
}

/**
 * 获取随机字符串
 *
 * port from nanoid
 * https://github.com/ai/nanoid
 */
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
export function getRandomStr(size = 16, dict = urlAlphabet) {
  let id = ''
  let i = size
  const len = dict.length
  while (i--) id += dict[(Math.random() * len) | 0]
  return id
}
