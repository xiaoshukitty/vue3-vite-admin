import { labelPages } from '@/data/enum/index'

/**
 * 根据路由类型获取字段列表
 * 根据传入进来的 routerType 返回对应的数组
 * @param {String} routerType 路由类型
 * @returns
 */
export const fieldsListEnum = (routerType: string) => {
  const getFields = (routerType: string) => {
    let fieldsList = new Map([['labelPage', labelPages]])
    return fieldsList.get(routerType) || fieldsList.get('default')
  }

  return getFields(routerType)
}
