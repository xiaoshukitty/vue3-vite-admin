interface Meta {
  title: string
  hidden: boolean
  icon: string
  requiresAuth?: boolean
  roles?: string[]
}

// 路由类型
export interface RouteType {
  path: string
  component?: () => Promise<any>
  name?: string
  meta: Meta
  redirect?: string
  children?: RouteType[] // Recursive type for nested routes
}

export interface StateType {
  labelRouteList: RouteType[]
  labelIndex: string
}
