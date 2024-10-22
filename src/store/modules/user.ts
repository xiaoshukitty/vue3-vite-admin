//创建用户相关的小仓库
import { defineStore } from 'pinia'
import axios from 'axios'
//引入数据类型
import type { loginForm, dataType } from '@/api/user/type'
import type { UserState } from './types/type'

//创建用户小仓库
let useUserStore = defineStore('User', {
  //小仓库，存储数据地方
  state: (): UserState => {
    // : UserState 函数返回类型的意思
    return {
      token: localStorage.getItem('token') || '', //获取token，用户唯一标识
      userRole: localStorage.getItem('userRole') || '', //获取用户角色
    }
  },
  //处理异步｜逻辑地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      try {
        const response = await axios.post('/api/login', {
          username: data.username,
          password: data.password,
          authority: data.authority,
        })
        const { token } = response.data.data as dataType

        this.userRole = data.authority

        console.log('登录成功', this.userRole)

        this.token = token
        localStorage.setItem('token', token)
        localStorage.setItem('userRole', data.authority)
        axios.defaults.headers.common['Authorization'] = token
      } catch (error) {
        console.log('登录失败', error)
      }
    },

    //退出登录方法
    logout() {
      this.token = ''
      this.userRole = ''
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      axios.defaults.headers.common['Authorization']
    },
  },
  //计算属性
  getters: {
    //获取token
    isAuthenticated: (state) => !!state.token,
  },
})
//对外暴露 获取小仓库 的方法
export default useUserStore
