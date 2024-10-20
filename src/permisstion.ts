import { path } from 'path'
//路由鉴权，项目中路由能不能访问的权限设置
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import setting from './setting'
import Cookies from 'js-cookie'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

// nprogress.configure({ showSpinner: false })
//获取用户相关小仓库 token
import useUserStore from './store/modules/user'
import pinia from './store' //必须引入 pinia，不然报错
let userStore = useUserStore(pinia)

nprogress.configure({ showSpinner: false }) // 通过设置为false来关闭加载旋转器

//全局前置守卫
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    document.title = `${setting.title} - ${to.meta.title}`
    // to 要跳转的页面
    // from 从那个路由来
    // next 放行
    nprogress.start()
    //判断是否是锁屏页面
    if (Cookies.get('lockStatus') == '0' && to.name == 'lockscreen') {
      next()
    }
    if (Cookies.get('lockStatus') == '1' && to.path != '/lockscreen') {
      next({
        replace: true,
        path: '/lockscreen',
      })
      nprogress.done()
    }

    let username
    let token = userStore.token
    //登录
    next()
    //   if (token) {
    //     if (to.path == '/login') {
    //       next({ path: '/' })
    //     } else {
    //       // 用用户信息
    //       //   if (username) {
    //       //     next()
    //       //   } else {
    //       //     //获取用户信息。请求接口
    //       //     try {
    //       //       //   发起获取用户信息请求
    //       //     } catch (err) {
    //       //       //   token 过期：获取不到用户信息，用户手动修改用户信息 才会走到 catch 分支中去
    //       //       //   退出登录 --> 用户相关数据清空
    //       //       next({ path: '/login', query: { redirect: to.path } })
    //       //     }
    //       //   }
    //       next()
    //     }
    //   } else {
    //     //没有登录
    //     if (to.path == '/login') {
    //       next()
    //     } else {
    //       next({ path: '/login', query: { redirect: to.path } }) //解决想去的页面没有登录，把页面参数带给路径上，登录后直接跳转到想去的页面
    //     }
    //   }
  },
)

//全局后置守卫
router.afterEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    nprogress.done()
  },
)

/**
 * 1，路由鉴权(路由组件访问权限)
 *
 * 用户未登录 --> 只能访问 login
 * 用户登录 --> 不能访问 login(指向首页)
 */
