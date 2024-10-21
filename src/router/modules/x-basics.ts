import { RouteRecordRaw } from 'vue-router'
/**
 * 一些基础的路由放置位置 类似 404 登录 锁屏等
 */
const basicsRoutes: RouteRecordRaw[] = [
  {
    //登录路由
    path: '/',
    component: () => import('@/view/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏 true：隐藏，false：显示
    },
  },
  {
    path: '/404',
    component: () => import('@/view/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/lockscreen',
    component: () => import('@/view/common/lockscreen/index.vue'),
    name: 'lockscreen',
    meta: {
      title: '锁屏页面',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*', //上面路由没匹配到就到，就匹配这个任意路由,就重定向到 404 页面
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意路由',
      hidden: true,
    },
  },
]

export default basicsRoutes
