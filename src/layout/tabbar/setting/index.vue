<template>
    <el-button size="small" icon="Refresh" circle />
    <el-button size="small" icon="FullScreen" circle />
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
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang='ts'>

</script>
<script lang="ts">
export default {
    name: 'Setting',//递归组件加的name(必须要加)
}
</script>
<style scoped></style>