<template>
    <div class="article-operation">
        <div class="page-header">
            <h2>发布文章</h2>
        </div>

        <el-form :model="articleForm" :rules="rules" ref="formRef" label-width="100px">
            <el-form-item label="文章类型" prop="type">
                <el-radio-group v-model="articleForm.type">
                    <el-radio label="text">文字文章</el-radio>
                    <el-radio label="images">图片组文章</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="文章标题" prop="title">
                <el-input v-model="articleForm.title" placeholder="请输入文章标题" maxlength="100" show-word-limit />
            </el-form-item>

            <el-form-item label="文章分类" prop="category">
                <el-select v-model="articleForm.category" placeholder="请选择文章分类">
                    <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="文章标签" prop="tags">
                <el-select v-model="articleForm.tags" multiple filterable allow-create placeholder="请选择或创建标签">
                    <el-option v-for="tag in tags" :key="tag.value" :label="tag.label" :value="tag.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="文章封面">
                <el-upload class="cover-uploader" :show-file-list="false" :on-success="handleCoverSuccess"
                    :before-upload="beforeCoverUpload">
                    <img v-if="articleForm.coverUrl" :src="articleForm.coverUrl" class="cover" />
                    <el-icon v-else class="cover-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

            <template v-if="articleForm.type === 'text'">
                <el-form-item label="文章内容" prop="content">
                    <div style="border: 1px solid #ccc">
                        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef"
                            :defaultConfig="toolbarConfig" mode="default" />
                        <Editor style="height: 500px; overflow-y: hidden;" v-model="content"
                            :defaultConfig="editorConfig" mode="default" @onCreated="handleCreated" />
                    </div>
                </el-form-item>
            </template>

            <template v-else>
                <el-form-item label="图片组" prop="imageList">
                    <el-upload v-model:file-list="articleForm.imageList" list-type="picture-card" :multiple="true"
                        :limit="20" :on-preview="handlePictureCardPreview" :on-success="handleImageSuccess"
                        :before-upload="beforeImageUpload">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>

                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>

                    <div v-if="articleForm.imageList.length" class="image-descriptions">
                        <div v-for="(item, index) in articleForm.imageList" :key="index" class="image-desc-item">
                            <el-input v-model="item.description" :placeholder="`请输入第${index + 1}张图片的描述`" type="textarea"
                                rows="2" />
                        </div>
                    </div>
                </el-form-item>
            </template>

            <el-form-item>
                <el-button type="primary" @click="handleSubmit" :loading="submitting">
                    发布文章
                </el-button>
                <el-button @click="handleDraft">保存草稿</el-button>
                <el-button @click="handlePreview">预览</el-button>
            </el-form-item>
        </el-form>

        <el-dialog v-model="previewVisible" title="文章预览" width="70%" :before-close="handlePreviewClose">
            <div class="preview-content">
                <h1>{{ articleForm.title }}</h1>
                <div v-html="articleForm.textContent"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, reactive, shallowRef, computed, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';


const formRef = ref()
const submitting = ref(false)
const previewVisible = ref(false)

const articleForm = reactive({
    title: '测试文章',
    category: '',
    tags: [],
    coverUrl: '',
    type: 'text',
    textContent: '',
    imageList: [] as any[]
})

const categories = [
    { value: 'tech', label: '技术' },
    { value: 'life', label: '生活' },
    { value: 'other', label: '其他' }
]

const tags = [
    { value: 'vue', label: 'Vue' },
    { value: 'react', label: 'React' },
    { value: 'javascript', label: 'JavaScript' }
]

const rules = {
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        { min: 3, max: 100, message: '标题长度在 3 到 100 个字符', trigger: 'blur' }
    ],
    category: [
        { required: true, message: '请选择文章分类', trigger: 'change' }
    ],
    content: [
        {
            required: true,
            message: '请输入文章内容',
            trigger: 'blur',
            validator: (rule: any, value: any) => {
                if (articleForm.type === 'text' && !articleForm.textContent) {
                    return Promise.reject('请输入文章内容')
                }
                return Promise.resolve()
            }
        }
    ],
    type: [
        { required: true, message: '请选择文章类型', trigger: 'change' }
    ],
    imageList: [
        {
            required: true,
            message: '请上传至少一张图片',
            trigger: 'change',
            validator: (rule: any, value: any[]) => {
                if (articleForm.type === 'images' && (!value || value.length === 0)) {
                    return Promise.reject('请上传至少一张图片')
                }
                return Promise.resolve()
            }
        }
    ]
}

// 富文本编辑器相关
const editorRef = shallowRef()
const content = computed({
    get: () => articleForm.textContent,
    set: (val) => {
        articleForm.textContent = val
    }
})

const toolbarConfig = {
    excludeKeys: []
}

const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            customUpload: (file: File, insertFn: any) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    insertFn(reader.result)
                }
            }
        }
    }
}

const handleCreated = (editor: any) => {
    editorRef.value = editor
}

onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

// 封面上传相关
const beforeCoverUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isImage) {
        ElMessage.error('封面图片只能是图片格式!')
    }
    if (!isLt2M) {
        ElMessage.error('封面图片大小不能超过 2MB!')
    }
    return isImage && isLt2M
}

const handleCoverSuccess = (res: any) => {
    articleForm.coverUrl = res.url
}

// 图片组相关
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const beforeImageUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    const isLt5M = file.size / 1024 / 1024 < 5

    if (!isImage) {
        ElMessage.error('只能上传图片文件!')
        return false
    }
    if (!isLt5M) {
        ElMessage.error('图片大小不能超过 5MB!')
        return false
    }
    return true
}

const handleImageSuccess = (response: any, uploadFile: any) => {
    const newImage = {
        url: response.url || uploadFile.url,
        name: uploadFile.name,
        uid: uploadFile.uid
    }
    if (!articleForm.imageList) {
        articleForm.imageList = []
    }
    articleForm.imageList.push(newImage)
}

const handlePictureCardPreview = (uploadFile: any) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

// 表单提交相关
const handleSubmit = async () => {
    try {
        await formRef.value.validate()
        submitting.value = true

        const articleData = {
            title: articleForm.title,
            category: articleForm.category,
            tags: articleForm.tags,
            coverUrl: articleForm.coverUrl,
            type: articleForm.type,
            username:'xiaoshu',
            createTime: new Date().toISOString(),
            content: articleForm.type === 'text' ? articleForm.textContent : null,
            imageList: articleForm.type === 'images' ? articleForm.imageList : null
        }

        console.log('文章数据：', articleData)
        const results = await axios.post('http://localhost:3000/add/articles', articleData)
        // await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('文章发布结果：', results);
        
        ElMessage.success('文章发布成功！')

    } catch (error) {
        console.error('表单验证失败：', error)
        ElMessage.error('表单验证失败，请检查必填项')
    } finally {
        submitting.value = false
    }
}

const handleDraft = async () => {
    const draftData = {
        title: articleForm.title,
        category: articleForm.category,
        tags: articleForm.tags,
        coverUrl: articleForm.coverUrl,
        type: articleForm.type,
        textContent: articleForm.textContent,
        imageList: articleForm.imageList,
        saveTime: new Date().toISOString(),
        isDraft: true
    }

    console.log('草稿数据：', draftData)
    ElMessage.success('草稿保存成功！')
}

const handlePreview = () => {
    previewVisible.value = true
}

const handlePreviewClose = () => {
    previewVisible.value = false
}

const mockUploadAction = (file: File) => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve({
                url: reader.result
            })
        }
    })
}
</script>

<style scoped lang="scss">
.article-operation {
    padding: 20px;

    .page-header {
        margin-bottom: 20px;
    }

    .cover-uploader {
        :deep(.el-upload) {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration);

            &:hover {
                border-color: var(--el-color-primary);
            }
        }
    }

    .cover-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
        line-height: 178px;
    }

    .cover {
        width: 178px;
        height: 178px;
        display: block;
    }
}

.preview-content {
    padding: 20px;
    max-height: 70vh;
    overflow-y: auto;
}

:deep(.w-e-text-container) {
    background-color: #fff;
}

.image-descriptions {
    margin-top: 20px;

    .image-desc-item {
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 4px;
    }
}

:deep(.el-upload--picture-card) {
    width: 150px;
    height: 150px;
    line-height: 150px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 150px;
    height: 150px;
}
</style>