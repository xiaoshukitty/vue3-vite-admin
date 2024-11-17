/**
 * 获取时间段（早上 | 上午 | 下午 | 晚上）
 * @returns {string} 返回对应的时间段
 */
export const getTime = (): string => {
  const hours = new Date().getHours()
  if (hours < 9) return '早上'
  if (hours < 12) return '上午'
  if (hours < 18) return '下午'
  return '晚上'
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
 * 格式化时间（分钟:秒）
 * @param {number} time - 秒数
 * @returns {string} 格式化后的时间，格式为 'mm:ss'
 */
export const getFormatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

/**
 * 获取当前星期几
 * @param {Date} date - 日期对象
 * @returns {string} 当前星期几的中文表示
 */
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
