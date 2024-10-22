import { defineStore } from 'pinia'
import type { MenuState } from './types/type'
//引入路由(常量路由) 将来组件就可以拿着用
import commonRoutes from '@/router/commonRoutes'

const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    menuRoutes: [], //仓库存储生成菜单需要数组(路由)
  }),
  actions: {
    generateMenus(role: string) {
      console.log('role', role)

      const arr = recursionMenu(commonRoutes, role)
      console.log('arr', arr)

      this.menuRoutes = arr
    },
  },
})

/**
 *  递归路由 找出对应角色的路由
 * @param routes 需要递归的路由数组
 * @param role 用户角色
 * @returns
 */
const recursionMenu = (routes: Array<any>, role: string) => {
  return routes
    .map((route) => {
      // 如果有 children，递归处理 children 数组
      if (route.children) {
        route.children = recursionMenu(route.children, role)
      }

      // 如果 meta.roles 存在并且不包含 role，则过滤掉该路由
      if (route.meta && route.meta.roles && !route.meta.roles.includes(role)) {
        return null
      }

      return route
    })
    .filter(Boolean) // 过滤掉返回 null 的路由
}

export default useMenuStore
