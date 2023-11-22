//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin } from '@/api/user'
//引入数据类型
import type { loginForm } from '@/api/user/type'
//创建用户小仓库
let useUserStore = defineStore('User', {
  //小仓库，存储数据地方
  state: () => {
    return {}
  },
  //处理异步｜逻辑地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      let result = await reqLogin(data)
      console.log('result', result)
    },
  },
  //计算属性
  getters: {},
})
//对外暴露 获取小仓库 的方法
export default useUserStore
