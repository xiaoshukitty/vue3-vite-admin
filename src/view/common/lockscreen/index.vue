<template>
    <div class="lockscreen">
        <div class="lock-time">
            <div class="lock-time-header">
                <el-icon class="icon-lock" style="color:#323639" @click="unlock">
                    <Lock />
                </el-icon>
                <span @click="unlock">点击解锁</span>
            </div>
            <div class="time-block">
                <div class="time-text time-left">
                    <div>{{ when }}</div>
                    <div class="time_period">{{ timePeriod }}</div>
                </div>
                <div class="time-text time-right">
                    <div>{{ points }}</div>
                </div>

            </div>
        </div>
        <div class="unlock"></div>
        <div class="time-fooder">
            {{ currentDate }}
        </div>
    </div>
</template>

<script setup lang='ts'>
import Cookies from 'js-cookie';
import { ref, onMounted, onUnmounted } from 'vue';
import { getCurrentDate } from '@/utils/time'
import { useRouter } from 'vue-router';

let $router = useRouter();
let when = ref(""); //时
let points = ref('');//分
let timePeriod = ref(''); //上午下午
let currentDate = ref(''); //日期
let interval: any = null;
// 更新当前时间
const updateTime = () => {
    const now = new Date();
    points.value = now.toLocaleTimeString().split(':')[1];
    when.value = now.toLocaleTimeString().split(':')[0]
    if (now.getHours() < 12) {
        timePeriod.value = 'AM'
    } else {
        timePeriod.value = 'PM'
    }
};
//解锁
const unlock = () => {
    Cookies.set("lockStatus", "0");
    $router.push({ path: Cookies.get('lastLockscreen') })// 解锁之后跳转到锁屏之前的页面
}
// 组件挂载后启动定时器
onMounted(() => {
    updateTime();
    currentDate.value = getCurrentDate('yyyy-MM-dd', true);
    interval = setInterval(updateTime, 1000); // 每秒更新一次时间
    // 清理定时器，防止内存泄漏
});
onUnmounted(() => {
    clearInterval(interval);
});
</script>
<style lang="scss" scoped>
.lockscreen {
    height: 100vh;
    overflow: hidden;

    .lock-time {
        height: 100vh;
        overflow: hidden;

        .lock-time-header {
            font-size: 1.25rem;
            line-height: 1.75rem;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 1rem;
            margin-top: 1rem;

        }

        .lock-time-header:hover .icon-lock {
            transform: scale(1.2);
        }

        .time-block {

            height: 100%;
            display: flex;
            justify-content: space-between;
            padding-left: 10%;
            padding-right: 10%;

            .time-text {
                position: relative;
                background-color: #f4f4f5;
                font-size: 16.25rem;
                text-align: center;
                border-radius: 1.5rem;
                // flex: 1 1 auto;
                width: 46%;
                height: 80%;
                display: flex;
                justify-content: center;
                align-items: center;

                .time_period {
                    position: absolute;
                    top: 1.25rem;
                    left: 1.25rem;
                    font-size: 1rem;
                    font-weight: 700;
                }
            }

            .time-left {
                animation: AnimationLeft 1s ease-in-out;
                animation-fill-mode: forwards;
                animation-delay: .1s;
            }

            .time-right {
                animation: AnimationRight 1s ease-in-out;
                animation-fill-mode: forwards;
                animation-delay: .1s;
            }

        }
    }

    .time-fooder {
        position: absolute;
        bottom: 1.25rem;
        width: 100%;
        animation: enter-y-animation 1s ease-in-out .1s forwards;
        opacity: 0;
        transform: translateY(3.125rem);
        font-size: 1.875rem;
        line-height: 2.25rem;
        text-align: center;
    }
}

@keyframes enter-y-animation {
    0% {
        opacity: 0;
        transform: translateY(3.125rem);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes AnimationLeft {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes AnimationRight {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>