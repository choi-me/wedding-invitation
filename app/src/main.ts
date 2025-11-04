import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import router from './router'

import './style/app.css'

const app = createApp(App)

app.use(createPinia())
app.use(createHead())
app.use(i18n)
app.use(router)

app.mount('#app')
