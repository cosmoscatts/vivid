export const SystemApi = {
  login() {
    return R.post<{ id: number }>('')
  },
}
