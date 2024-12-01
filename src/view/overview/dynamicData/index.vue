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
            <div class="broken-line">
                <div class="tablist">
                    <div v-for="(item, index) in tablist" :key="index"
                        :class="[avatarIndex === index ? 'avatar-active' : '']" @click="graph(index)">
                        {{ item }}</div>
                </div>
                <div style="margin-top: 20px;">
                    <div id="chart" style="width: 100%;height:400px;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from "vue";

import { useTransition } from '@vueuse/core'
import { useThemeStore } from '@/store/modules/theme';
import * as echarts from "echarts";

const layOutThemeStore = useThemeStore();
const source = ref(0)
const outputValue = useTransition(source, {
    duration: 1500,
})
const tablist = ref(['流量趋势', '月访问量']);
const avatarIndex = ref(0);

source.value = 2000;

// 图表配置
const option = ref({
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [100, 200, 300, 400, 500, 600, 700]
    },
    yAxis: {
        type: 'value',
        data: [0, 100, 200, 300, 400]
    },
    series: [
        {
            name: 'number',
            type: 'line',  // 默认是折线图
            stack: 'Total',
            smooth: true,
            data: [0, 132, 328, 380, 260, 230, 0],
            areaStyle: {}
        },
        {
            name: 'hello',
            type: 'line',  // 默认是折线图
            stack: 'x',
            smooth: true,
            data: [0, 140, 203, 320, 239, 172, 0],
            areaStyle: {}
        }
    ]
});

// 图表实例
let chartInstance: echarts.ECharts | null = null;

// 切换图表类型及数据
const graph = (index: number) => {
    avatarIndex.value = index;

    if (avatarIndex.value === 0) {
        // 切换为折线图
        option.value.series = [
            {
                name: 'number',
                type: 'line',  // 折线图
                stack: 'Total',
                smooth: true,
                data: [0, 132, 328, 380, 260, 230, 0],
                areaStyle: {}
            },
            {
                name: 'hello',
                type: 'line',  // 折线图
                stack: 'x',
                smooth: true,
                data: [0, 140, 203, 320, 239, 172, 0],
                areaStyle: {}
            }
        ];
    } else if (avatarIndex.value === 1) {
        // 切换为柱状图，只保留一个 series
        option.value.series = [
            {
                name: 'number',
                type: 'bar',  // 柱状图
                data: [0, 132, 220, 300, 180, 150, 0]  // 示例柱状图数据
            }
        ];
    }

    // 如果图表实例已经存在，先清空图表
    if (chartInstance) {
        chartInstance.clear();
    }

    // 更新图表
    if (chartInstance == null) {
        chartInstance = echarts.init(document.getElementById('chart') as HTMLElement);
    }
    chartInstance.setOption(option.value);
};

onMounted(() => {
    chartInstance = echarts.init(document.getElementById('chart') as HTMLElement);
    chartInstance.setOption(option.value);
});

// onBeforeUnmount(() => {
//     if (chartInstance) {
//         chartInstance.dispose();
//     }
// });

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

        .broken-line {
            margin-top: 1.25rem;
            background: var(--background-common-color);
            border-radius: 0.8125rem;
            border: 0.0625rem solid var(--border-color);
            padding: .75rem 1rem 1.25rem;

            .tablist {
                outline: none;
                color: #71717a;
                padding: .25rem;
                background-color: #f4f4f5;
                border-radius: .5rem;
                display: inline-flex;
                cursor: pointer;

                div {
                    font-size: .875rem;
                    line-height: 1.25rem;
                    padding: .25rem .75rem;
                    border-radius: .375rem;
                    font-weight: 500;
                }

                .avatar-active {
                    color: #323639;
                    background-color: #fff;
                    transition-duration: .15s;
                    transition-property: all;
                    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
                }
            }
        }
    }

    &-theme {
        .data-top-item {
            background-color: var(--background-theme-color) !important;
            border: 0.0625rem solid var(--border-theme-color) !important;
            color: var(--theme-color-active);
        }
        .broken-line{
            background-color: var(--background-theme-color) !important;
            border: 0.0625rem solid var(--border-theme-color) !important;
            color: var(--theme-color-active);
            .tablist{
                background-color: var(--background-theme-color) !important;
                border: 0.0625rem solid var(--border-theme-color) !important;
            }
        }
    }
}
</style>