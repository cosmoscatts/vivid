import type { Ref } from 'vue'
import type { Pagination } from '~/types'

export const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}

export function createPagination(opts = basePagination) {
  const pagination = reactive({ ...opts })
  const formatRowIndex = (idx: number) => {
    const { current, pageSize } = pagination
    return (current - 1) * pageSize + idx + 1
  }
  return {
    pagination,
    formatRowIndex,
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
