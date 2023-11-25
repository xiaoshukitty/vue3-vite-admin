//封装函数：获取 早上｜下午｜上午｜晚上
export const getTime = () => {
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
