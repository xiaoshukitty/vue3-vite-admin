import type { App } from 'vue'
import * as components from './components'
//引入 element-plus 提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const install = function (app: App) {
  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value)
  })
  //将 elemeent-plus 提供图标注册为全局组件
  // console.log(Object.entries(ElementPlusIconsVue))
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default install
export * from './components'
