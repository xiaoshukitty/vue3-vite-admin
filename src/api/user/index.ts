// 统一管理 用户相关的接口
import request from '@/utils/request'
import type { loginForm, loginReponseData, userReponseData } from './type'

//统一管理
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}
//暴露请求函数
//登录接口方法
// <any, loginReponseData> 返回数据类型
export const reqLogin = (data: loginForm) =>
  request.post<any, loginReponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () =>
  request.get<any, userReponseData>(API.USERINFO_URL)
