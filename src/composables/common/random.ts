import { NAME_CHARACTERS, SURPER_NAMES } from '~/constants'

/**
 * 获取随机整数
 */
export function getRandomInteger(end = 100, start = 0): number {
  return floor(Math.random() * (end - start) + start)
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

export function getRandomBool(p = 0.5) {
  return Math.random() < p
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
