export type userAuthorityEnumType = {
  value: string
  label: string
}

// 右键菜单
export interface labelPagetype {
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
