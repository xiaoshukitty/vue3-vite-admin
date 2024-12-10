<template>
    <div class="sort-dialog">
        <el-dialog v-model="dialogVisible" title="添加排序功能" width="35%" :show-close="false" :close-on-click-modal="false">
            <div class="d-flex j-center">
                <el-form :model="formDialog" label-width="auto" style="max-width: 600px">
                    <el-form-item label="排序名称">
                        <el-input v-model="formDialog.sortName" style="width: 300px;" />
                    </el-form-item>
                    <el-form-item label="图片">
                        <div>
                            <el-upload class="upload-demo" :limit="1" :on-exceed="() => ElMessage.error('最多只能上传1张图片')"
                                :action="uploadAction" :on-success="handleSuccess" :on-error="handleError"
                                :on-remove="handleRemove" :file-list="fileList" :before-upload="beforeUpload"
                                list-type="picture-card" :headers="headers">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item label="排序层级">
                        <el-select v-model="formDialog.hierarchy" placeholder="请选择排序层级">
                            <el-option label="1" value="A" />
                            <el-option label="2" value="B" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cancelDialog">关闭</el-button>
                    <el-button type="primary" @click="confirmDialog">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { defineProps, ref, watch, defineEmits, reactive } from 'vue'
import { useUploadImage } from '@/hooks/useUploadImage'
import { ElMessage } from 'element-plus';

const props = defineProps({
    isdialogVisible: {
        type: Boolean,
        default: false
    }
})
// 事件定义
const emits = defineEmits(['update:isdialogVisible'])

const dialogVisible = ref(false);
const formDialog = reactive({
    sortName: '',
    hierarchy: ''
})
const {
    fileList,
    beforeUpload,
    handleSuccess,
    handleError,
    handleRemove,
    uploadAction,
} = useUploadImage('http://localhost:3000/pic/addPic', 1, ['jpg', 'jpeg', 'png', 'webp', 'gif']);

// 自定义请求头（例如 Authorization）
const headers = {
    Authorization: 'Bearer <your-token>',
};

// 监听关闭弹窗
watch(
    () => props.isdialogVisible,
    (newVal: boolean) => {
        dialogVisible.value = newVal
    },
    { immediate: true }
)

//关闭弹窗
const cancelDialog = () => {
    emits('update:isdialogVisible', false)
}

// 确认弹窗
const confirmDialog = () => {
    emits('update:isdialogVisible', false)
}
</script>
<style scoped lang="scss"></style>