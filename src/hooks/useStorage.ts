import { ref, watchEffect } from 'vue'
interface StorageType<T> {
  storageKey: string
  storageValue?: T
  storageType?: 'session' | 'local'
}

export const useStorage = <T>(options: StorageType<T>) => {
  const { storageKey, storageValue, storageType } = options // 获取存储键、存储值和存储类型

  const value = ref(storageValue) as any // 创建一个响应式引用，用于存储值
  try {
    // 尝试从本地存储加载数据
    const storageValue =
      storageType === 'session'
        ? sessionStorage.getItem(storageKey)
        : localStorage.getItem(storageKey)
    if (storageValue !== null) {
      value.value = JSON.parse(storageValue)
    }
  } catch (e) {
    // 如果加载失败，则使用默认值
    console.error('Error loading storage item: ', e)
  }


  //   // 监听值的变化，更新本地存储
  watchEffect(() => {
    if (storageType === 'session') {
      if (value.value !== undefined)
        return sessionStorage.setItem(storageKey, JSON.stringify(value.value))
    } else {
      if (value.value !== undefined)
        return localStorage.setItem(storageKey, JSON.stringify(value.value))
    }
  })

  // 更新存储
  const updateStorage = (newValue: T) => {
    value.value = newValue
    try {
      if (storageType === 'session') {
        sessionStorage.setItem(storageKey, JSON.stringify(newValue))
      } else {
        localStorage.setItem(storageKey, JSON.stringify(newValue))
      }
    } catch (e) {
      console.error('Error setting storage item: ', e)
    }
  }

  // 移除存储
  const removeStorage = () => {
    try {
      if (storageType === 'session') {
        sessionStorage.removeItem(storageKey)
      } else {
        localStorage.removeItem(storageKey)
      }
    } catch (e) {
      console.error('Error removing storage item: ', e)
    }
  }

  // 返回值和它的响应式引用
  return { value, removeStorage, updateStorage }
}
