// 储存标签路由

import { defineStore } from 'pinia'
import { LabelRouteType } from '@/types/labelRouteType'

export const useLabelRoute = defineStore({
  id: 'usePlayerStore',
  state: () => ({
    labelRouteList: [] as LabelRouteType[],
  }),
  actions: {
    //添加标签路由
    addLabelRoute(labelRoute: LabelRouteType) {
      console.log('labelRoute---', labelRoute)
    },
  },
  getters: {},
})
