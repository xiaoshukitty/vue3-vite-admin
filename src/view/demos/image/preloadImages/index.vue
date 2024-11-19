<template>
    <div :class="['preloadImages', layOutThemeStore.theme === 'dark' ? 'preloadImages-theme' : '']">
        <div class="img-list">
            <div class="img-item" v-for="(imgSrc, index) in images" :key="index">
                <el-image :src="imgSrc" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="images"
                    :initial-index="index" fit="cover" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '@/store/modules/theme';

const layOutThemeStore = useThemeStore();
// 使用 Vite 的 import.meta.glob 动态加载 public/images 下的图片
const images = ref<string[]>([]);


onMounted(() => {
    const imagesContext = import.meta.glob('/public/images/*.{jpeg,jpg,png,gif,webp}', { eager: true });
    // 提取路径
    images.value = Object.keys(imagesContext);
})

</script>
<style scoped lang="scss">
.preloadImages {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;

    .img-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
        position: relative;

        .img-item {
            border-radius: 5px;
            cursor: move;
            color: white;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            // aspect-ratio: 1; /* 保持图片的宽高比 */
            transition: all 0.3s ease;
            /* 平滑过渡效果 */
            // z-index: 1;

            /* 确保拖动项的层级高于其他项 */
            img {
                width: 100%;
            }
        }
    }

    &-theme {
        background-color: var(--background-theme-color) !important;
        border: 0.0625rem solid var(--border-theme-color) !important;
    }
}
</style>