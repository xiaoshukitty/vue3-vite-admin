//对外暴露常量路由
export const constantRouter = [
  {
    //登录路由
    path: '/',
    component: () => import('@/view/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏 true：隐藏，false：显示
      icon: 'Promotion', //菜单文字左侧图标，支持 element-plus 所以图标
    },
  },
  {
    //登录成功展示数据的路由
    path: '/home',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/view/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/view/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'CloseBold',
    },
  },{
    path: '/lockscreen',
    component: () => import('@/view/common/lockscreen/index.vue'),
    name: 'lockscreen',
    meta: {
      title: '锁屏页面',
      hidden: true,
      icon: 'CloseBold',
    },
  },
  {
    path: '/:pathMatch(.*)*', //上面路由没匹配到就到，就匹配这个任意路由,就重定向到 404 页面
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'CircleCheck',
    },
  },
  {
    path: '/module',
    component: () => import('@/layout/index.vue'),
    name: 'module',
    meta: {
      title: '组件',
      hidden: false,
      icon: 'Grid',
    },
    redirect: '/module/barCode', //访问一级路由直接重定向到二级路由的第一个
    children: [
      {
        path: '/module/barCode',
        component: () => import('@/view/module/barCode/index.vue'),
        name: 'barCode',
        meta: {
          title: '条形码',
          hidden: false,
          icon: 'MessageBox',
        },
      },
      {
        path: '/module/verificationCode',
        component: () => import('@/view/module/verificationCode/index.vue'),
        name: 'verificationCode',
        meta: {
          title: '验证码',
          hidden: false,
          icon: 'ChatDotSquare',
        },
      },
      {
        path: '/module/primaryDrag',
        component: () => import('@/view/module/primaryDrag/index.vue'),
        name: 'primaryDrag',
        meta: {
          title: '原生拖拽',
          hidden: false,
          icon: 'Notification',
        },
      },
    ],
  },
  {
    path: '/map',
    component: () => import('@/layout/index.vue'),
    name: 'map',
    meta: {
      title: '地图',
      hidden: false,
      icon: 'Location',
    },
    redirect: '/map/qqMap', //访问一级路由直接重定向到二级路由的第一个
    children: [
      {
        path: '/map/qqMap',
        component: () => import('@/view/map/qqMap/index.vue'),
        name: 'qqMap',
        meta: {
          title: 'qq地图',
          hidden: false,
          icon: 'MapLocation',
        },
      },
      {
        path: '/map/amap',
        component: () => import('@/view/map/amap/index.vue'),
        name: 'amap',
        meta: {
          title: '高德地图',
          hidden: false,
          icon: 'Place',
        },
      },
    ],
  },
]
