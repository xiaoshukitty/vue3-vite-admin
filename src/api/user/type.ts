// 登录接口需要携带的参数
export interface loginForm {
  username: string
  password: string
  authority:string
}

// token? 可能有token，可能没有
export interface dataType {
  token:string,
  role:string,
}

//登录接口返回的数据类型
export interface loginReponseData {
  code: number
  message: string
  data: dataType
}

//定义服务器返回用户信息相关的数据类型
interface userInfo {
  userId: number
  acatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUese: userInfo
}

export interface userReponseData {
  code: number
  data: user
}
