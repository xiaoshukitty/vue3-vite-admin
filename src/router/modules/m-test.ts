import { RouteRecordRaw } from 'vue-router'

/**
 * 测试路由
 */
const testRoutes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: () => import('@/layout/index.vue'),
    name: 'test',
    meta: {
      title: '测试',
      hidden: false,
      icon: 'Crop',
    },
    redirect: '/test',
    children: [
      {
        path: '/test',
        component: () => import('@/view/test/index.vue'),
        meta: {
          title: '测试',
          hidden: false,
          icon: 'Crop',
          roles: ['Admin', 'User', 'Super'],
        },
      },
    ],
  },
]

export default testRoutes
