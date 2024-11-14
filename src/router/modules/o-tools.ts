import { RouteRecordRaw } from 'vue-router'

/**
 * 概览页面路由
 */
const overviewRoutes: RouteRecordRaw[] = [
  {
    path: '/tools',
    component: () => import('@/layout/index.vue'),
    name: 'tools',
    meta: {
      title: '工具',
      hidden: false,
      icon: 'Scissor',
    },
    redirect: '/tools/eyeDropper',
    children: [
      {
        path: '/tools/eyeDropper',
        component: () => import('@/view/tools/eyeDropper/index.vue'),
        meta: {
          title: '取色器',
          hidden: false,
          icon: 'Pointer',
          requiresAuth: true,
          roles: ['Admin', 'User', 'Super'],
        },
      },
    ],
  },
]

export default overviewRoutes
