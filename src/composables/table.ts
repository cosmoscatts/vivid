import type { Ref } from 'vue'
import type { Pagination } from '~/types'

export const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}

export function createPagination(fetch = () => {}, opts = basePagination) {
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

export function getFetchParams(opts?: {
  pagination?: Pagination
  refSearchForm?: Ref<any>
}) {
  let params = {}
  if (opts?.pagination) {
    params = Object.assign(params, opts.pagination)
  }
  if (opts?.refSearchForm?.value) {
    params = Object.assign(params, opts.refSearchForm.value.getSearchFormParams())
  }
  return params
}
