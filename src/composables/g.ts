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

export function clone<T = any>(data: T) {
  return JSON.parse(JSON.stringify(data)) as T
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
