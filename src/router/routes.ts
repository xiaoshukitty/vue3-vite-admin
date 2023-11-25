//对外暴露常量路由
export const constantRouter = [
  {
    //登录路由
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏
    },
  },
  {
    //登录成功展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'layout', //菜单标题
      hidden: false, //代表路由标题在菜单中是否隐藏
    },
    children: [
      {
        path: '/home',
        component: () => import('@/view/home/index.vue'),
        meta: {
          title: '首页', //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏
        },
      },
      {
        path: '/ceshi',
        component: () => import('@/view/home/index.vue'),
        meta: {
          title: '测试', //菜单标题
          hidden: true, //代表路由标题在菜单中是否隐藏
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/view/404/index.vue'),
    name: '404',
    meta: {
      title: '404', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏
    },
  },
  {
    path: '/:pathMatch(.*)*', //上面路由没匹配到就到，就匹配这个任意路由,就重定向到 404 页面
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意路由', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏
    },
  },
]
