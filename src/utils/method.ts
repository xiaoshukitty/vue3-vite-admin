import { labelPages } from '@/data/enum/index'
import { LabelPagetype } from '@/data/enum/types'

/**
 * 根据路由类型获取字段列表
 * 根据传入进来的 routerType 返回对应的数组
 * @param {String} routerType 路由类型
 * @returns
 */

// 定义 getFields 的返回类型，假设默认值也是 LabelPage 数组
type FieldsListType = LabelPagetype[] | undefined

// 主函数 fieldsListEnum 定义
export const fieldsListEnum = (routerType: string): FieldsListType => {
  // 定义字段列表的 Map 类型
  const getFields = (routerType: string): FieldsListType => {
    let fieldsList = new Map<string, LabelPagetype[]>([
      ['labelPage', labelPages],
    ])

    // 返回对应的字段列表，或默认值
    return fieldsList.get(routerType) || fieldsList.get('default')
  }

  // 调用 getFields 并返回
  return getFields(routerType)
}
