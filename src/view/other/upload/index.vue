<template>
    <div :class="['upload', isDarkTheme ? 'upload-theme' : '']">
        <el-button type="primary" @click="openDialog">模拟上传</el-button>
        <el-dialog v-model="dialogVisible" title="上传" width="800" align-center>
            <div class="upload_content">
                <p class="alert-text">
                    支持图片(jpg、jpeg、png格式，单次最多选择50张，每张不可大于3MB，大于3MB会自动为您过滤)和视频。
                </p>
                <div class="upload-file">
                    <div>
                        <div v-if="uploadImageUrl == ''" class="upload-img" @click="triggerFileInput">
                            <el-icon style="color:#8c939d">
                                <Plus />
                            </el-icon>
                        </div>
                        <div v-if="uploadImageUrl" class="image-preview">
                            <img :src="uploadImageUrl" alt="预览图片" />
                        </div>
                        <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" />
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="closeDialog" type="primary">关闭</el-button>
                    <el-button @click="startUpload" type="success">开始上传</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed } from 'vue';
import { useThemeStore } from '@/store/modules/theme';
import { ElMessage } from 'element-plus';


const layOutThemeStore = useThemeStore();
const dialogVisible = ref(false);
const MAX_SIZE_MB = 1; // 最大文件大小 (单位：MB)
// 使用 ref 获取文件上传 input 元素的引用
const fileInput = ref<HTMLInputElement | null>(null);
const uploadImageUrl = ref('');
const uploadSuccess = ref(false); // 上传成功标志
const uploadError = ref<string | null>(null); // 上传失败信息
const file = ref<File | null>(null); // 存储选择的文件
const imageInfo = ref(null); // 存储上传的图片信息
const imageSrc = ref(''); // 存储图片的 src，用于显示图片

// 判断主题
const isDarkTheme = computed(() => layOutThemeStore.theme === 'dark');

// 打开上传对话框
const openDialog = () => {
    dialogVisible.value = true;
};

// 关闭上传对话框
const closeDialog = () => {
    dialogVisible.value = false;
};
const triggerFileInput = () => {
    // 触发 input 的点击事件
    fileInput.value?.click();
}

// 选择文件时，更新 file
const onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        file.value = input.files[0];
        uploadError.value = null; // 清除之前的错误
        uploadSuccess.value = false;

        const isImgType = beforeUpload(input.files[0]);
        if (!isImgType) return;

        // 使用 FileReader 或 URL.createObjectURL 显示图片
        const reader = new FileReader();

        // 监听文件读取完成事件
        reader.onload = () => {
            uploadImageUrl.value = reader.result as string;  // 获取图片的 base64 URL
        };

        // 读取文件
        reader.readAsDataURL(file.value);
    }
};


// 开始上传（模拟接口调用）
const startUpload = () => {
    if (uploadImageUrl.value.length === 0) {
        ElMessage.warning('请先上传文件！');
        return;
    }
    ElMessage.success('开始上传！');
    uploadImage();

};

// 检查上传文件的大小和类型
const beforeUpload = (file: File) => {
    const isImageOrVideo = file.type.startsWith('image/') || file.type.startsWith('video/');
    const isBelowMaxSize = file.size / 1024 / 1024 < MAX_SIZE_MB;

    if (!isImageOrVideo) {
        ElMessage.error('只能上传图片或视频文件！');
        return false;
    }
    if (!isBelowMaxSize) {
        ElMessage.warning(`${file.name} 文件超过 ${MAX_SIZE_MB}MB，将自动过滤。`);
        return false;
    }
    return true; // 允许上传
};

// 处理文件上传
const uploadImage = async () => {
    if (!file.value) return;

    const formData = new FormData();
    formData.append("image", file.value); // 'image' 为后端接收文件字段名
    formData.append('timestamp', new Date().toISOString());  // 手动添加时间戳，ISO 格式  formData.append('timestamp', new Date().toISOString());  // 手动添加时间戳，ISO 格式


    uploadSuccess.value = false;
    uploadError.value = null;

    // 设置上传进度条初始值
    dialogVisible.value = true;

    try {
        // 上传文件到服务器
        const response = await axios.post("http://localhost:3000/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // 必须设置请求头
            },
        });
        console.log(response.data);
        // 上传成功，返回图片信息
        imageInfo.value = response.data.image;

        // 如果需要显示图片，可以用 Base64 编码的方式显示
        imageSrc.value = await `data:${response.data.image.mime_type};base64,${response.data.image.image}`;
        console.log(imageSrc.value);
        setTimeout(() => {
            ElMessage.success('上传成功');
            uploadSuccess.value = true;
        }, 600)
    } catch (error: any) {
        console.error(error);
        uploadError.value = error.response?.data || "上传失败，请重试";
    } finally {
        setTimeout(() => {
            dialogVisible.value = false;
            uploadImageUrl.value = ''; // 清空上传图片 URL
        }, 500)

    }
};


</script>

<style scoped lang="scss">
.upload {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;

    .upload_content {
        .alert-text {
            background-color: rgb(236, 245, 255) !important;
            border: 1px solid rgb(64, 158, 255) !important;
            color: rgb(64, 158, 255) !important;
            padding: 0.5rem 1rem;
            box-sizing: border-box;
            display: flex;
            margin: 0;
            font-size: 0.875rem;
            line-height: 1.375rem;
        }

        .upload-file {
            margin: 1.25rem 0 12.5rem;

            .upload-img {
                width: 120px;
                height: 120px;
                background-color: #fafafa;
                border: 1px dashed #cdd0d6;
                border-radius: 6px;
                box-sizing: border-box;
                cursor: pointer;
                vertical-align: top;
                display: inline-flex;
                justify-content: center;
                align-items: center;
            }

            .image-preview {
                width: 120px;
                height: 120px;

                img {
                    border-radius: 6px;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }

    &-theme {
        background-color: var(--background-theme-color) !important;
        border: 0.0625rem solid var(--border-theme-color) !important;
    }
}
</style>