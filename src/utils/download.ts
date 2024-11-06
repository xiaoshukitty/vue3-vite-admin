/**
 * 通过url 转为blob格式的数据(下载视频)
 * @param {String} url 下载地址
 * @param {any} name 下载名称
 */
export const getVideoArrayBuffer = async (
  url: string,
  name: string,
): Promise<void> => {
  try {
    // 使用 fetch 获取视频文件，设置响应类型为 arraybuffer
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('视频文件获取失败')
    }
    // 获取响应的 arraybuffer
    const arrayBuffer = await response.arrayBuffer()

    // 将 arraybuffer 转换为 Blob 对象
    const blob = new Blob([arrayBuffer], { type: 'video/mp4' })

    // 创建一个 URL 对象，指向 Blob 数据
    const downLoadUrl = URL.createObjectURL(blob)

    // 创建一个隐藏的 <a> 标签来触发下载
    const a = document.createElement('a')
    a.href = downLoadUrl
    a.download = name // 设置下载文件的名称
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click() // 模拟点击下载

    // 下载后移除 <a> 标签并释放 URL
    a.remove()
    URL.revokeObjectURL(downLoadUrl)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('视频下载失败:', error.message)
    } else {
      console.error('视频下载失败，未知错误:', error)
    }
  }
}
