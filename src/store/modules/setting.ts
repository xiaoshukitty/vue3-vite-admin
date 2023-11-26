// 小仓库：关于 layout 组件相关配置的仓库
// 在 scr/layout/tabbar/breadcrumb/index 里面
import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起控制
    }
  },
})

export default useLayOutSettingStore
