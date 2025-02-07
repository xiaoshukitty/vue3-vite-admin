<template>
    <div :class="['blogs', layOutThemeStore.theme === 'dark' ? 'blogs-theme' : '']">
        <div class="color-box">
            <div class="bg-img">
                <!-- <el-image src="/public//images/17.jpeg" lazy /> -->
                <img :src="imageUrl" alt="Uploaded Image" />
            </div>
            <div class="color-show">
                <el-form :model="formInfo" label-width="auto">
                    <el-form-item label="背景图">
                        <div class="upload-bg-img">
                            <div style="display: flex; align-items: flex-end;">
                                <div>
                                    <div v-if="uploadImageUrl == ''" class="upload-img" @click="triggerFileInput">
                                        <el-icon style="color:#8c939d">
                                            <Plus />
                                        </el-icon>
                                    </div>
                                    <div v-if="uploadImageUrl" class="image-preview">
                                        <img :src="uploadImageUrl" alt="预览图片" />
                                    </div>
                                </div>
                                <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" />
                                <el-button type="primary" class="upload-btn" @click="uploadImage">上传</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="头像">
                        <div class="upload-bg-img">

                            <div style="display: flex; align-items: flex-end;">
                                <div>
                                    <div class="upload-img">
                                        <el-icon style="color:#8c939d">
                                            <Plus />
                                        </el-icon>
                                    </div>
                                </div>
                                <el-button type="primary" class="upload-btn">上传</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="formInfo.userName" />
                    </el-form-item>
                    <el-form-item label="个人标签">
                        <el-input v-model="formInfo.labels" />
                    </el-form-item>
                    <el-form-item label="座右铭">
                        <el-input v-model="formInfo.motto" type="textarea" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import axios from "axios";
import { ref, onMounted, reactive } from 'vue';
import { useThemeStore } from '@/store/modules/theme';

const layOutThemeStore = useThemeStore();

const imageId = 31; // 假设图片的 ID 为 1
const imageUrl = ref('');
// 使用 ref 获取文件上传 input 元素的引用
const fileInput = ref<HTMLInputElement | null>(null);

const uploadImageUrl = ref('');

const file = ref<File | null>(null); // 存储选择的文件
const uploading = ref(false); // 上传状态
const uploadSuccess = ref(false); // 上传成功标志
const uploadError = ref<string | null>(null); // 上传失败信息
const imageInfo = ref(null); // 存储上传的图片信息
const imageSrc = ref(''); // 存储图片的 src，用于显示图片
const formInfo = reactive({
    userName: '',
    labels: '',
    motto: '',
})


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


const getBgImage = async () => {
    // 获取图片
    try {
        // 使用 axios 获取图片信息
        const response = await axios.get(`http://localhost:3000/image/${imageId}`);
        console.log(response.data);

        // 将获取到的图片信息存储到 `imageInfo` 中
        imageUrl.value = response.data;
        // 设置图片的 Base64 编码 URL 作为 src
        imageUrl.value = `data:${response.data.mime_type};base64,${response.data.image}`;

    } catch (error) {
        // 错误处理
        // errorMessage.value = '图片获取失败，请稍后再试。';
        console.error(error);
    } finally {
        // loading.value = false;  // 加载完成，无论成功还是失败
    }
}

// 处理文件上传
const uploadImage = async () => {
    if (!file.value) return;

    const formData = new FormData();
    formData.append("image", file.value); // 'image' 为后端接收文件字段名
    formData.append('timestamp', new Date().toISOString());  // 手动添加时间戳，ISO 格式  formData.append('timestamp', new Date().toISOString());  // 手动添加时间戳，ISO 格式


    uploadSuccess.value = false;
    uploadError.value = null;

    // 设置上传进度条初始值
    uploading.value = true;

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

        uploadSuccess.value = true;
    } catch (error: any) {
        console.error(error);
        uploadError.value = error.response?.data || "上传失败，请重试";
    } finally {
        uploading.value = false;
    }
};

onMounted(() => {
    getBgImage();
})
</script>
<style scoped lang='scss'>
.blogs {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;
    display: flex;

    .color-box {
        width: 100%;
        display: flex;
        height: calc(100vh - 14.875rem);
        overflow: hidden;

        .bg-img {
            width: 65%;
            padding-right: 1rem;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 0.5rem;
            }
        }

        .color-show {
            width: 35%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .upload-bg-img {

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


                .upload-btn {
                    margin-left: 10px;
                }

                .color-show-item {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-top: 1rem;

                    .color-show-item-title {
                        font-size: 0.875rem;
                        font-weight: 600;
                        color: var(--text-color);
                        margin-bottom: 0.5rem;
                    }
                }
            }

            ::v-deep .el-form-item__content {
                width: 240px;
            }
        }
    }

    &-theme {
        background-color: var(--background-theme-color) !important;
        border: .0625rem solid var(--border-theme-color) !important;
    }
}
</style>