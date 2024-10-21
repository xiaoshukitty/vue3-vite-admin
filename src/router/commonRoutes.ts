import { RouteRecordRaw } from 'vue-router'

// 动态导入所有路由模块
const routeModules = import.meta.glob('./modules/*.ts', { eager: true })

// 定义一个存储所有路由的数组
const commonRoutes: RouteRecordRaw[] = []

// 遍历导入的模块，将每个模块的路由添加到 routes 数组中
Object.values(routeModules).forEach((module: any) => {
  // 确保模块默认导出的是 RouteRecordRaw 数组
  commonRoutes.push(...(module.default || []))
})


export default commonRoutes
