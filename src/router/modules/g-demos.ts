import { RouteRecordRaw } from 'vue-router'

/**
 * 功能模块
 */
const demosRoutes: RouteRecordRaw[] = [
  {
    path: '/demos',
    component: () => import('@/layout/index.vue'),
    name: 'demos',
    meta: {
      title: '功能',
      hidden: false,
      icon: 'Notification',
    },
    redirect: '/demos/videoPlayback', //访问一级路由直接重定向到二级路由的第一个
    children: [
      {
        path: '/demos/videoPlayback',
        component: () => import('@/view/demos/videoPlayback/index.vue'),
        meta: {
          title: '视频播放',
          hidden: false,
          icon: 'VideoCamera',
          requiresAuth: true,
          roles: ['Admin', 'Super'],
        },
      },
      {
        path: '/demos/scroll',
        component: () => import('@/view/demos/scroll/index.vue'),
        meta: {
          title: '滚动组件',
          hidden: false,
          icon: 'Files',
          requiresAuth: true,
          roles: ['Super'],
        },
      },
    ],
  },
]
export default demosRoutes
