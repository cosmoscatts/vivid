import type { SelectOptionData } from '@arco-design/web-vue'

/**
 * 用户下拉框
 *
 * @Role
 */
let userOptions: SelectOptionData[] | null = null
function fetchUserOptions() {
  userOptions = Array.from({ length: 5 }, (_, idx) => ({
    value: idx,
    label: getRandomName(),
  }))
}

/**
 * 角色下拉框
 *
 * @User
 */
let roleOptions: SelectOptionData[] | null = null
function fetchRoleOptions() {
  roleOptions = Array.from({ length: 5 }, (_, idx) => ({
    value: idx,
    label: ['一', '二', '三', '四', '五'].map(i => (`角色${i}`))[idx],
  }))
}

export class SelectOptionsHandler {
  static get userOptions(): SelectOptionData[] {
    if (!userOptions) fetchUserOptions()
    return userOptions!
  }

  static get roleOptions(): SelectOptionData[] {
    if (!roleOptions) fetchRoleOptions()
    return roleOptions!
  }
}
