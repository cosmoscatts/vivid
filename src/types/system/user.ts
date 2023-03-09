import type { Role } from './role'

export interface User {
  id: number
  username: string
  name: string
  password: string
  avatar?: string
  roleId: number
  createTime?: Date
  role?: Role
}
