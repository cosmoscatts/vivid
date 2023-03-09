import dayjs from 'dayjs'
import lodash from 'lodash'

import type { Fn, Nullable } from '~/types'

export {
  dayjs,
  lodash,
}

export function isString(p: any): p is string {
  return typeof p === 'string'
}

export function isNumber(p: any): p is number {
  return typeof p === 'number'
}

export function isBoolean(p: any): p is boolean {
  return typeof p === 'boolean'
}

export function isObject(p: any) {
  if (!p) return false
  return typeof p === 'object' && Array.isArray(p) === false
}

export function isArray(p?: any): p is any[] {
  return Array.isArray(p)
}

export function isUndefined(p: any): p is undefined {
  return typeof p === 'undefined'
}

export function isNull(p: any): p is null {
  return p === null
}

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

/**
 * Type guard to filter out null-ish values
 *
 * @category Guards
 * @example array.filter(notNullish)
 */
export function notNullish<T>(v: T | null | undefined): v is NonNullable<T> {
  return v != null
}

/**
 * Type guard to filter out null values
 *
 * @example array.filter(noNull)
 */
export function noNull<T>(v: T | null): v is Exclude<T, null> {
  return v !== null
}

/**
 * Type guard to filter out null-ish values
 *
 * @example array.filter(notUndefined)
 */
export function notUndefined<T>(v: T): v is Exclude<T, undefined> {
  return v !== undefined
}

/**
 * Type guard to filter out falsy values
 *
 * @example array.filter(isTruthy)
 */
export function isTruthy<T>(v: T): v is NonNullable<T> {
  return Boolean(v)
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
