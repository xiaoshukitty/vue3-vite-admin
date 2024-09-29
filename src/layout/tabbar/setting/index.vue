<template>
    <el-button class="p-13" size="small" icon="Refresh" circle @click="updateRefsh" />
    <el-button class="p-13" size="small" icon="FullScreen" circle @click="fullScreen" />
    <el-button class="p-13" size="small" icon="Setting" circle />
    <el-switch ref="elSwitch" v-model="dark" class="mt-2" style="margin-left: 24px" inline-prompt :active-icon="Sunny"
        :inactive-icon="Moon" @click="changeDark" />
    <img src="../../../assets/images/avatar1.jpg" alt=""
        style="width: 24px; height: 24px; margin: 0 12px; border-radius: 50%;">
    <!-- 下来菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang='ts'>
//获取 setting 仓库
import useLayOutSettingStore from '@/store/modules/setting'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { useThemeStore } from '@/store/modules/theme'
//引入操作本地存储工具方法
import { SET_STORAGE, GET_STORAGE } from '@/utils/storage'
//收集开关
let dark = ref<boolean>(false)
let layOutSettingStore = useLayOutSettingStore();
let layOutThemeStore = useThemeStore();
let $router = useRouter();
//获取路由对象
let $route = useRoute();

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
//退出登录
const logout = () => {
    // 1，发请求
    // 2，清空仓库中用户相关数据
    // 3，跳转登录页面
    $router.push({ path: '/login', query: { redirect: $route.path } })
}


//主题切换
//获取 html 根节点
let html = document.documentElement;
if (GET_STORAGE('THEME') == 'dark') {
    html.className = 'dark';
    dark.value = true;
} else {
    html.className = '';
    dark.value = false;
}

const changeDark = (event: MouseEvent) => {
    
    const transition = (document as Document).startViewTransition(() => {
        //判断标签是否有 dark
        if (dark.value) {
            html.className = 'dark';
            layOutThemeStore.theme = 'dark'
            SET_STORAGE('THEME', 'dark');
        } else {
            html.className = '';
            layOutThemeStore.theme = 'light';
            SET_STORAGE('THEME', 'light');
        }
    });

    //开关按钮的坐标
    const x = event.clientX;
    const y = event.clientY;

    //计算开关按钮到页面对角的距离(半径)
    const tragetRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    )
    console.log('tragetRadius----', tragetRadius);

    transition.ready.then(() => {
        //过渡动画结束
        //第一个参数是关键帧，第二个参数是可选项
        document.documentElement.animate({
            // 裁剪路径，中心圆点从 0% 到 100% 
            clipPath: [
                `circle(0% at ${x}px ${y}px)`,
                `circle(${tragetRadius}px at  ${x}px ${y}px)`
            ],
        }, {
            duration: 1000,
            pseudoElement: '::view-transition-new(root)'
        })
    })
}
</script>
<script lang="ts">
export default {
    name: 'Setting',//递归组件加的name(必须要加)
}
</script>
<style scoped></style>