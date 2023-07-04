/**
 * Replace backslash to slash
 *
 * @category String
 */
export function slash(str: string) {
  return str.replace(/\\/g, '/')
}

/**
 * Ensure prefix of a string
 *
 * @category String
 */
export function ensurePrefix(prefix: string, str: string) {
  if (!str.startsWith(prefix))
    return prefix + str
  return str
}

/**
 * Ensure suffix of a string
 *
 * @category String
 */
export function ensureSuffix(suffix: string, str: string) {
  if (!str.endsWith(suffix))
    return str + suffix
  return str
}

/**
 * Dead simple template engine, just like Python's `.format()`
 *
 * @category String
 */
export function template(str: string, ...args: any[]): string {
  return str.replace(/{(\d+)}/g, (match, key) => {
    const index = Number(key)
    if (Number.isNaN(index))
      return match
    return args[index]
  })
}

/**
 * First letter uppercase, other lowercase
 * @category string
 * @example
 * ```
 * capitalize('hello') => 'Hello'
 * ```
 */
export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export function nonNullStr(str?: string | null) {
  return str ?? ''
}


