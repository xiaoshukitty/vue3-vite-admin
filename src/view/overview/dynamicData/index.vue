<template>
    <div :class="['dynamic-data', layOutThemeStore.theme === 'dark' ? 'dynamic-data-theme' : '']">
        <div class="container">
            <div class="data-top-list">
                <div class="data-top-item" v-for="(item, index) in 4" :key="index">
                    <div class="p-18 text-center">
                        用户量
                    </div>
                    <div class="p-18 pt-0 d-flex j-between">
                        <div class="num-data">
                            <el-statistic :value="outputValue" />
                        </div>
                        <div>111</div>
                    </div>
                    <div class="p-18 pt-0 d-flex j-between">
                        <div class="total-num">2020</div>
                        <div>111</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
import { useThemeStore } from '@/store/modules/theme';

const layOutThemeStore = useThemeStore();
const source = ref(0)
const outputValue = useTransition(source, {
    duration: 1500,
})
source.value = 2000
</script>
<style scoped lang="scss">
.dynamic-data {
    height: 100%;

    .container {
        .data-top-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;

            .data-top-item {
                background: var(--background-common-color);
                border-radius: 0.8125rem;
                border: 0.0625rem solid var(--border-color);

                .text-center {
                    font-weight: 600;
                    font-size: 1.25rem;
                    line-height: 1.75rem;
                }

                .num-data {
                    font-size: 1.25rem;
                    line-height: 1.75rem;
                }

                .total-num {}
            }
        }
    }

    &-theme {
        .data-top-item {
            background-color: var(--background-theme-color) !important;
            border: 0.0625rem solid var(--border-theme-color) !important;
            color: var(--theme-color-active);
        }
    }
}
</style>