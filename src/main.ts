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

/**
 *  @ts-ignore 忽略 ts
 */
//@ts-ignore
//全局配置国际化的配置
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//获取应用实例对象
const app = createApp(App)
app.use(i18n)
app.use(ElementPlus, {
  locale: zhCn, //element 国际化配置
})
console.log(import.meta.env) //获取环境变量
//组册路由
app.use(router)
// 注册 pinia 仓库
app.use(pinia)

//将应用挂载到挂载点上
app.mount('#app')
