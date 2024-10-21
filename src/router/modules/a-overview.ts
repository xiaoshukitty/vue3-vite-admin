import { RouteRecordRaw } from 'vue-router'

/**
 * 概览页面路由
 */
const overviewRoutes: RouteRecordRaw[] = [
  {
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
        component: () => import('@/view/overview/index.vue'),
        meta: {
          title: '概览',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
]

export default overviewRoutes
