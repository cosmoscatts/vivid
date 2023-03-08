export type Mutable<T> = {
  -readonly[P in keyof T]: T[P]
}

/**
 * 用 O 中的属性替换 T 中的属性
 */
export type Overwrite<T, O> = Omit<T, keyof O> & O
/**
 * 将 T 中属于 K 的属性变为不为空
 */
export type MarkNonNullable<T, K extends keyof T> = Overwrite<T, {
  [P in K]-?: NonNullable<T[P]>
}>
