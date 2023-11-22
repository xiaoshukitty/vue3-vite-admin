// 通过 vue-router 插件实现路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouter } from './routes'

//创建路由器
let router = createRouter({
  // 路由模式
  history: createWebHashHistory(), //hash 模式
  routes: constantRouter,
  //滚动行为(路由切换)
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
