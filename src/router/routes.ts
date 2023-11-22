//对外暴露常量路由
export const constantRouter = [
  {
    //登录路由
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    name: 'login', //命名路由
  },
  {
    //登录成功展示数据的路由
    path: '/',
    component: () => import('@/view/home/index.vue'),
    name: 'layout',
  },
  {
    path: '/404',
    component: () => import('@/view/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*', //上面路由没匹配到就到，就匹配这个任意路由,就重定向到 404 页面
    redirect: '/404',
    name: 'any',
  },
]