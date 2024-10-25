<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="recordsRoute(item)">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由但是只有一个 -->
        <!-- <template v-if="item.children && item.children.length == 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden"
                @click="recordsRoute(item)">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template> -->
        <!-- 有子路由，且大于一个 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 递归组件--有 children 就直接递归这个 Menu 组件让他子组件从新走一遍，递归组件必须要加 name，就是下面那个 script -->
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useLabelRoute } from '@/store/modules/labelRoute';
import type { RouteType } from '@/store/modules/types/labelRouteType'
const { addLabelRoute } = useLabelRoute();
const { laberIndex } = toRefs(useLabelRoute());

//获取父组件传递过来的全部路由数组
defineProps(['menuList']);
import { useRouter } from 'vue-router';
//获取路由对象
let $router = useRouter();

//点击菜单回调
const recordsRoute = (item: RouteType) => {
    laberIndex.value = item.path; // 这个位置的问题
    addLabelRoute(item);
 
}

</script>

<script lang="ts">
export default {
    name: 'Menu',//递归组件加的name(必须要加)
}
</script>

<style scoped lang="scss"></style>