import { createApp } from 'vue'
import App from './App.vue'
import { setupModules } from './scripts'
import 'uno.css'

setupModules(createApp(App))
