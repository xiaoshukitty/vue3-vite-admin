<template>
    <!-- 顶部左侧 -->
    <div class="icon-btn">
        <div :class="['icon-hover', 'mr-5', layOutThemeStore.theme === 'dark' ? 'breadcriumb-theme' : '']"
            @click="changeIcon">
            <el-icon class="fs-18">
                <component is="Operation"></component>
            </el-icon>
        </div>
        <div :class="['icon-hover', layOutThemeStore.theme === 'dark' ? 'breadcriumb-theme' : '']" @click="updateRefsh">
            <el-icon class="fs-18">
                <component is="Refresh"></component>
            </el-icon>
        </div>
    </div>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 面包屑动态展示路由名称和标题 -->
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
            @click="recordsRoute(item)" :to="item.path">
            <!-- 图标 -->
            <div class="d-flex ai-center">
                <el-icon class="fs-18">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span :class="[layOutThemeStore.theme === 'dark' ? 'breadcriumb-theme-span' : '']"
                    style="margin: 0 .3125rem; color:#71717a">{{ item.meta.title }}</span>
            </div>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useLayOutSettingStore from '@/store/modules/setting';
import { useThemeStore } from '@/store/modules/theme';
import { LabelRouteType } from '@/types/labelRouteType';

let layOutThemeStore = useThemeStore();
//获取 layout相关配置的仓库
let layOutSettingStore = useLayOutSettingStore();
//获取路由对象
let $useRoute = useRoute()
//定义控制图标切换
let fold = ref(false)

const changeIcon = () => {
    layOutSettingStore.fold = !layOutSettingStore.fold;
}

const recordsRoute = (item: LabelRouteType) => {
    console.log(item);
}
//刷新
const updateRefsh = () => {
    layOutSettingStore.refsh = !layOutSettingStore.refsh;
}

</script>
<script lang="ts">
export default {
    name: "Breadcrumb"
}
</script>

<style lang="scss" scoped>
.icon-btn {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .icon-hover {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .5rem;
        border-radius: .3125rem;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            background-color: var(--header-hover-backgorund);
        }
    }
}

.breadcriumb-theme {
    &:hover {
        background-color: var(--theme-color-hover) !important;
    }
}

.breadcriumb-theme-span {
    color: var(--theme-color) !important;
}
</style>
