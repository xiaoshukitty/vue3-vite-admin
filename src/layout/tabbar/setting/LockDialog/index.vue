<template>
    <el-dialog v-model="dialogVisible" title="锁定屏幕" width="500" :before-close="handleClose" @close="handleClose"
        style="border-radius: 1.25rem;">
        <div class="lock-dialog pr-40 pl-40">
            <div class="lock-img">
                <img src="/src/assets//images/avatar1.jpg" alt="">
            </div>
            <div class="lock-name">
                小小舒
            </div>
            <div class="lock-ipt">
                <el-input type="password" :prefix-icon="Lock" v-model="lockIpt" show-password
                    placeholder="请输入锁屏密码"></el-input>
            </div>
            <div class="lock-btn">
                <el-button type="primary" style="width: 100%;" @click="goToLockscreen">确定</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang='ts'>
import Cookies from 'js-cookie';
import { ref, defineProps, watch, defineEmits, } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let lockIpt = ref('');
let dialogVisible = ref(false);
let $router = useRouter();
const $route = useRoute();


const props = defineProps({
    isLockDialog: {
        type: Boolean,
        default: false
    }
})



const emits = defineEmits(['close'])

watch(() => props.isLockDialog, (val: boolean) => {
    dialogVisible.value = val;
}, { immediate: true });


const handleClose = () => {
    emits('close', false)
};

const goToLockscreen = () => {
    if (lockIpt.value === '') return;
    Cookies.set("lastLockscreen", $route.fullPath); // 本地存储锁屏之前打开的页面以便解锁后打开
    $router.push(
        { path: '/lockscreen', query: { unlockPassword: lockIpt.value } }
    );
    Cookies.set("lockStatus", "1");
}
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
        margin-bottom: 1.5rem;
        margin-top: 1.5rem;
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