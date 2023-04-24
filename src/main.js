import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from "ant-design-vue"
import App from './App.vue'
import router from './router'
import "ant-design-vue/dist/antd.css"
import "./index.css"

import './assets/main.css'

// import VueAutosuggest from "vue-autosuggest";


const app = createApp(App)

app.use(createPinia())
app.use(Antd)
app.use(router)
// app.use(VueAutosuggest);

app.mount('#app')
