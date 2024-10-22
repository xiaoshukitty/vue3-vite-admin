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
      icon: 'HomeFilled',
    },
    redirect: '/overview/analysis',
    children: [
      {
        path: '/overview/analysis',
        component: () => import('@/view/overview/analysis/index.vue'),
        meta: {
          title: '分析页',
          hidden: false,
          icon: 'HomeFilled',
          requiresAuth: true,
          roles: ['Admin', 'User', 'Super'],
        },
      },
    ],
  },
]

export default overviewRoutes
