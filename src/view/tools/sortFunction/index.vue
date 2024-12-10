<template>
    <div :class="['sortFunction', layOutThemeStore.theme === 'dark' ? 'sortFunction-theme' : '']">
        <el-row :gutter="20">
            <el-col :span="20">
                <div>
                    <el-scrollbar class="scrollbar-demo">
                        <!-- <p v-for="item in 30" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
                        <div class="grid">
                            <div>1</div>
                        </div>
                        <div class="grid">
                            <div>2</div>
                            <div>3</div>
                        </div>
                        <div class="grid">
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
                        </div>
                    </el-scrollbar>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="btn">
                    <div>
                        <el-button type="primary" @click="isdialogVisible = true">添加</el-button>
                    </div>
                    <div>
                        <el-button type="primary">下载</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>

        <SortDialog :isdialogVisible="isdialogVisible" @update:isdialogVisible="updateDialogVisible" />
    </div>
</template>

<script setup lang='ts'>
import { useThemeStore } from '@/store/modules/theme';
import SortDialog from '../components/SortDialog/index.vue'
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus'
// 主题切换
const layOutThemeStore = useThemeStore();

//弹窗
const isdialogVisible = ref(true);


const list1 = ref([
    {
        name: 'Joao',
        id: '1'
    },
    {
        name: 'Jean',
        id: '2'
    },
    {
        name: 'Johanna',
        id: '3'
    },
    {
        name: 'Juan',
        id: '4'
    }
])
const list2 = ref(
    list1.value.map(item => ({
        name: `${item.name}-2`,
        id: `${item.id}-2`
    }))
)

//关闭弹窗
const updateDialogVisible = (val: boolean) => {
    isdialogVisible.value = val
}

</script>
<style scoped lang="scss">
.sortFunction {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    padding: 1rem;
    height: 100%;
    overflow: hidden;

    .scrollbar-demo {
        height: calc(100vh - 14.375rem);
        border: 0.0625rem solid var(--border-color);

        .scrollbar-demo-item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            margin: 10px;
            text-align: center;
            border-radius: 4px;
            background: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
        }

        .grid {
            margin-top: 10px;
            display: grid;
            grid-template-columns: repeat(auto-fill, 100px);
            grid-template-rows: repeat(auto-fill, 100px);
            gap: 10px;
            /* 子元素之间的间距 */
            justify-content: center;
            /* 水平居中 */
            align-content: center;
            cursor: pointer;

            /* 垂直居中 */
            div {
                width: 100px;
                height: 100px;
                background-color: lightblue;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #ddd;
            }
        }

        .grid-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .drag-ghost {
            opacity: 0.5;
        }

        .drag-chosen {
            border: 2px solid blue;
        }
    }

    .btn {
        display: flex;
        flex-direction: column;
        align-items: center;

        div {
            margin-bottom: 1.25rem;
        }
    }


    &-theme {
        background-color: var(--background-theme-color) !important;
        border: 0.0625rem solid var(--border-theme-color) !important;
    }
}
</style>