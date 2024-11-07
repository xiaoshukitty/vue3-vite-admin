// 储存标签路由

import { defineStore } from 'pinia'
import type { StateType, RouteType } from '@/store/modules/types/labelRouteType'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

export const useLabelRoute = defineStore({
  id: 'usePlayerStore',
  state: (): StateType => ({
    labelRouteList: JSON.parse(
      localStorage.getItem('labelRouteList') || '[]',
    ) as RouteType[], // 标签路由列表
    labelIndex: '', //当前标签索引
    currentRoute: useRoute(), //当前路由
    currentRouter: useRouter(), //当前路由对象
  }),
  actions: {
    //添加标签路由
    addLabelRoute(labelRoute: RouteType) {
      if (this.labelRouteList.length === 0) {
        this.labelRouteList.push(labelRoute)
        localStorage.setItem(
          'labelRouteList',
          JSON.stringify(this.labelRouteList),
        )
      } else {
        let flag = deWeight(this.labelRouteList, labelRoute)

        if (flag === 1) {
          this.labelRouteList.push(labelRoute)
          localStorage.setItem(
            'labelRouteList',
            JSON.stringify(this.labelRouteList),
          )
        }
      }
    },
    // 关闭标签路由
    closeLabelRoute(item: RouteType, type?: string) {
      let list: RouteType | undefined

      if (this.labelRouteList.length == 1) {
        return ElMessage.warning('最后一个标签不能关闭')
      }
      //关闭全部
      if (type == 'all') {
        this.labelRouteList = [item]
        this.labelIndex = item.path
        localStorage.setItem(
          'labelRouteList',
          JSON.stringify(this.labelRouteList),
        )
        return
      }
      //关闭左侧
      if (type == 'left') {
        const index = this.labelRouteList.findIndex(
          (e: RouteType) => e.path === item.path,
        )
        if (index !== -1) {
          // 删除 target 之前的所有元素
          this.labelRouteList.splice(0, index)
        }
        localStorage.setItem(
          'labelRouteList',
          JSON.stringify(this.labelRouteList),
        )
        return
      }
      //关闭右侧
      if (type == 'right') {
        const index = this.labelRouteList.findIndex(
          (e: RouteType) => e.path === item.path,
        )
        if (index !== -1) {
          // 删除 target 之后的所有元素（包括目标元素后面的所有元素）
          this.labelRouteList.splice(index + 1)
        }
        localStorage.setItem(
          'labelRouteList',
          JSON.stringify(this.labelRouteList),
        )
        return
      }
      this.labelRouteList.forEach((route: RouteType) => {
        if (route.path == this.labelIndex) {
          list = route
        }
      })
      // 当前的标签索引
      let flag = this.labelRouteList.indexOf(list as RouteType)
      // 要删除的标签索引
      let delFlag = this.labelRouteList.indexOf(item)
      let copyRecordRoute = JSON.parse(
        JSON.stringify(this.labelRouteList),
      ) as RouteType[]
      this.labelRouteList = copyRecordRoute.filter((route: RouteType) => {
        return route.path != item.path
      })
      if (flag == delFlag || flag == -1) {
        let Obj = this.labelRouteList[this.labelRouteList.length - 1]
        this.labelIndex =
          this.labelRouteList[this.labelRouteList.length - 1].path
        this.skipRouter(Obj)
      }
      if (flag != delFlag) {
        localStorage.setItem(
          'labelRouteList',
          JSON.stringify(this.labelRouteList),
        )
      }
    },
    // 路由跳转
    skipRouter(item: RouteType) {
      if (this.currentRoute.path === item.path) return
      this.currentRouter.push(item.path)
      console.log('this.labelRouteList', this.labelRouteList)
      localStorage.setItem(
        'labelRouteList',
        JSON.stringify(this.labelRouteList),
      )
      this.labelIndex = item.path
    },
  },
  getters: {},
})

/**
 * 检查标签路由列表中是否已经存在该路由
 * @param arr 标签路由列表
 * @param newArr 当前路由
 * @returns
 */
const deWeight = (arr: Array<any>, newArr: any) => {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] && arr[i].path == newArr.path) {
      return -1
    }
  }
  return 1
}
