// 用户权限枚举类型
export type userAuthorityEnumType = {
  value: string // 权限值
  label: string // 权限标签
}

// 右键菜单项
export interface LabelPagetype {
  name: string // 菜单项名称
  icon: string // 图标
  label: string // 标签描述
}

// 主题 Tab 类型，用于切换外观、布局和功能
export type ThemeTab = '外观' | '布局' | '功能'

// 内置主题颜色类型，用于约束颜色对象
export type ThemeColor = {
  name: string // 颜色名称
  color: string // 颜色值
}

// Web 项目类型，描述 Web 项目的基本信息
export interface WebItem {
  id: number // Web 项目唯一标识
  title: string // 项目标题
  introduce: string // 项目简介
  webDate: string // 创建/发布日期
  type: string // 项目类型
  icon: string // 项目图标
  link: string // 项目链接
}

// 首页最新动态类型，描述动态信息
export type DynamicData = {
  id: number // 动态唯一标识
  name: string // 动态名称
  icon: string // 动态图标
  date: string // 发布日期
  info: string // 动态信息描述
}
