<template>
    <div class="p-13-8" @click="updateRefsh">
        <el-button size="small" icon="Refresh" circle />
    </div>
    <div class="p-13-8" @click="fullScreen">
        <el-button size="small" icon="FullScreen" circle />
    </div>
    <div class="p-13-8">
        <I18n></I18n>
    </div>
    <div class="p-13-8" @click="openSetting">
        <el-button size="small" icon="Setting" circle />
    </div>
    <div class="">
        <el-dropdown trigger="click">
            <div class="d-flex ai-center">
                <div :class="['img-hover', layOutThemeStore.theme === 'dark' ? 'img-hover-theme' : '']">
                    <img :src="setting.logo" alt="">
                    <span></span>
                </div>
            </div>
            <template #dropdown>
                <div class="user-info ">
                    <div
                        :class="['user-top', 'd-flex', 'ai-center', 'b-bottom', layOutThemeStore.theme === 'dark' ? 'tabbar-theme' : '']">
                        <div class="user-img">
                            <img :src="setting.logo" alt="">
                            <span></span>
                        </div>
                        <div
                            :class="['user-name', 'd-flex', 'j-center', 'f-cloumn', 'ml-10', layOutThemeStore.theme === 'dark' ? 'tabbar-theme' : '']">
                            <div class="fw-500">Xiaoshu</div>
                            <div style="color: #71717a;font-size: .75rem;line-height: 1rem;">https:xiaoshukitty</div>
                        </div>
                    </div>
                    <div :class="['user-bottom', 'b-bottom', layOutThemeStore.theme === 'dark' ? 'tabbar-theme' : '']">
                        <div
                            :class="['user-bottom-line ', 'd-flex ai-center', layOutThemeStore.theme === 'dark' ? 'user-hover' : '']">
                            <el-icon class="mr-5">
                                <SwitchFilled />
                            </el-icon>Github
                        </div>
                        <div :class="['user-bottom-line ', 'd-flex ai-center', layOutThemeStore.theme === 'dark' ? 'user-hover' : '']"
                            @click="lockScreen">
                            <el-icon class="mr-5">
                                <Lock />
                            </el-icon>锁定屏幕
                        </div>
                    </div>
                    <div :class="['user-bottom', 'b-bottom', layOutThemeStore.theme === 'dark' ? 'tabbar-theme' : '']">
                        <div :class="['user-bottom-line ', 'd-flex ai-center', layOutThemeStore.theme === 'dark' ? 'user-hover' : '']"
                            @click="logout"><el-icon class="mr-5">
                                <SwitchButton />
                            </el-icon>退出登录</div>
                    </div>
                </div>
            </template>
        </el-dropdown>
    </div>

    <Drawer :isDrawer="isDrawer" @close="closeDrawer" />
    <LockDialog :isLockDialog="isLockDialog" @close="closeLockDialog" />
</template>

<script setup lang='ts'>
import Drawer from './drawer/index.vue';
import LockDialog from './LockDialog/index.vue';
//获取 setting 仓库
import useLayOutSettingStore from '@/store/modules/setting';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Action } from 'element-plus';
import { useThemeStore } from '@/store/modules/theme';
import setting from '@/setting';
import useUserStore from '@/store/modules/user'

let layOutThemeStore = useThemeStore();

const isDrawer = ref<boolean>(false);
const authUserStore = useUserStore();
let layOutSettingStore = useLayOutSettingStore();
let $router = useRouter();
//获取路由对象
let $route = useRoute();
let isLockDialog = ref<boolean>(false); //锁屏弹框

//刷新
const updateRefsh = () => {
    layOutSettingStore.refsh = !layOutSettingStore.refsh;
}

//全屏
const fullScreen = () => {
    // dom 对象的属性，判断当前是否是全屏，是返回 true，不是返回 false(null)
    let full = document.fullscreenElement;

    //切换全屏
    if (!full) {
        // 利用文档根节点 requestFullscreen 实现全屏
        document.documentElement.requestFullscreen();
    } else {
        //退出全屏
        document.exitFullscreen();
    }
}
//锁定屏幕
const lockScreen = () => {
    isLockDialog.value = true;
}


//关闭弹框
const closeLockDialog = (val: boolean) => {
    isLockDialog.value = val
}

//退出登录
const logout = () => {
    // 1，发请求
    // 2，清空仓库中用户相关数据
    // 3，跳转登录页面
    ElMessageBox.confirm(
        '是否退出登录?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }
    )
        .then(() => {

            authUserStore.logout();
            $router.push({ path: '/', query: { redirect: $route.path } })
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}

//打开设置
const openSetting = () => {
    isDrawer.value = true;
}

//关闭设置
const closeDrawer = (val: boolean) => {
    isDrawer.value = val;
}
</script>
<script lang="ts">
export default {
    name: 'Setting',//递归组件加的name(必须要加)
}
</script>
<style scoped lang="scss">
.img-hover {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    margin-right: .625rem;

    img {
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        margin: .25rem;
    }

    span {
        position: absolute;
        bottom: .3125rem;
        right: .3125rem;
        width: .625rem;
        height: .625rem;
        border-radius: 50%;
        border: .125rem solid #fff;
        background-color: #79cebe;
    }
}

.user-info {
    width: 15rem;
    box-sizing: border-box;

    .user-top {
        padding: .75rem;

        .user-img {
            position: relative;
            width: 3rem;
            height: 3rem;

            img {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
            }

            span {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                background-color: #79cebe;
                position: absolute;
                bottom: .25rem;
                right: .25rem;
                border: .125rem solid #fff;

            }

        }
    }

}

.user-bottom {
    padding: .3125rem;
    font-size: .876rem;

    .user-bottom-line {
        height: 2.5rem;
        border-radius: .3125rem;
        line-height: 2.5rem;
        padding: 0 .625rem;
        cursor: pointer;

        &:hover {
            background-color: #f6f6f6
        }
    }

    .user-hover:hover {
        background-color: #2e3033 !important;
    }
}

.b-bottom {
    border-bottom: .0625rem solid #e4e4e7;
}

.img-hover:hover {
    background-color: #f6f6f6;
}

.img-hover-theme:hover {
    background-color: #2e3033 !important;
}

:v-deep .el-popup-parent--hidden {
    width: 0 !important;
}

.tabbar-theme {
    border-bottom: .0625rem solid var(--border-color);
    border-left: .0625rem solid var(--border-color);
}
</style>