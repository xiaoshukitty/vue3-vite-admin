// 通过 vue-router 插件实现路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
//引入所有的路由
import commonRoutes from './commonRoutes'

/**
 * 
 * 路由配置
 * a - f 第一
 * g - l 第二
 * m - n 第三
 * o - z 第四
 */
//创建路由器
let router = createRouter({
  // 路由模式
  history: createWebHashHistory(), //hash 模式
  routes: commonRoutes,
  //滚动行为(路由切换)
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
