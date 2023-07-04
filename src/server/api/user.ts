import type { User } from '~/types'

export const UserApi = {
  fetchPageList(length = 15) {
    return new Promise<GeneratePageResult<User>>((resolve) => {
      resolve({
        code: 0,
        data: {
          records: Array.from({ length }, (_, idx) => ({
            id: idx + 1,
            username: getRandomStr(10),
            name: getRandomName(),
            password: getRandomStr(6),
            roleId: getRandomInteger(4),
            createTime: new Date(getRandomDate()),
          } as User)),
          total: length,
        },
      })
    })
  },
}
