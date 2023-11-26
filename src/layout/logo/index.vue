<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="">
        <p>{{ setting.title }}</p>
    </div>
</template>
  
<script setup lang="ts">
//引入设置标题和logo配置文件
import setting from '@/setting'
</script>
<script lang="ts">
export default {
    name: "Logo"
}
</script>
  
<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    color: #fff;
    align-items: center;
    padding: 10px;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    p {
        font-size: $base-menu-logo-title-fontSize;
        margin-left: 10px;
    }
}
</style>