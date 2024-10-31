<template>
    <div class="videoPlayback">
        <h1>视频播放</h1>
        <VideoPlayer :videoSrc="videoSrc" />
    </div>
</template>

<script setup lang='ts'>
import VideoPlayer from './components/VideoPlayer/index.vue'
import videoSrc from '@/assets/video/dance.mp4'
</script>
<style scoped></style>