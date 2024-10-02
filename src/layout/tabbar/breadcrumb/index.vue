<template>
    <!-- 顶部左侧 -->
    <el-icon class="mr-10 fs-26" :style="layOutThemeStore.theme === 'dark' ? 'color:#eee' : ''" @click="changeIcon">
        <component :is="LayOutSettingStore.fold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 面包屑动态展示路由名称和标题 -->
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
            :to="item.path">
            <!-- 图标 -->
            <div class="d-flex ai-center">
                <el-icon class="fs-24">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span style="margin: 0 5px;">{{ item.meta.title }}</span>
            </div>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
import { useThemeStore } from '@/store/modules/theme'

let layOutThemeStore = useThemeStore();
//获取 layout相关配置的仓库
let LayOutSettingStore = useLayOutSettingStore();
//获取路由对象
let $useRoute = useRoute()
//定义控制图标切换
let fold = ref(false)

const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold;
}
</script>
<script lang="ts">
export default {
    name: "Breadcrumb"
}
</script>
