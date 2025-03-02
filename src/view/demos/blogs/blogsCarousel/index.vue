<template>
    <div :class="['blogs-carousel', layOutThemeStore.theme === 'dark' ? 'blogs-carousel-theme' : '']">
        <h3>轮播图</h3>
        <div class="image-list" v-if="images.length">
            <el-image v-for="(url, index) in images" :key="index" :src="url?.url"
                :preview-src-list="images.map(img => img.url)" :initial-index="index" fit="cover" class="image-item" />
        </div>
        <UpdateImage v-model:images="images" :maxCount="5" :maxSize="5" @update:images="updateImages" />
    </div>
</template>

<script setup lang='ts'>
import axios from "axios";
import { onMounted, ref } from 'vue';
import UpdateImage from '@/components/UpdateImage/index.vue'
import { useThemeStore } from '@/store/modules/theme';

interface ImageItem {
    url: string;
}
const images = ref<ImageItem[]>([]);
const layOutThemeStore = useThemeStore();

// 更新图片
const updateImages = (newImages: ImageItem[]) => {
    images.value = newImages;
    getCarouselImages();
}

// 获取轮播图
const getCarouselImages = async () => {
    try {
        const res = await axios.get('http://localhost:3000/carousel-images');
        images.value = res.data.images.map((item: any) => ({
            url: `data:${item.mime_type};base64,${item.url}`
        }));
    } catch (error) {
        console.log('error', error);
    }
}

onMounted(() => {
    getCarouselImages();
})
</script>
<style scoped lang="scss">
.blogs-carousel {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    .image-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 1rem 0;

        .image-item {
            width: 200px;
            height: 200px;
            border-radius: 4px;
            cursor: pointer;
        }
    }

    &-theme {
        background-color: var(--background-theme-color) !important;
        border: .0625rem solid var(--border-theme-color) !important;
    }
}
</style>