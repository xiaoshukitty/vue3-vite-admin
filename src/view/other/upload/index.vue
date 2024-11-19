<template>
    <div :class="['upload', isDarkTheme ? 'upload-theme' : '']">
        <el-button type="primary" @click="openDialog">模拟上传</el-button>
        <el-dialog v-model="dialogVisible" title="上传" width="800" align-center>
            <div class="upload_content">
                <p class="alert-text">
                    支持图片(jpg、jpeg、png格式，单次最多选择50张，每张不可大于3MB，大于3MB会自动为您过滤)和视频。
                </p>
                <div class="upload-file">
                    <el-upload ref="uploadRef" action="your-upload-api-endpoint" :limit="50" :on-exceed="handleExceed"
                        :file-list="fileList" :on-change="handleChange" :before-upload="beforeUpload"
                        list-type="picture-card" accept="image/*,video/*">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
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
import { ref, computed } from 'vue';
import { useThemeStore } from '@/store/modules/theme';
import { ElMessage } from 'element-plus';

const MAX_SIZE_MB = 3; // 最大文件大小 (单位：MB)
const MAX_FILES = 50; // 最大文件数量

const layOutThemeStore = useThemeStore();
const dialogVisible = ref(false);
const fileList = ref<any[]>([]);
const uploadRef = ref(); // ElUpload实例

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

// 开始上传（模拟接口调用）
const startUpload = () => {
    if (fileList.value.length === 0) {
        ElMessage.warning('请先上传文件！');
        return;
    }
    ElMessage.success('开始上传！');
    dialogVisible.value = false;
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

// 超出文件数量限制的提示
const handleExceed = () => {
    ElMessage.warning(`最多只能上传 ${MAX_FILES} 个文件！`);
};

// 文件上传变化处理（如新增或移除）
const handleChange = (file: any, fileListArray: any[]) => {
    fileList.value = fileListArray; // 更新文件列表
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
        }
    }

    &-theme {
        background-color: var(--background-theme-color) !important;
        border: 0.0625rem solid var(--border-theme-color) !important;
    }
}
</style>