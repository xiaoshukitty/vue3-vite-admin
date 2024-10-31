<template>
    <div class="video-player">
        <video ref="videoPlayer" :src="videoSrc" @timeupdate="updateProgress" @ended="onVideoEnded" :loop="loop"
            class="video-element">
        </video>
        <div class="controls">
            <button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</button>
            <input type="range" min="0" :max="duration" v-model="currentTime" @input="seekVideo" />
            <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
            <input type="range" min="0" max="1" step="0.1" v-model="volume" @input="adjustVolume" />
            <span>🔊 {{ Math.round(volume * 100) }}%</span>
            <!-- 播放速度控制 -->
            <select v-model="playbackRate" @change="adjustPlaybackRate">
                <option v-for="speed in speeds" :key="speed" :value="speed">
                    {{ speed }}x
                </option>
            </select>
            <!-- 循环播放控制 -->
            <button @click="toggleLoop">{{ loop ? '不循环 On' : '循环 Off' }}</button>
            <!-- 全屏控制 -->
            <button @click="toggleFullscreen">{{ isFullscreen ? '取消全屏' : '全屏' }}</button>
            <!-- 画中画控制 -->
            <button @click="togglePictureInPicture">{{ isPictureInPicture ? '退出画中画' : '开启画中画'
                }}</button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch, defineProps } from 'vue';


const props = defineProps({
    videoSrc: {
        type: String,
        required: true
    }
});

const videoPlayer = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1); // 音量控制，初始为 1 (100%)
const playbackRate = ref(1); // 播放速度，默认 1x
const speeds = [0.5, 1, 1.5, 2]; // 可供选择的播放速度
const loop = ref(false); // 是否循环播放，初始为 false
const isFullscreen = ref(false); // 全屏状态
const isPictureInPicture = ref(false); // 画中画状态

// 在视频加载完成时获取视频时长
onMounted(() => {
    if (videoPlayer.value) {
        videoPlayer.value.onloadedmetadata = () => {
            duration.value = videoPlayer.value?.duration || 0;
        };
        // 设置默认音量
        videoPlayer.value.volume = volume.value;
        //设置默认音量和播放速度
        videoPlayer.value.playbackRate = playbackRate.value;
    }
});

// 监听 currentTime 的变化，更新视频的当前播放时间
watch(currentTime, (newTime) => {
    if (videoPlayer.value && Math.abs(videoPlayer.value.currentTime - newTime) > 0.1) {
        videoPlayer.value.currentTime = newTime;
    }
});

// 播放或暂停视频
const togglePlay = () => {
    if (videoPlayer.value) {
        if (isPlaying.value) {
            videoPlayer.value.pause();
        } else {
            videoPlayer.value.play();
        }
        isPlaying.value = !isPlaying.value;
    }
};

// 更新当前播放时间
const updateProgress = () => {
    if (videoPlayer.value) {
        currentTime.value = videoPlayer.value.currentTime;
    }
};

// 跳转到指定时间点
const seekVideo = () => {
    if (videoPlayer.value) {
        videoPlayer.value.currentTime = currentTime.value;
    }
};

// 视频播放结束时处理
const onVideoEnded = () => {
    if (!loop.value) {  // 如果不循环播放，则重置状态
        isPlaying.value = false;
        currentTime.value = 0;
    }
};

// 调整音量
const adjustVolume = () => {
    if (videoPlayer.value) {
        videoPlayer.value.volume = volume.value;
    }
};

// 切换循环播放状态
const toggleLoop = () => {
    loop.value = !loop.value;
};
// 调整播放速度
const adjustPlaybackRate = () => {
    if (videoPlayer.value) {
        videoPlayer.value.playbackRate = playbackRate.value;
    }
};


// 切换画中画模式
const togglePictureInPicture = async () => {
    if (!videoPlayer.value) return;

    try {
        if (!isPictureInPicture.value) {
            await videoPlayer.value.requestPictureInPicture();
        } else {
            document.exitPictureInPicture();
        }
    } catch (error) {
        console.error('Failed to toggle Picture-in-Picture:', error);
    }
};

// 更新画中画状态
videoPlayer.value?.addEventListener('enterpictureinpicture', () => {
    isPictureInPicture.value = true;
});
videoPlayer.value?.addEventListener('leavepictureinpicture', () => {
    isPictureInPicture.value = false;
});


// 切换全屏状态
const toggleFullscreen = () => {
    const videoContainer = videoPlayer.value?.parentElement;
    if (!videoContainer) return;

    if (!isFullscreen.value) {
        videoContainer.requestFullscreen?.();
    } else {
        document.exitFullscreen?.();
    }
    isFullscreen.value = !isFullscreen.value;
};

// 监听全屏退出事件
document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement;
});

// 格式化时间
const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
</script>

<style scoped>
.video-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 640px;
    margin: auto;
}

.video-element {
    width: 100%;
    max-width: 640px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
}

.controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

input[type="range"] {
    width: 100%;
}
</style>