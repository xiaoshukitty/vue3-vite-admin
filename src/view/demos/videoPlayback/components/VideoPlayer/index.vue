<template>
    <div class="video-player">
        <video ref="videoPlayer" :src="videoSrc" @timeupdate="updateProgress" @ended="onVideoEnded" :loop="loop"
            @click="togglePlay" class="video-element" :style="{ height: !isPictureInPicture ? '100%' : '' }">
        </video>
        <div class="controls">
            <div class="btn-left">
                <!-- 开关 -->
                <button class="play-btn" @click="togglePlay">
                    <SvgIcon class="play-btn-icon" :name="isPlaying ? 'play-pause' : 'play-back'" :width="iconWidth"
                        :height="iconHeight">
                    </SvgIcon>
                </button>
                <!-- 播放时间 -->
                <span class="player-time">
                    <span class="player-ptime">{{ getFormatTime(currentTime) }} </span>/
                    <span class="player-dtime">{{ getFormatTime(duration) }}</span>
                </span>

            </div>
            <div class="btn-right">
                <!-- 声音 -->
                <div style="position: relative;">
                    <button class="play-btn" @click="adjustVolume">
                        <SvgIcon class="play-btn-icon" :name="isAudioIcon ? 'sound-off' : 'audio'" :width="iconWidth"
                            :height="iconHeight">
                        </SvgIcon>
                    </button>
                    <div :class="['audio-box', isAudio ? 'active-audio' : '']">
                        <el-slider v-model="volume" vertical height="100px" @input="selectAdjustVolume" />
                    </div>
                </div>
                <!-- 设置 -->
                <div class="">
                    <button class="play-btn">
                        <SvgIcon @click="settingBtn" class="play-btn-icon" name="setting" :width="iconWidth"
                            :height="iconHeight">
                        </SvgIcon>
                    </button>
                    <div :class="['setting-box', isSetting ? 'active-setting' : '', isSpeed ? 'active-speed-box' : '']">
                        <div :class="['setting-panel', isSpeed ? ' active-speed' : '']">
                            <div class="setting-item" @click="selectSpeed">
                                <span>速度</span>
                                <div class="setting-toggle">
                                    <el-icon style="color: #fff;">
                                        <ArrowRight />
                                    </el-icon>
                                </div>
                            </div>
                            <div class="setting-item">
                                <span>洗脑循环</span>
                                <div class="setting-toggle">
                                    <el-switch v-model="loop" />
                                </div>
                            </div>
                        </div>
                        <div class="setting-speed" :style="{ display: isSpeed ? 'block' : 'none' }">
                            <div class="setting-speed-item" v-for="(item, index) in speeds" :key="index"
                                @click="adjustPlaybackRate(item)">
                                <span>{{ item }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 画中画控制 -->
                <div>
                    <button @click="togglePictureInPicture" class="play-btn">
                        <SvgIcon class="play-btn-icon" name="picture-in-picture" :width="iconWidth"
                            :height="iconHeight">
                        </SvgIcon>
                    </button>
                </div>
                <!-- 全屏控制 -->
                <div>
                    <button @click="toggleFullscreen" class="play-btn">
                        <SvgIcon class="play-btn-icon" name="full-screen" :width="iconWidth" :height="iconHeight">
                        </SvgIcon>
                    </button>
                </div>
            </div>
            <!-- 进度条 -->
            <div class="progress-box">
                <div class="progress-container" @click="seekVideo" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
                    <div class="progress-bar" :style="{ width: progressWidth }"></div>
                    <div v-if="isHovering" class="progress-thumb" :style="{ left: thumbLeft }">{{ formattedHoverTime }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch, defineProps, computed } from 'vue';
import { getFormatTime } from '@/utils/time'

const props = defineProps({
    videoSrc: {
        type: String,
        required: true
    }
});

const videoPlayer = ref<HTMLVideoElement | null>(null); // 视频播放器元素
const isPlaying = ref(false);// 播放状态
const currentTime = ref(0); // 视频当前播放时间
const duration = ref(0); // 视频总时长
const volume = ref(100); // 音量控制，初始为 1 (100%)
const playbackRate = ref(1); // 播放速度，默认 1x
const speeds = [0.5, 0.75, '正常', 1.25, 1.5, 2]; // 可供选择的播放速度
const loop = ref(false); // 是否循环播放，初始为 false
const isFullscreen = ref(false); // 全屏状态
const isPictureInPicture = ref(false); // 画中画状态
const isAudio = ref(false); // 声音状态
const isHovering = ref(false); // 鼠标悬停状态
const hoverTime = ref(0); // 鼠标悬停时的时间
const iconWidth = ref('1.25rem'); //  图标宽度
const iconHeight = ref('1.25rem'); // 图标高度
const isSetting = ref(false); // 设置状态
const isSpeed = ref(false); // 速度状态
const isAudioIcon = ref(false); // 音量图标状态


const progressWidth = computed(() => (duration.value > 0 ? (currentTime.value / duration.value) * 100 + '%' : '0%')); // 计算进度条的宽度
const thumbLeft = computed(() => (isHovering.value ? `${(hoverTime.value / duration.value) * 100}%` : '0')); // 计算鼠标悬停时进度条滑块的位置
const formattedHoverTime = computed(() => getFormatTime(hoverTime.value));//显示鼠标悬停时的时间。

// 在视频加载完成时获取视频时长
onMounted(() => {
    if (videoPlayer.value) {
        videoPlayer.value.onloadedmetadata = () => {
            duration.value = videoPlayer.value?.duration || 0;
        };
        // 设置默认音量
        videoPlayer.value.volume = Math.round(volume.value / 100)
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

//设置
const settingBtn = () => {
    if (videoPlayer.value) {
        isSetting.value = !isSetting.value;
        isSpeed.value = false;
        isAudio.value = false;
    }
}

// 选择播放速度
const selectSpeed = () => {
    if (videoPlayer.value) {
        isSetting.value = true;
        isSpeed.value = !isSpeed.value;
    }
}

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
const seekVideo = (event: MouseEvent) => {
    if (!videoPlayer.value) return;
    const progressContainer = event.currentTarget as HTMLElement; // 获取进度条容器元素
    const rect = progressContainer.getBoundingClientRect();// 获取进度条容器的位置信息
    const offsetX = event.clientX - rect.left;// 计算鼠标在进度条容器中的水平位置
    const percentage = Math.min(Math.max(offsetX / progressContainer.clientWidth, 0), 1);// 计算鼠标在进度条容器中的百分比位置
    currentTime.value = percentage * duration.value;
    videoPlayer.value.currentTime = currentTime.value;
};

const onMouseLeave = () => {
    isHovering.value = false;
};


// 鼠标移动事件处理
const onMouseMove = (event: MouseEvent) => {
    if (!videoPlayer.value) return;
    const progressContainer = event.currentTarget as HTMLElement; // 获取进度条容器元素
    const rect = progressContainer.getBoundingClientRect(); // 获取进度条容器的位置信息
    const offsetX = event.clientX - rect.left; // 计算鼠标在进度条容器中的水平位置
    const percentage = Math.min(Math.max(offsetX / progressContainer.clientWidth, 0), 1); // 计算鼠标在进度条容器中的百分比位置
    hoverTime.value = percentage * duration.value;
    isHovering.value = true;
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
        isAudio.value = !isAudio.value;
        if (isSetting.value) {
            isSetting.value = false;
        }
        isSpeed.value = false;
    }
};
//调整音量
const selectAdjustVolume = () => {
    if (videoPlayer.value) {
        videoPlayer.value.volume = Math.round(volume.value / 100);
        if (volume.value == 0) {
            isAudioIcon.value = true;
        } else {
            isAudioIcon.value = false;
        }
    }
}

// 调整播放速度
const adjustPlaybackRate = <T extends string | number>(item: T) => {
    if (videoPlayer.value) {
        if (item == '正常') {
            videoPlayer.value.playbackRate = 1;
        } else {
            videoPlayer.value.playbackRate = item as number;
        }

        isSpeed.value = false;
        isSetting.value = false;
    }
};


// 切换画中画模式
const togglePictureInPicture = async () => {
    if (!videoPlayer.value) return;

    try {
        if (!isPictureInPicture.value) {
            await videoPlayer.value.requestPictureInPicture();
        } else {
            await document.exitPictureInPicture();
        }
    } catch (error) {
        console.error('Failed to toggle Picture-in-Picture:', error);
    }
};

// 更新画中画状态
const updatePictureInPictureState = () => {
    isPictureInPicture.value = document.pictureInPictureElement !== null;
};

// 监听画中画状态变化
document.addEventListener('enterpictureinpicture', updatePictureInPictureState);
document.addEventListener('leavepictureinpicture', updatePictureInPictureState);

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


</script>

<style scoped lang="scss">
.video-player {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    /* max-width: 640px; */
    margin: auto;
    height: calc(100vh - 15rem);

    .video-element {
        width: 100%;
        /* max-width: 640px; */
        border: .0625rem solid #ddd;
        margin-bottom: .0625rem;
        height: calc(100vh - 15rem);
        position: relative;
        background: #000;
        font-size: 0;
    }

    .controls {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2.5625rem;
        padding: 0 1.25rem;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: .625rem;

        .play-btn {
            position: relative;
            width: 2.5rem;
            height: 100%;
            border: none;
            background-color: transparent;
            outline: none;
            cursor: pointer;
            vertical-align: middle;
            box-sizing: border-box;
            display: inline-block;
            padding: 7px;

            .play-btn-icon {
                position: absolute;
                left: .625rem;
                /* Adjust the position as needed */
                top: 50%;
                /* Center the icon vertically */
                transform: translateY(-50%);
                /* Compensate for centering */
            }
        }

        .btn-left {
            height: 2.375rem;
            position: absolute;
            bottom: 0;

            .player-time {
                line-height: 2.375rem;
                color: #eee;
                text-shadow: 0 0 .125rem rgba(0, 0, 0, 0.5);
                vertical-align: middle;
                font-size: .8125rem;
                cursor: default;
            }
        }

        .btn-right {
            display: flex;
            align-items: center;
            height: 2.375rem;
            position: absolute;
            bottom: 0;
            right: 1.25rem;

            .active-setting {
                transform: scale(1) !important;

                .active-speed {
                    display: none !important;
                }
            }

            .active-speed-box {
                width: 4.375rem !important;
                text-align: center !important;
                transform: scale(1) !important;
            }

            .active-audio {
                transform: scale(1) !important;
            }

            .audio-box {
                position: absolute;
                right: 0;
                bottom: 2.375rem;
                transform: scale(0);
                width: 2.375rem;
                border-radius: .125rem;
                background: rgba(28, 28, 28, 0.9);
                padding: 1rem 0;
                transition: all 0.3s ease-in-out;
                overflow: hidden;
                z-index: 2;
            }

            .setting-box {
                position: absolute;
                right: 0;
                bottom: 3.125rem;
                transform: scale(0);
                width: 9.375rem;
                border-radius: .125rem;
                background: rgba(28, 28, 28, 0.9);
                padding: .4375rem 0;
                transition: all 0.3s ease-in-out;
                overflow: hidden;
                z-index: 2;

                .setting-panel {
                    .setting-item {
                        height: 1.875rem;
                        padding: .3125rem .625rem;
                        box-sizing: border-box;
                        cursor: pointer;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        span {
                            color: #eee;
                            font-size: .8125rem;
                            display: inline-block;
                            vertical-align: middle;
                            white-space: nowrap;
                        }

                        .setting-toggle {}

                        &:hover {
                            background-color: rgba(255, 255, 255, 0.1);
                        }
                    }

                }

                .setting-speed {
                    display: none;

                    .setting-speed-item {
                        height: 1.875rem;
                        padding: .3125rem .625rem;
                        box-sizing: border-box;
                        cursor: pointer;
                        position: relative;

                        span {
                            color: #eee;
                            font-size: .8125rem;
                            display: inline-block;
                            vertical-align: middle;
                            white-space: nowrap;
                        }

                        &:hover {
                            background-color: rgba(255, 255, 255, 0.1);
                        }
                    }
                }
            }
        }

        .progress-box {
            padding: .3125rem 0;
            cursor: pointer;
            position: absolute;
            bottom: 2.0625rem;
            width: calc(100% - 2.5rem);
            height: .1875rem;

            .progress-container {
                position: relative;
                width: 100%;
                height: .1875rem;
                background: rgba(255, 255, 255, 0.2);
                border-radius: .25rem;
                cursor: pointer;

                .progress-bar {
                    height: 100%;
                    background-color: #007bff;
                    border-radius: .25rem;
                }

                .progress-thumb {
                    position: absolute;
                    bottom: .75rem;
                    background-color: rgba(0, 0, 0, 0.62);
                    border-radius: .25rem;
                    padding: .3125rem .4375rem;
                    white-space: nowrap;
                    transform: translateX(-50%);
                    pointer-events: none;
                    color: #fff;
                    font-size: .75rem;
                    text-align: center;
                    opacity: 1;
                    transition: opacity 0.1s ease-in-out;
                    word-wrap: normal;
                    word-break: normal;
                    z-index: 2;
                }

            }
        }
    }
}

input[type="range"] {
    width: 100%;
}
</style>