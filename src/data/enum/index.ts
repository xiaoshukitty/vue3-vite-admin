import {
  userAuthorityEnumType,
  LabelPagetype,
  ThemeTab,
  ThemeColor,
  WebItem,
} from './types'
export const userAuthorityEnum: userAuthorityEnumType[] = [
  {
    value: '1',
    label: 'User',
  },
  {
    value: '2',
    label: 'Admin',
  },
  {
    value: '3',
    label: 'Super',
  },
]

export const labelPages: LabelPagetype[] = [
  {
    name: '关闭',
    icon: 'Close',
    label: 'close',
  },
  {
    name: '重新加载',
    icon: 'Refresh',
    label: 'refresh',
  },
  {
    name: '全部关闭',
    icon: 'Operation',
    label: 'operation',
  },
  {
    name: '关闭左则',
    icon: 'Back',
    label: 'back',
  },
  {
    name: '关闭右侧',
    icon: 'Right',
    label: 'right',
  },
  {
    name: '在新的窗口打开',
    icon: 'TopRight',
    label: 'topRight',
  },
]

/**主题设置 */
//主题tab切换
export const themeTabList: ThemeTab[] = ['外观', '布局', '功能']
// export const themeTabList = ['外观', '布局', '功能'] as const;

//内置主题

export const themeColorList: ThemeColor[] = [
  { name: '默认', color: '#006be6' },
  { name: '紫罗兰', color: 'rgb(113, 102, 240)' },
  { name: '樱花粉', color: 'rgb(232, 74, 108)' },
  { name: '柠檬黄', color: 'rgb(239, 189, 72)' },
  { name: '天蓝色', color: 'rgb(78, 105, 253)' },
  { name: '浅绿色', color: 'rgb(11, 208, 146)' },
  { name: '锌色灰', color: 'rgb(63, 63, 70)' },
  { name: '深绿色', color: 'rgb(13, 148, 150)' },
  { name: '深蓝色', color: 'rgb(9, 96, 190)' },
  { name: '橙黄色', color: 'rgb(193, 66, 11)' },
  { name: '玫瑰红', color: 'rgb(187, 27, 27)' },
  { name: '中性色', color: 'rgb(64, 64, 64)' },
  { name: '石板灰', color: 'rgb(52, 66, 86)' },
  { name: '中灰色', color: 'rgb(56, 66, 82)' },
  { name: '自定义', color: 'rgb(223, 223, 223)' },
]

/**
 * 概览页面数据
 */
export const webItems: WebItem[] = [
  {
    id: 1,
    title: 'Github',
    introduce: '不要等待机会，而要创造机会。',
    webDate: '2024-07-27',
    type: '开源组',
    icon: 'github-fill',
    link: 'https://github.com/xiaoshukitty',
  },
  {
    id: 2,
    title: 'Vue',
    introduce: '现在的你决定将来的你。',
    webDate: '2024-07-27',
    type: '算法组',
    icon: 'Vue',
    link: 'https://cn.vuejs.org/',
  },
  {
    id: 3,
    title: 'Html5',
    introduce: '没有什么才能比努力更重要。',
    webDate: '2024-07-27',
    type: '上班摸鱼',
    icon: 'HTML5',
    link: 'https://www.runoob.com/html/html5-intro.html',
  },
  {
    id: 4,
    title: 'Angular',
    introduce: '热情和欲望可以突破一切难关。',
    webDate: '2024-07-27',
    type: '技术牛',
    icon: 'angular',
    link: 'https://vitejs.cn/',
  },
  {
    id: 5,
    title: 'React',
    introduce: '健康的身体是实现目标的基石。',
    webDate: '2024-07-27',
    type: 'React',
    icon: 'React',
    link: 'https://element.eleme.cn/#/zh-CN',
  },
  {
    id: 6,
    title: 'Js',
    introduce: '路是走出来的，而不是空想出来的。',
    webDate: '2024-07-27',
    type: '架构组',
    icon: 'JavaScript',
    link: 'https://www.w3school.com.cn/js/index.asp',
  },
]
