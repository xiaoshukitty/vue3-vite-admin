import { RouteRecordRaw } from 'vue-router'

/**
 * 概览页面路由
 */
const overviewRoutes: RouteRecordRaw[] = [
  {
    path: '/overview',
    component: () => import('@/layout/index.vue'),
    name: 'overview',
    meta: {
      title: '概览',
      hidden: false,
      icon: 'House',
    },
    redirect: '/overview/analysis',
    children: [
      {
        path: '/overview/analysis',
        component: () => import('@/view/overview/analysis/index.vue'),
        meta: {
          title: '工作台',
          hidden: false,
          icon: 'Reading',
          requiresAuth: true,
          roles: ['Admin', 'User', 'Super'],
        },
      },
    ],
  },
]

export default overviewRoutes
