
import type { Plugin } from 'vue'

export const withInstall = <T, E extends Record<string, any>>(
  main: T, // 主组件，类型为泛型 T
  extra?: E,// 可选的额外扩展对象，类型为 E，它是一个键值对类型
): T => {
   // 将 install 方法添加到主组件 main 上，使其可以被 Vue 应用安装
  ;(main as SFCWithInstall<T>).install = (app): void => {
    // 安装主组件和额外的组件
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp) // 将组件注册到 Vue 应用中
    }
  }

  // 如果有额外的组件，绑定它们到 main 上
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp // 把 extra 的属性添加到 main 上
    }
  }
   // 返回扩展后的 main 组件，它是主组件 T 和额外组件 E 的组合
  return main as SFCWithInstall<T> & E
}

export type SFCWithInstall<T> = T & Plugin
