import App from './App.vue'
import { setupModules } from './scripts'
import 'uno.css'

import { getRoutesInPermission } from '~/utils'

setupModules(createApp(App))

console.log(getRoutesInPermission())
