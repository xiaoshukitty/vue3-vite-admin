<template>
    <el-button size="small" icon="Refresh" circle @click="updateRefsh" />
    <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
    <el-button size="small" icon="Setting" circle />
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
let layOutSettingStore = useLayOutSettingStore();
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

</script>
<script lang="ts">
export default {
    name: 'Setting',//递归组件加的name(必须要加)
}
</script>
<style scoped></style>