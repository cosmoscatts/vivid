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

/**
 * 是否为整数
 */
export function isInteger(n = 0) {
  return floor(n) === n
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

export function empty(data?: any) {
  if (!data) return true
  if (isString(data)) return makeNonNullStr(data).length === 0
  if (isArray(data)) return data.length === 0
  if (isObject(data)) return Object.keys(data).length === 0
  return false
}
