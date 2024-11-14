<template>
    <div :class="['cardDrag', layOutThemeStore.theme === 'dark' ? 'cardDrag-theme' : '']">
        <div class="drag-list">
            <div class="drag-item" v-for="item in drags" :key="item.id">
                <span>按住拖拽{{ item.id }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import { useThemeStore } from '@/store/modules/theme';

const layOutThemeStore = useThemeStore();

const drags = reactive(Array.from({ length: 32 }, (_, i) => ({ id: i + 1 })))

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
        /* 网格列 */
        gap: 20px;
        /* 网格项之间的间隔 */

        .drag-item {
            border-radius: .375rem;
            cursor: move;
            background-color: #4CAF50;
            color: white;
            text-align: center;
            line-height: 150px;
            /* 使文字居中 */
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            aspect-ratio: 1;
            /* 保持正方形 */
            transition: all 0.3s ease;
            /* 添加平滑动画 */

            span {
                font-size: 1rem;
                font-weight: 600;
                /* 修复行高问题 */
            }
        }
    }
}

.cardDrag-theme {
    background-color: var(--background-theme-color) !important;
    border: .0625rem solid var(--border-theme-color) !important;
}
</style>