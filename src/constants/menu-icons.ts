import type { Component } from 'vue'
import {
  IconDesktop,
  IconFile,
  IconIdcard,
  IconUser,
} from '@arco-design/web-vue/es/icon'
import CommonIcon from '~/components/common/CommonIcon.vue'

function renderIcon(i: string) {
  return h(CommonIcon, { icon: i })
}

export const MENU_ICON_MAP: { [key: string]: Component } = {
  home: markRaw(renderIcon('i-ri-home-2-line')),
  system: IconDesktop,
  user: IconUser,
  role: IconIdcard,
  file: IconFile,
}
