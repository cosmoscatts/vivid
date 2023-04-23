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
