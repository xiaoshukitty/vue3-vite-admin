import { createApp } from 'vue'
import App from './App.vue'
//引入 element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


/**
 *  @ts-ignore 忽略 ts
 */
//@ts-ignore
//全局配置国际化的配置
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//获取应用实例对象
const app = createApp(App)
 
app.use(ElementPlus,{
    locale: zhCn, //element 国际化配置
})

//将应用挂载到挂载点上
app.mount('#app')

