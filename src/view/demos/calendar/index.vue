<template>
    <div :class="['calendar', layOutThemeStore.theme === 'dark' ? 'calendar-theme' : '']">
        <el-calendar v-model="calenderDate" />
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useThemeStore } from '@/store/modules/theme';

const calenderDate = ref(new Date())
const layOutThemeStore = useThemeStore();

</script>
<style scoped lang="scss">
.calendar {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;

    &-theme {
        background-color: var(--background-theme-color) !important;
        border: 0.0625rem solid var(--border-theme-color) !important;
    }
}
</style>