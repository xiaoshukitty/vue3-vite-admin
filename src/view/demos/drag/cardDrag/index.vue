<template>
    <div :class="['cardDrag', layOutThemeStore.theme === 'dark' ? 'cardDrag-theme' : '']">
        拖拽
    </div>
</template>

<script setup lang='ts'>
import { useThemeStore } from '@/store/modules/theme';

const layOutThemeStore = useThemeStore();
</script>
<style scoped lang="scss">
.cardDrag {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;
}

.cardDrag-theme {
    background-color: var(--background-theme-color) !important;
    border: .0625rem solid var(--border-theme-color) !important;
}
</style>