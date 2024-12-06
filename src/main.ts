import { createApp } from 'vue'
import App from '@/App.vue'
//引入 element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// svg需要的插件
import 'virtual:svg-icons-register'
//引入全局样式
import '@/styles/index.scss'
//引入路由
import router from './router'
//引入 pinia 仓库
import pinia from './store'
//引入语言
import i18n from './lang'
//暗黑模式需要样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//引入 路由配置
import './permisstion'
/**
 *  @ts-ignore 忽略 ts
 */
//@ts-ignore
//全局配置国际化的配置
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components/index'

// 打包才放开  可以使用 npm run uncomment 去掉注释 ，需要在注释前加上 @uncomment 标记 才可以
// import './ban.ts'

import './setting'

import preloadImages from '@/utils/preloadImages'

import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css

// 禁止浏览器上一步下一步
window.addEventListener('popstate', (): void => {
  history.pushState(null, '', document.URL)
})

// 开发环境使用 mock
// if (import.meta.env.MODE === 'development') {
//   import('../mock/mocks')
// }

////生产、开发环境使用 mock
import('../mock/mocks')

//获取应用实例对象
const app = createApp(App)
app.use(i18n)
app.use(ElementPlus, {
  locale: zhCn, //element 国际化配置
})
// console.log(import.meta.env) //获取环境变量
//组册路由
app.use(router)
// 注册 pinia 仓库
app.use(pinia)
// 注册全局组件
app.use(globalComponent)

//将应用挂载到挂载点上
app.mount('#app')

// 引入视频播放组件
app.use(vue3videoPlay)

//图片预加载
// preloadImages(1)

//全局配置颜色
// app.config.globalProperties.$styles = {
//   backgrroundColor: 'red',
// }

// 动态创建 html 结果来展示页面加载 loading （要写在 app 挂在完毕后）
const appContainer = document.querySelector('#app')
const loadingMask = document.createElement('div')
loadingMask.id = 'loading-mask'
loadingMask.innerHTML = `
  <div class="loading-wrapper">
    <span class="loading-dot loading-dot-spin">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </span>
  </div>
`
appContainer?.appendChild(loadingMask)
