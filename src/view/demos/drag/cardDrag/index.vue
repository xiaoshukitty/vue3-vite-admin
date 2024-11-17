<template>
    <div :class="['cardDrag', layOutThemeStore.theme === 'dark' ? 'cardDrag-theme' : '']">
        <div class="drag-list">
            <div class="drag-item" v-for="(item, index) in drags" :key="item.id" :draggable="true"
                @dragstart="onDragStart($event, index)" @dragover="onDragOver($event)" @drop="onDrop($event, index)"
                @dragenter="onDragEnter($event, index)" @dragleave="onDragLeave($event)" @dragend="onDragEnd($event)"
                :style="{ backgroundColor: item.bgColor }"
                >
                <span>按住拖拽{{ item.id }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { useThemeStore } from '@/store/modules/theme';

// 获取主题数据
const layOutThemeStore = useThemeStore();

// 创建 draggable 数组，并为每个项添加一个唯一的背景颜色
const drags = reactive(Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    bgColor: getRandomColor()  // 为每个拖拽项生成一个随机背景色
})));

// 用于存储当前拖拽的项索引
const draggingIndex = ref<number | null>(null);

// 拖拽开始事件
const onDragStart = (event: DragEvent, index: number) => {
    draggingIndex.value = index;  // 记录当前拖动项的索引
    event.dataTransfer?.setData('text/plain', index.toString());  // 将索引存入数据传输对象
    event.target?.classList.add('dragging');  // 为当前拖动项添加样式
};

// 拖拽过程中的 hover 事件
const onDragOver = (event: DragEvent) => {
    event.preventDefault();  // 必须调用 preventDefault，否则 drop 事件不会触发
};

// 拖拽进入目标项时的样式更新
const onDragEnter = (event: DragEvent, index: number) => {
    event.preventDefault();  // 阻止默认行为
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('drag-item')) {
        target.classList.add('drag-over');
    }
};

// 拖拽离开目标项时移除样式
const onDragLeave = (event: DragEvent) => {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('drag-item')) {
        target.classList.remove('drag-over');
    }
};

// 拖拽结束时移除样式
const onDragEnd = (event: DragEvent) => {
    const target = event.target as HTMLElement;
    target?.classList.remove('dragging');  // 移除拖动样式
    const allItems = document.querySelectorAll('.drag-item');
    allItems.forEach((item) => item.classList.remove('drag-over'));  // 清除所有拖拽项的 hover 样式
};

// 拖拽完成后的排序更新
const onDrop = (event: DragEvent, index: number) => {
    event.preventDefault();
    if (draggingIndex.value !== null && draggingIndex.value !== index) {
        // 获取当前拖拽项的索引
        const draggedItem = drags[draggingIndex.value];  // 拖拽的项
        // 从原位置移除并插入到新位置
        drags.splice(draggingIndex.value, 1);
        drags.splice(index, 0, draggedItem);
    }
    draggingIndex.value = null;  // 重置拖拽项的索引
};

// 随机生成颜色
function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
</script>

<style scoped lang="scss">
.cardDrag {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;

    .drag-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 20px;
        position: relative;

        .drag-item {
            border-radius: 5px;
            cursor: move;
            color: white;
            text-align: center;
            line-height: 150px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            aspect-ratio: 1;
            transition: all 0.3s ease;
            /* 平滑过渡效果 */
            z-index: 1;
            /* 确保拖动项的层级高于其他项 */

            &.dragging {
                opacity: 0.5;
                /* 拖动过程中项的透明度 */
                transform: scale(1.1);
                /* 放大拖动的元素，增加视觉效果 */
            }

            &.drag-over {
                border: 2px dashed #000;
                background-color: rgba(0, 0, 0, 0.1);
                /* 提示用户可放置的区域 */
            }

            span {
                font-size: 1rem;
                font-weight: 600;
            }
        }
    }
}

.cardDrag-theme {
    background-color: var(--background-theme-color) !important;
    border: 0.0625rem solid var(--border-theme-color) !important;
}
</style>