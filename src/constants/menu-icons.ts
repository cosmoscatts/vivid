import type { Component } from 'vue'
import {
  IconDesktop,
  IconFile,
  IconHome,
  IconIdcard,
  IconUser,
} from '@arco-design/web-vue/es/icon'

export const MENU_ICON_MAP: { [key: string]: Component } = {
  home: IconHome,
  system: IconDesktop,
  user: IconUser,
  role: IconIdcard,
  file: IconFile,
  profile: IconIdcard,
}
