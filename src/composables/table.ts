export const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}

export function usePagination(fetch = () => {}, opts = basePagination) {
  const pagination = reactive({ ...opts })
  const formatRowIndex = (idx: number) => {
    const { current, pageSize } = pagination
    return (current - 1) * pageSize + idx + 1
  }
  const showPagination = computed(() => {
    const { total = 0, pageSize = 10 } = pagination
    return [false, pagination][Number(total > pageSize)]
  })
  const onPageChange = (current: number) => {
    pagination.current = current
    fetch()
  }
  const onPageSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize
    fetch()
  }
  return {
    pagination,
    showPagination,
    formatRowIndex,
    onPageChange,
    onPageSizeChange,
  }
}

export function handleParamsWithSameDate(params: Record<string, any>) {
  const keys = Object.keys(params)
  if (!keys.includes('createTime') && !keys.includes('updateTime')) return params

  const handle = ([start, end]: [string, string]) => {
    start = `${start} 00:00:00`
    end = `${end} 23:59:59`
    return [start, end]
  }

  if (keys.includes('createTime') && params.createTime?.length === 2) {
    params.createTime = handle(params.createTime)
  }

  if (keys.includes('updateTime') && params.updateTime?.length === 2) {
    params.updateTime = handle(params.updateTime)
  }

  return params
}

export function getFetchParams(opts?: {
  pagination?: Pagination
  refSearchForm?: Ref<any>
}) {
  let params = {}
  if (opts?.pagination) {
    const { current, pageSize } = opts.pagination
    params = Object.assign(params, {
      current,
      pageSize,
    })
  }
  if (opts?.refSearchForm?.value) {
    params = Object.assign(params, opts.refSearchForm.value.getSearchFormParams())
  }
  return params
}
