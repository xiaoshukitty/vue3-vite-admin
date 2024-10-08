<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="">
        <p :style=" LayOutSettingStore.fold ? 'display:none' : 'display:block' ">{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
//引入设置标题和logo配置文件
import setting from '@/setting'
//获取 layout相关配置的仓库
import useLayOutSettingStore from '@/store/modules/setting'

let LayOutSettingStore = useLayOutSettingStore();
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
    padding: .625rem;

    img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
    }

    p {
        font-size: $base-menu-logo-title-fontSize;
        margin-left: .625rem;
    }
}
</style>