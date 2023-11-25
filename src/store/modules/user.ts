//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin } from '@/api/user'
//引入数据类型
import type { loginForm, loginReponseData } from '@/api/user/type'
import type { UserState } from './types/type'
//引入操作本地存储工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
//引入路由(常量路由) 将来组件就可以拿着用
import { constantRouter } from '@/router/routes'
//创建用户小仓库
let useUserStore = defineStore('User', {
  //小仓库，存储数据地方
  state: (): UserState => {
    // : UserState 函数返回类型的意思
    return {
      token: GET_TOKEN(), //获取token，用户唯一标识
      menuRoutes: constantRouter,//仓库存储生成菜单需要数组(路由)
    }
  },
  //处理异步｜逻辑地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      let result: loginReponseData = await reqLogin(data)
      // console.log('result', result)
      // 登录成功：成功200 --> token
      // 登录失败：失败201 --> 登录失败错误信息
      if (result.code == 200) {
        // (this.token = '321213123'),
        this.token = result.data.token as string // as string 断言必须是 string
        // localStorage.setItem('TOKEN', result.data.token as string)
        SET_TOKEN(result.data.token as string) // as string 断言必须是 string
        //能保证当前 async 函数返回一个成功的 promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  //计算属性
  getters: {},
})
//对外暴露 获取小仓库 的方法
export default useUserStore
