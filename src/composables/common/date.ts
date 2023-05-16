import dayjs from 'dayjs'

/**
 * 格式化时间
 */
export function formatDate(date?: dayjs.ConfigType, opts: {
  format?: string
  defaultReturn?: string
  enableDefaultDate?: boolean
} = {}): string {
  if (!opts.format) opts.format = 'YYYY-MM-DD HH:mm:ss'
  if (!opts.enableDefaultDate && !date) return opts.defaultReturn ?? ''
  return dayjs(date).format(opts.format)
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
