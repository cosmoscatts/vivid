import { createRouterScroller } from 'vue-router-better-scroller'
import router from '~/router'
import type { UserModule } from '~/types'

export const install: UserModule = ({ use }) => {
  use(router)
  use(createRouterScroller({
    selectors: {
      'window': true,
      '.scrollable': true,
    },
    behavior: 'smooth',
  }))
}
