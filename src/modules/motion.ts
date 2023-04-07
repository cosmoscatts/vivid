import { MotionPlugin } from '@vueuse/motion'
import type { UserModule } from '~/types'

export const install: UserModule = ({ use }) => use(MotionPlugin)
