<template>
    <div :class="['videoPlayback', layOutThemeStore.theme === 'dark' ? 'video-theme' : '']">
        <VideoPlayer :videoSrc="videoSrc" />
        <div class="video-btn">
            <div>
                <el-button type="primary" @click="videoDownload()">下载</el-button>
            </div>
            <div class="mt-30">
                <el-button type="primary">随机视频</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import VideoPlayer from './components/VideoPlayer/index.vue'
import videoSrc from '@/assets/video/dance.mp4'
import { useThemeStore } from '@/store/modules/theme'
import { getVideoArrayBuffer } from '@/utils/download'

const layOutThemeStore = useThemeStore();

// 下载视频
const videoDownload = () => {
    getVideoArrayBuffer(videoSrc, 'downloadTest')
}
</script>
<style scoped lang="scss">
.videoPlayback {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;
    display: flex;

    .video-btn {
        width: 25%;
        display: flex;
        flex-direction: column;
        padding: 1.875rem;
        margin-left: 1.875rem;
    }
}

.video-theme {
    background-color: var(--background-theme-color) !important;
    border: .0625rem solid var(--border-theme-color) !important;
}
</style>