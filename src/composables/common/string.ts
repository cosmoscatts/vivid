import { NAME_CHARACTERS, SURPER_NAMES } from '~/constants'

export function makeNonNullStr(str?: string | null) {
  return str ?? ''
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
