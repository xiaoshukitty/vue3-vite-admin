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

//内置主题
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
