<template>
    <div class="lockscreen">
        <div class="lock-time" v-if="showUnlock">
            <div class="lock-time-header">
                <el-icon class="icon-lock" style="color:#323639" @click="unlock">
                    <Lock />
                </el-icon>
                <span @click="unlock">点击解锁</span>
            </div>
            <div class="time-block" v-if="isFlag">
                <div class="time-text time-left">
                    <div>{{ when }}</div>
                    <div class="time_period">{{ timePeriod }}</div>
                </div>
                <div class="time-text time-right">
                    <div>{{ points }}</div>
                </div>

            </div>
        </div>
        <div class="unlock" v-else>
            <div class="unlock_bg">
                <div class="unlock_img">
                    <img src="@/assets/images/avatar1.jpg" alt="">
                </div>
                <div class="unlock_ipt">
                    <el-input v-model="unlockPassword" style="max-width: 600px" placeholder="请输入解锁密码"
                        class="input-with-select">
                    </el-input>
                </div>
                <div class="unlock-btn">
                    <div>
                        <el-button class="w300 " type="primary" @click="handleUnlock">进入系统</el-button>
                    </div>
                    <div>
                        <el-button class="w300 p16" @click="logout">返回登录</el-button>
                    </div>
                    <div>
                        <el-button class="w300 " @click="showUnlock = true;">返回</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="time-fooder">
            {{ currentDate }}
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';
import { ref, onMounted, onUnmounted } from 'vue';
import { getCurrentDate } from '@/utils/time'
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter();
let $route = useRoute();
let when = ref(""); //时
let points = ref('');//分
let timePeriod = ref(''); //上午下午
let currentDate = ref(''); //日期
let interval: any = null;
let isFlag = ref(false);


let unlockPassword = ref('');
let showUnlock = ref(true);

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
    showUnlock.value = false;
}

//退出登录
const logout = () => {
    Cookies.remove('lockStatus');
    Cookies.remove('lastLockscreen');
    $router.push({ path: '/', query: { redirect: '/home' } })
    ElMessage({
        type: 'success',
        message: 'Delete completed',
    })
}

const handleUnlock = () => {
    if (unlockPassword.value === $route.query.unlockPassword) {
        Cookies.set("lockStatus", "0");
        $router.push({ path: Cookies.get('lastLockscreen') })// 解锁之后跳转到锁屏之前的页面
    } else {
        showUnlock.value = false;
        setTimeout(() => {
            showUnlock.value = true;
            unlockPassword.value = '';
            ElMessage({
                message: '密码输入错误、请重新输入',
                type: 'error',
                plain: true,
            })
        }, 300);
    }
}
// 组件挂载后启动定时器
onMounted(() => {
    updateTime();
    currentDate.value = getCurrentDate('yyyy-MM-dd', true) ?? '';
    interval = setInterval(updateTime, 1000); // 每秒更新一次时间
    // 清理定时器，防止内存泄漏
    isFlag.value = true;
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

    .unlock {
        overflow: hidden;
        height: 100vh;
        background-image: url('/src/assets//images/lock.jpg');
        background-repeat: no-repeat;
        background-size: cover;

        .unlock_bg {
            animation: enter-x-animation .3s ease-in-out .2s forwards;
            opacity: 0;
            transform: translate(50px);
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 450px;
            left: 50%;
            top: 50%;
            margin-left: -250px;
            margin-top: -250px;
            transform-origin: center center;
            z-index: 10;
            border-radius: 20px;
            background-color: hsla(0, 0%, 100%, .5);
            padding: 40px 20px;

            .unlock_img {
                width: 100px;
                height: 100px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .unlock_icon {
                font-size: 50px;
                text-align: center;
                margin: 20px 0 10px;
            }

            .unlock_text {
                font-size: 20px;
                text-align: center;
            }

            .unlock_ipt {
                margin: 20px 50px 0;
                width: 18.75rem;
                padding-bottom: 1.5rem;
            }

            .unlock-btn {
                display: flex;
                flex-direction: column;

                .p16 {
                    margin: 1rem 0;
                }

                .w300 {
                    width: 18.75rem;
                }
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

@keyframes enter-x-animation {
    100% {
        opacity: 1;
        transform: translate(0);
    }
}
</style>