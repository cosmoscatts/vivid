import type { Role } from '~/types'

export const RoleApi = {
  fetchPageList(length = 15) {
    const allMenuIds = getUserFlattenMenuTree().map(item => item.id)
    const createRoleName = (idx: number) => `角色${idx + 1}`
    return new Promise<GeneratePageResult<Role>>((resolve) => {
      resolve({
        code: 0,
        data: {
          records: Array.from({ length }, (_, idx) => ({
            id: idx + 1,
            name: createRoleName(idx),
            description: getRandomStr(20),
            menuIdList: allMenuIds.slice(0, getRandomInteger(allMenuIds.length)),
            createTime: new Date(getRandomDate()),
          } as Role)),
          total: length,
        },
      })
    })
  },
}
