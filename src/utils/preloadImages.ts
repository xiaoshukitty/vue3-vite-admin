/**
 * 处理图片预加载
 */

//需要预加载的图片组
const images = [
  'https://raw.githubusercontent.com/xiaoshukitty/img-folder/refs/heads/main/17.jpeg',
]

//因为浏览器每次只能请求6个，这边根据传入的参数，来控制预加载的图片数量 
export default function preloadImages(max = 3) {
  const _images = [...images] //拷贝一份
  function loadImage() {
    const src = _images.shift()! //非空断言
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'preload' //预加载
      link.as = 'image' //资源图片
      link.href = src
      document.head.appendChild(link)
      link.onload = resolve // promise 完成
      link.onerror = reject // promise 失败
      setTimeout(reject, 10000) //超时加载 10000 ms 自动失败
    })
  }

  function _loadImage() {
    // 成功失败都执行
    loadImage().finally(() => {
      //递归，直到 images 为空
      if (_images.length > 0) {
        _loadImage()
      }
    })
  }

  for (let i = 0; i < max; i++) {
    _loadImage()
  }
}
