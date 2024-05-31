import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router/index'

// 引入初始化样式文件
import '@/styles/common.scss'

// 引入全局组件插件
import { componentPlugin } from '@/components'

// 引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives'

// import infiniteScroll   from './directives/infinite-scroll/index'

// 引入pinia并持久化
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 创建vue实例
const app = createApp(App)

// 全局注册pinia、懒加载指令、路由、组件插件
app.use(pinia)
app.use(lazyPlugin)

// 注册自定义无限滚动指令
// app.use(infiniteScroll)


app.use(router)
app.use(componentPlugin)

// 挂载
app.mount('#app')


