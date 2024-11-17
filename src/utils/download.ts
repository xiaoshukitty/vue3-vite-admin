/**
 * 通过url转换为blob格式的数据并下载视频文件
 * @param {string} url - 视频的下载地址
 * @param {string} name - 下载文件的名称
 */
export const getVideoArrayBuffer = async (
  url: string,
  name: string,
): Promise<void> => {
  try {
    // 使用 fetch 获取视频文件，设置响应类型为 arraybuffer
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`视频文件获取失败: ${response.statusText}`)
    }

    // 获取响应的 ArrayBuffer 数据
    const arrayBuffer = await response.arrayBuffer()

    // 将 ArrayBuffer 转换为 Blob 对象
    const blob = new Blob([arrayBuffer], { type: 'video/mp4' })

    // 创建下载链接
    const downloadUrl = URL.createObjectURL(blob)

    // 调用辅助函数进行文件下载
    triggerDownload(downloadUrl, name)

    // 下载后释放 Blob URL
    URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    // 详细的错误日志
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    console.error('视频下载失败:', errorMessage)
  }
}

/**
 * 辅助函数：触发文件下载
 * @param {string} downloadUrl - 创建的 Blob URL
 * @param {string} name - 下载文件的名称
 */
const triggerDownload = (downloadUrl: string, name: string): void => {
  // 创建一个隐藏的 <a> 标签来触发下载
  const anchor = document.createElement('a')
  anchor.href = downloadUrl
  anchor.download = name // 设置下载文件的名称
  anchor.style.display = 'none'

  // 将 <a> 标签添加到 DOM 中并模拟点击下载
  document.body.appendChild(anchor)
  anchor.click()

  // 下载完成后移除 <a> 标签
  document.body.removeChild(anchor)
}
