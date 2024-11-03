//封装函数：获取 早上｜下午｜上午｜晚上
export const getTime = (): string => {
  let message = ''
  let hours = new Date().getHours()
  console.log(hours, 'hours')

  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}

/**
 *
 * @param type 类型 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm:ss'
 * @param week 是否显示星期
 * @returns
 */
export const getCurrentDate = <T>(type: T, week?: boolean): T | undefined => {
  const cureenDateObj = {
    'yyyy-MM-dd': () => {
      const cureenWeekDay = weekDay()
      if (week) {
        return (
          new Date().toLocaleDateString().replace(/\//g, '-') +
          ' ' +
          cureenWeekDay
        )
      }
    },
    'yyyy-MM-dd HH:mm:ss': () => {
      return new Date().toLocaleString().replace(/\//g, '-')
    },
  } as any
  return cureenDateObj[type]()
}

/**
 * 获取时间格式
 * @param time 秒数
 * @returns 0:13
 */
export const getFormatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

//获取当时星期
const weekDay = (): string => {
  var date = new Date()
  var weekDays = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  return weekDays[date.getDay()]
}
