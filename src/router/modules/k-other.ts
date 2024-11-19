import { RouteRecordRaw } from 'vue-router'

/**
 * 功能模块
 */
const otherRoutes: RouteRecordRaw[] = [
  {
    path: '/other',
    component: () => import('@/layout/index.vue'),
    name: 'other',
    meta: {
      title: '其他',
      hidden: false,
      icon: 'Suitcase',
    },
    redirect: '/other/dynamicAnchor', //访问一级路由直接重定向到二级路由的第一个
    children: [
      {
        path: '/other/dynamicAnchor',
        component: () => import('@/view/other/dynamicAnchor/index.vue'),
        meta: {
          title: '动态锚点',
          hidden: false,
          icon: 'Orange',
          requiresAuth: true,
          roles: ['Admin', 'User', 'Super'],
        },
      },
      {
        path: '/other/upload',
        component: () => import('@/view/other/upload/index.vue'),
        meta: {
          title: '上传',
          hidden: false,
          icon: 'Upload',
          requiresAuth: true,
          roles: ['Admin', 'User', 'Super'],
        },
      },
    ],
  },
]
export default otherRoutes
