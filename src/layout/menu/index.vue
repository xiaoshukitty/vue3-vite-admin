<template>
    <div>
        <template v-for="(item, index) in menuList" :key="item.path">
            <!-- 没有子路由 -->
            <template v-if="!item.children">
                <el-menu-item :index="item.path" v-if="!item.meta.hidden">
                    <template #title>
                        <span>图标 &nbsp</span>
                        <span>{{ item.meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>
            <!-- 有子路由但是只有一个 -->
            <template v-if="item.children && item.children.length == 1">
                <el-menu-item  :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
                    <template #title>
                        <span>{{ item.children[0].meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>
            <!-- 有子路由，且大于一个 -->
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
                <!-- 递归组件--有 children 就直接递归这个 Menu 组件让他子组件从新走一遍 -->
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>
    </div>
</template>
  
<script setup lang="ts">
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])

</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
  
<style scoped lang="scss"></style>