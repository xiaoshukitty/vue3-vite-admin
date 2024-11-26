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
      {
        path: '/demos/drag',
        component: () => import('@/view/demos/drag/cardDrag/index.vue'),
        meta: {
          title: '拖拽',
          hidden: false,
          icon: 'ToiletPaper',
        },
        redirect: '/demos/drag/cardDrag', //访问一级路由直接重定向到二级路由的第一个
        children: [
          {
            path: '/demos/drag/cardDrag',
            component: () => import('@/view/demos/drag/cardDrag/index.vue'),
            meta: {
              title: '卡片拖拽',
              hidden: false,
              icon: 'CopyDocument',
              requiresAuth: true,
              roles: ['Admin', 'User', 'Super'],
            },
          },
        ],
      },
      {
        path: '/demos/form',
        component: () => import('@/view/demos/form/stepForm/index.vue'),
        meta: {
          title: '表单',
          hidden: false,
          icon: 'Tickets',
        },
        redirect: '/demos/form/stepForm', //访问一级路由直接重定向到二级路由的第一个
        children: [
          {
            path: '/demos/form/stepForm',
            component: () => import('@/view/demos/form/stepForm/index.vue'),
            meta: {
              title: '分步表单',
              hidden: false,
              icon: 'SetUp',
              requiresAuth: true,
              roles: ['Admin', 'User', 'Super'],
            },
          },
        ],
      },
      {
        path: '/demos/image',
        component: () => import('@/view/demos/image/preloadImages/index.vue'),
        meta: {
          title: '图片',
          hidden: false,
          icon: 'Postcard',
        },
        redirect: '/demos/image/preloadImages', //访问一级路由直接重定向到二级路由的第一个
        children: [
          {
            path: '/demos/image/preloadImages',
            component: () =>
              import('@/view/demos/image/preloadImages/index.vue'),
            meta: {
              title: '图片预加载',
              hidden: false,
              icon: 'FolderChecked',
              requiresAuth: true,
              roles: ['Admin', 'User', 'Super'],
            },
          },
        ],
      },
      {
        path: '/demos/calendar',
        component: () => import('@/view/demos/calendar/index.vue'),
        meta: {
          title: '日历',
          hidden: false,
          icon: 'Calendar',
          requiresAuth: true,
          roles: ['Admin', 'User', 'Super'],
        },
      },
    ],
  },
]
export default demosRoutes
