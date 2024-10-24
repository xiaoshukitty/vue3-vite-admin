// 储存标签路由

import { defineStore } from 'pinia'
import { LabelRouteType } from '@/types/labelRouteType'

export const useLabelRoute = defineStore({
  id: 'usePlayerStore',
  state: () => ({
    labelRouteList:
      JSON.parse(localStorage.getItem('labelRouteList')) ||
      ([] as LabelRouteType[]), // 标签路由列表
    laberIndex: '', //当前标签索引
  }),
  actions: {
    //添加标签路由
    addLabelRoute(labelRoute: LabelRouteType) {
      console.log('this.labelRouteList--', this.labelRouteList)
      if (this.labelRouteList.length === 0) {
        this.labelRouteList.push(labelRoute)
        localStorage.setItem(
          'labelRouteList',
          JSON.stringify(this.labelRouteList),
        )
      } else {
        let flag = deWeight(this.labelRouteList, labelRoute)
        console.log('flag', flag)
        console.log('labelRoute--', labelRoute)

        if (flag === 1) {
          this.labelRouteList.push(labelRoute)
          localStorage.setItem(
            'labelRouteList',
            JSON.stringify(this.labelRouteList),
          )
        }
      }
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
