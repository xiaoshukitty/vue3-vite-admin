<template>
    <div class="copyright">
        <div :class="['copyright-center', layOutThemeStore.theme === 'dark' ? 'copyright-theme' : '']">
            Copyright © 2024 Xiao Shu All Rights Reserved
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useThemeStore } from '@/store/modules/theme'

const layOutThemeStore = useThemeStore();
</script>
<style scoped lang="scss">
.copyright {
    padding-top: 1.25rem;

    .copyright-center {
        height: 3.125rem;
        line-height: 3.125rem;
        text-align: center;
        font-size: .875rem;
        border-radius: .3125rem;
        border: .0625rem solid #EBEEF5;
        background-color: #FFF;
        overflow: hidden;
        color: #303133;
        transition: .3s;
        box-shadow: 0 .125rem .75rem 0 rgba(0, 0, 0, .1);
    }

    .copyright-theme {
        background-color: var(--background-theme-color) !important;
        border: .0625rem solid var(--border-theme-color) !important;
        color: var(--theme-color) !important;
    }
}
</style>