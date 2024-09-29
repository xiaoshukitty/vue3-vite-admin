// 小仓库：关于 layout 组件相关配置的仓库
// 在 scr/layout/tabbar/breadcrumb/index 里面
import { defineStore } from 'pinia'
//引入操作本地存储工具方法
import { GET_STORAGE } from '@/utils/storage'
export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: GET_STORAGE('THEME'),
  }),
  getters: {
    getTheme: (state) => {
      return state.theme
    },
  },
  actions: {},
})
