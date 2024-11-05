<template>
    <div class="videoPlayback">
        <VideoPlayer :videoSrc="videoSrc" />
    </div>
</template>

<script setup lang='ts'>
import VideoPlayer from './components/VideoPlayer/index.vue'
import videoSrc from '@/assets/video/dance.mp4'
</script>
<style scoped></style>