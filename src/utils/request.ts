//进行 axios 二次封装，使用请求与响应拦截器
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
// 1，利用 axios 对象的 creare() 方法，创建 axios 实例(其他配置:基础路径，超时配置)
let request = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径会携带 /api
  timeout: 5000, //设置超时时间
})
//2，request 实例添加请求拦截器
request.interceptors.request.use((config) => {
  config.headers.token = '213'
  // config配置对象，headers 属性请求头，给服务器端且待公共参数
  //返回配置对象
  return config
})
//3,响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    //成功回调
    return response.data
  },
  (error: AxiosError) => {
    //失败回调:处理 http 网络错误
    //定义一个变量，存储网络错误信息
    let message = ''
    //状态码
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

//对外暴露
export default request
