<template>
    <div :class="['fileDownload', layOutThemeStore.theme === 'dark' ? 'fileDownload-theme' : '']">

    </div>
</template>

<script setup lang='ts'>
import { useThemeStore } from '@/store/modules/theme'

const layOutThemeStore = useThemeStore();

</script>
<style scoped lang="scss">
.fileDownload {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;
    display: flex;

    &-theme {
        background-color: var(--background-theme-color) !important;
        border: .0625rem solid var(--border-theme-color) !important;
    }
}
</style>