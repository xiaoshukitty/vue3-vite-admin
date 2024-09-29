//封装本地存储存储数据与读取数据的方法
//本地存储存储数据
export const SET_STORAGE = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

// 本地存储获取数据
export const GET_STORAGE = (key: string) => {
  return localStorage.getItem(key)
}

//本地存储删除数据方法
export const REMOVE_STORAGE = (key: string) => {
  localStorage.removeItem(key)
}
