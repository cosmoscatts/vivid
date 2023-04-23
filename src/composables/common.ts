import dayjs from 'dayjs'
import lottie from 'lottie-web'
import type { RendererType } from 'lottie-web'
import lodash from 'lodash'
import { NAME_CHARACTERS, SURPER_NAMES } from '~/constants'
import type { Fn, Nullable } from '~/types'

export {
  dayjs,
  lodash,
}

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
): void {
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
export function formatDate(date?: dayjs.ConfigType, opts: {
  format?: string
  defaultReturn?: string
  enableDefaultDate?: boolean
} = {
  format: 'YYYY-MM-DD HH:mm:ss',
  defaultReturn: '',
  enableDefaultDate: false,
}): string {
  if (!opts.enableDefaultDate && !date) return opts.defaultReturn ?? ''
  return dayjs(date).format(opts.format)
}

/**
 * 向上取整
 */
export function ceil(val: number) {
  return Math.ceil(val)
}

/**
 * 向下取整
 */
export function floor(val: number) {
  return Math.floor(val)
}

/**
 * 获取随机整数
 *
 * @param max 最大值
 */
export function getRandomInteger(max = 100): number {
  return floor(Math.random() * max)
}

/**
 * 获取随机人名
 */
export function getRandomName(length = getRandomInteger(2) + 1): string {
  const [l1, l2] = [SURPER_NAMES.length, NAME_CHARACTERS.length]
  return [
    SURPER_NAMES[getRandomInteger(l1)],
    ...Array.from({ length }, () => NAME_CHARACTERS[getRandomInteger(l2)]),
  ].join('')
}

/**
 * 获取近两年随机日期时间
 */
export function getRandomDate(): string {
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
export function getRandomStr(size = 16, dict = urlAlphabet): string {
  let id = ''
  let i = size
  const len = dict.length
  while (i--) id += dict[(Math.random() * len) | 0]
  return id
}

/**
 * Call every function in an array
 */
export function batchInvoke(functions: Nullable<Fn>[]) {
  functions.forEach(fn => fn && fn())
}

/**
 * Call the function
 */
export function invoke(fn: Fn) {
  return fn()
}

/**
 * Pass the value through the callback, and return the value
 *
 * @example
 * ```
 * function createUser(name: string): User {
 *   return tap(new User, user => {
 *     user.name = name
 *   })
 * }
 * ```
 */
export function tap<T>(value: T, callback: (value: T) => void): T {
  callback(value)
  return value
}

export const assert = (condition: boolean, message: string): asserts condition => {
  if (!condition) throw new Error(message)
}
export const toString = (v: any) => Object.prototype.toString.call(v)
export const getTypeName = (v: any) => {
  if (v === null) return 'null'
  const type = toString(v).slice(8, -1).toLowerCase()
  return (typeof v === 'object' || typeof v === 'function') ? type : typeof v
}
export const noop = () => {}

export interface LottieParams {
  containerId: string
  path: string
  loop?: boolean
  renderer?: RendererType
}

const getElement = (id: string) => document.querySelector(id)!

export const useLottie = ({
  containerId,
  path,
  loop = true,
  renderer = 'svg',
}: LottieParams) => lottie.loadAnimation({
  path,
  loop,
  renderer,
  container: getElement(containerId),
})

export const useListLottie = (list: LottieParams[]) => list.forEach(item => useLottie(item))

export function clone<T = any>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T
}

export function deepClone<T = any>(obj: T): T {
  return lodash.cloneDeep<T>(obj)
}

export function makeNonNullStr(str?: string | null) {
  return str ?? ''
}

export function empty(data?: any) {
  if (!data) return true
  if (isString(data)) return makeNonNullStr(data).length === 0
  if (isArray(data)) return data.length === 0
  if (isObject(data)) return Object.keys(data).length === 0
  return false
}

/**
 * 将 source 中属于 target 中属性的值赋给 target
 */
export function assignObj<S extends object, T extends object>(
  source: S,
  target: T,
): void {
  Object.entries(source).forEach(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      target[key as keyof T] = value
    }
  })
}
