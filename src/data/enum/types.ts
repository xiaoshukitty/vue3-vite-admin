export type userAuthorityEnumType = {
  value: string
  label: string
}

// 右键菜单
export interface LabelPagetype {
  name: string
  icon: string
  label: string
}

//主题tab切换
export type ThemeTab = '外观' | '布局' | '功能'

//内置主题 用于约束颜色对象
export type ThemeColor = {
  name: string
  color: string
}

// 定义 WebItem 类型
export interface WebItem {
  id: number
  title: string
  introduce: string
  webDate: string
  type: string
  icon: string
  link: string
}

//首页最新动态类型
export type DynamicData = {
  id: number
  name: string
  icon: string
  date: string
  info: string
}
