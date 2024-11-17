<template>
    <el-dialog v-model="dialogVisible" title="锁定屏幕" width="500" :before-close="handleClose" @close="handleClose"
        style="border-radius: 1.25rem;">
        <div class="lock-dialog">
            <div class="lock-img">
                <img :src="setting.logo" alt="Logo" />
            </div>
            <div class="lock-name">
                小小舒
            </div>
            <div class="lock-ipt">
                <el-input type="password" :prefix-icon="Lock" v-model="lockIpt" show-password placeholder="请输入锁屏密码" />
            </div>
            <div class="lock-btn">
                <el-button type="primary" style="width: 100%;" @click="goToLockscreen">
                    确定
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import Cookies from "js-cookie";
import { ref, defineProps, defineEmits, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import setting from "@/setting";

// 定义响应式变量
const lockIpt = ref(""); // 输入的锁屏密码
const dialogVisible = ref(false); // 控制对话框是否显示

const $router = useRouter();
const $route = useRoute();

// 接收父组件传递的属性
const props = defineProps({
    isLockDialog: {
        type: Boolean,
        default: false,
    },
});

// 事件定义
const emits = defineEmits(["close"]);

// 监听锁定对话框的显示状态
watch(
    () => props.isLockDialog,
    (val: boolean) => {
        dialogVisible.value = val;
    },
    { immediate: true }
);

// 关闭对话框
const handleClose = () => {
    emits("close", false);
};

// 跳转到锁屏页面
const goToLockscreen = () => {
    if (!lockIpt.value) return; // 防止密码为空时提交

    // 保存当前路径，方便解锁后重定向
    Cookies.set("lastLockscreen", $route.fullPath);
    Cookies.set("lockStatus", "1");

    // 跳转到锁屏页面，并传递解锁密码
    $router.push({
        path: "/lockscreen",
        query: { unlockPassword: lockIpt.value },
    });
};
</script>
<style lang="scss" scoped>
.lock-dialog {
    display: flex;
    flex-direction: column;
    align-items: center;

    .lock-img {
        width: 5rem;
        height: 5rem;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }

    .lock-name {
        font-weight: 700;
        font-size: 1rem;
        margin: 1.5rem 0;
    }

    .lock-ipt {
        width: 100%;
        padding-bottom: 1.5rem;
    }

    .lock-btn {
        width: 100%;
        margin-bottom: 2.5rem;
    }
}
</style>
