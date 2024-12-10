import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export function useUploadImage(
  uploadAction = 'http://localhost:3000/pic/addPic', // 默认上传地址
  maxSize = 2, // 最大文件大小 (单位：MB)
  allowedFormats = ['jpg', 'jpeg', 'png'], // 允许的图片格式
) {
  const fileList = ref<Array<any>>([]) // 存储已上传文件列表
  const uploading = ref(false) // 上传状态

  // 校验图片格式和大小
  const beforeUpload = (file: File) => {
    const isAllowedFormat = allowedFormats.some((format) =>
      file.type.includes(format),
    )
    if (!isAllowedFormat) {
      ElMessage.error(`只支持 ${allowedFormats.join(', ')} 格式的图片`)
      return false
    }

    const isLtMaxSize = file.size / 1024 / 1024 < maxSize
    if (!isLtMaxSize) {
      ElMessage.error(`上传图片大小不能超过 ${maxSize}MB`)
      return false
    }

    return true
  }

  // 上传成功回调
  const handleSuccess = (response: any, file: any) => {
    if (response.success) {
      ElMessage.success('上传成功')
      fileList.value.push({
        name: file.name,
        url: response.url || '', // 根据后端返回字段调整
      })
    } else {
      ElMessage.error(response.message || '上传失败')
    }
  }

  // 上传失败回调
  const handleError = (error: any) => {
    ElMessage.error('上传失败')
    console.error('Upload Error:', error)
  }

  // 删除文件回调
  const handleRemove = (file: any, fileListNew: any[]) => {
    ElMessage.info('已删除图片')
    fileList.value = fileListNew
  }

  return {
    fileList,
    uploading,
    beforeUpload,
    handleSuccess,
    handleError,
    handleRemove,
    uploadAction,
  }
}
