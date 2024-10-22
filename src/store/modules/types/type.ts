import type { RouteRecordRaw } from 'vue-router' //vue-router 自带的路由类型
// 定义小仓库数据 state 类型
export interface UserState {
  token: string | null
  userRole: string
}

export interface MenuState {
  menuRoutes: RouteRecordRaw[]
}