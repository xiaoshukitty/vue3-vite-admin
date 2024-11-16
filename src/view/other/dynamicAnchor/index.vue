<template>
    <div :class="['dynamicAnchor', layOutThemeStore.theme === 'dark' ? 'dynamicAnchor-theme' : '']">
        <el-row>
            <el-col :span="24">
                <div ref="containerRef" class="anchor">
                    <div id="part1" class="anchor-block color-a">
                        用户管理
                    </div>
                    <div id="part2" class="anchor-block color-b">
                        配置管理
                    </div>
                    <div id="part3" class="anchor-block color-c">
                        角色管理
                    </div>
                    <div id="part4" class="anchor-block color-d">
                        定时任务
                    </div>
                </div>
            </el-col>

        </el-row>
        <div class="orientation">
            <el-anchor class="demo-tabs" :container="containerRef" direction="vertical" type="default"
                @click="handleClick">
                <el-anchor-link href="#part1" title="用户管理" />
                <el-anchor-link href="#part2" title="配置管理" />
                <el-anchor-link href="#part3" title="角色管理" />
                <el-anchor-link href="#part4" title="定时任务" />
            </el-anchor>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useThemeStore } from '@/store/modules/theme';

const layOutThemeStore = useThemeStore();
const containerRef = ref<HTMLElement | null>(null)

const handleClick = (e: MouseEvent) => {
    e.preventDefault()
}
</script>
<style scoped lang="scss">
.dynamicAnchor {
    position: relative;
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;

    .anchor {
        height: calc(100vh - 14.875rem);
        overflow-y: auto;

        .anchor-block {
            padding: 2.5rem;
            height: 100%;
        }

        .color-a {
            background: #c5fd97;
        }

        .color-b {
            background: #97c5fd;
        }

        .color-c {
            background: #fd97c5;
        }

        .color-d {
            background: #97fd97
        }

    }

    .orientation {
        position: absolute;
        right: 3.75rem;
        top: 5rem;
        background: #fff;
        padding: 1.25rem 2.5rem 1.25rem 1.25rem;
    }
}

.dynamicAnchor-theme {
    background-color: var(--background-theme-color) !important;
    border: .0625rem solid var(--border-theme-color) !important;

    .orientation {
        background-color: var(--background-theme-color) !important;
        color: var(--theme-color) !important;
        .demo-tabs{
            background-color: var(--background-theme-color) !important;
        }
    }
}
</style>