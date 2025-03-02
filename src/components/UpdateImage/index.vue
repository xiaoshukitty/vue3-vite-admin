<template>
    <div class="update-image">
        <div class="upload-container">
            <!-- 上传按钮 -->
            <div v-if="imageList.length < maxCount" class="upload-img" @click="triggerFileInput">
                <el-icon style="color:#8c939d">
                    <Plus />
                </el-icon>
                <div class="upload-text">点击上传</div>
            </div>

            <!-- 图片预览列表 -->
            <div v-for="(image, index) in imageList" :key="index" class="image-preview">
                <img :src="image.url" alt="预览图片" />
                <div class="image-actions">
                    <el-icon class="close-icon" @click="removeImage(index)">
                        <Close />
                    </el-icon>
                </div>
            </div>
        </div>

        <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" accept="image/*" multiple />

        <!-- 添加上传按钮 -->
        <el-button type="primary" :loading="uploading" @click="handleUpload" class="upload-button"
            :disabled="imageList.length === 0">
            {{ uploading ? '上传中...' : '开始上传' }}
        </el-button>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import axios from "axios";
import { ElMessage } from 'element-plus';

interface ImageItem {
    url: string;
    file: File;
    uploading?: boolean;
    uploaded?: boolean;
    index: number;
}

const props = defineProps({
    maxCount: {
        type: Number,
        default: 5
    },
    maxSize: {
        type: Number,
        default: 7 // 默认2MB
    }
});

const emit = defineEmits(['update:images']);

const fileInput = ref<HTMLInputElement | null>(null);
const imageList = ref<ImageItem[]>([]);
const uploading = ref(false);
const currentUploadIndex = ref(-1);

// 触发文件选择
const triggerFileInput = () => {
    fileInput.value?.click();
};

// 文件大小和类型检查
const validateFile = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isLtSize = file.size / 1024 / 1024 < props.maxSize;

    if (!isImage) {
        ElMessage.error('只能上传图片文件!');
        return false;
    }
    if (!isLtSize) {
        ElMessage.error(`图片大小不能超过 ${props.maxSize}MB!`);
        return false;
    }
    return true;
};

// 处理文件选择
const onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
        const files = Array.from(input.files);
        const remainingSlots = props.maxCount - imageList.value.length;

        if (files.length > remainingSlots) {
            ElMessage.warning(`最多还能上传${remainingSlots}张图片`);
            return;
        }
        
        
        // 上传图片
        files.forEach((file, idx) => {
            if (validateFile(file)) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newIndex = imageList.value.length;
                    imageList.value.push({
                        url: e.target?.result as string,
                        file: file,
                        uploading: false,
                        uploaded: false,
                        index: newIndex
                    });
                    if (currentUploadIndex.value === -1) {
                        currentUploadIndex.value = 0;
                    }
                    emit('update:images', imageList.value);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    input.value = '';
};

// 删除图片
const removeImage = (index: number) => {
    if (index <= currentUploadIndex.value) {
        currentUploadIndex.value = Math.max(-1, currentUploadIndex.value - 1);
    }
    imageList.value.splice(index, 1);
    imageList.value.forEach((item, idx) => {
        item.index = idx;
    });
    emit('update:images', imageList.value);
};

// 处理上传
const handleUpload = async () => {
    if (imageList.value.length === 0) {
        ElMessage.warning('请先选择图片');
        return;
    }

    uploading.value = true;
    try {
        for (const item of imageList.value) {
            await handleSingleUpload(item, item.index);
        }
        
        // ElMessage.success('上传成功');
        // imageList.value = [];
        emit('update:images', imageList.value);
    } catch (error) {
        ElMessage.error('上传失败');
        console.error('Upload error:', error);
    } finally {
        uploading.value = false;
    }
};

const handleSingleUpload = async (item: ImageItem, index: number) => {
    if (item.uploaded) {
        ElMessage.warning('该图片已经上传过了');
        return;
    }

    if (index !== currentUploadIndex.value) {
        ElMessage.warning('请按顺序上传图片');
        return;
    }

    item.uploading = true;
    try {
        const formData = new FormData();
        formData.append("images", item.file);
        formData.append('timestamp', new Date().toISOString()); 
        
        const response = await axios.post("http://localhost:3000/carousel-upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        item.uploaded = true;
        ElMessage.success('上传成功');
        
        if (index < imageList.value.length - 1) {
            currentUploadIndex.value = index + 1;
        }
    } catch (error) {
        ElMessage.error('上传失败');
        console.error('Upload error:', error);
    } finally {
        item.uploading = false;
    }
};
</script>
<style scoped lang="scss">
.update-image {
    .upload-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .upload-img {
        width: 120px;
        height: 120px;
        background-color: #fafafa;
        border: 1px dashed #cdd0d6;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: border-color 0.3s;

        &:hover {
            border-color: #409eff;
        }

        .upload-text {
            margin-top: 8px;
            font-size: 12px;
            color: #8c939d;
        }
    }

    .image-preview {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 6px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .image-actions {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            gap: 8px;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s;

            .close-icon {
                color: #fff;
                font-size: 20px;
                cursor: pointer;
            }

            .el-button {
                padding: 4px 8px;
            }
        }

        &:hover .image-actions {
            opacity: 1;
        }
    }

    .upload-button {
        margin-top: 16px;
    }
}
</style>