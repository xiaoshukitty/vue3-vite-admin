import { createI18n } from 'vue-i18n'
import EN from './en_US'
import ZH from './zn_CN'

const messages = {
  'zh-CN': {
    ...ZH,
  },
  'en-US': {
    ...EN,
  },
}

const i18n = createI18n({
  locale: localStorage.getItem('LANG') || 'zh-CN', // 获取当前语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages,
})

export default i18n
