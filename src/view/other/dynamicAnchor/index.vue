<template>
    <div :class="['dynamicAnchor', layOutThemeStore.theme === 'dark' ? 'dynamicAnchor-theme' : '']">
        <el-row>
            <el-col :span="24">
                <div ref="containerRef" class="anchor" @scroll="handleScroll">
                    <div v-for="(section, index) in sections" :key="index" :id="section.id"
                        :class="['anchor-block', section.colorClass]">
                        {{ section.title }}
                    </div>
                </div>
            </el-col>
        </el-row>

        <div class="orientation">
            <el-anchor class="demo-tabs" :container="containerRef" direction="vertical" type="default"
                @click="handleClick">
                <el-anchor-link v-for="(section, index) in sections" :key="index" :href="'#' + section.id"
                    :title="section.title" />
            </el-anchor>
        </div>

        <!-- 返回顶部图标 -->
        <el-button v-if="showBackToTop" class="back-to-top" type="primary" circle icon="Top" @click="scrollToTop" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '@/store/modules/theme';

const layOutThemeStore = useThemeStore();
const containerRef = ref<HTMLElement | null>(null);
const showBackToTop = ref(false);

const sections = [
    { id: 'part1', title: '用户管理', colorClass: 'color-a' },
    { id: 'part2', title: '配置管理', colorClass: 'color-b' },
    { id: 'part3', title: '角色管理', colorClass: 'color-c' },
    { id: 'part4', title: '定时任务', colorClass: 'color-d' },
];

// 点击链接事件处理（目前为空实现）
const handleClick = (e: MouseEvent) => {
    e.preventDefault();
};

// 滚动事件处理
const handleScroll = () => {
    if (containerRef.value) {
        // 显示返回顶部按钮当滚动位置大于一定高度时
        showBackToTop.value = containerRef.value.scrollTop > 200;
    }
};

// 返回顶部
const scrollToTop = () => {
    if (containerRef.value) {
        containerRef.value.scrollTo({
            top: 0,
            behavior: 'smooth', // 平滑滚动
        });
    }
};
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

        /* 隐藏滚动条 */
        -ms-overflow-style: none;
        /* 适用于 IE 和 Edge */
        scrollbar-width: none;
        /* 适用于 Firefox */

        &::-webkit-scrollbar {
            display: none;
            /* 适用于 Chrome、Safari 和 Edge */
        }

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
            background: #97fd97;
        }
    }

    .orientation {
        position: absolute;
        right: 3.75rem;
        top: 5rem;
        background: #fff;
        padding: 1.25rem 2.5rem 1.25rem 1.25rem;
        border-radius: 0.5rem;

        .demo-tabs {
            background: transparent;
        }
    }

    .back-to-top {
        position: fixed;
        bottom: 9rem;
        right: 4.75rem;
        background-color: var(--theme-color);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: opacity 0.3s ease;
        color: #000;

    }
}

.dynamicAnchor-theme {
    background-color: var(--background-theme-color) !important;
    border: 0.0625rem solid var(--border-theme-color) !important;

    .orientation {
        background-color: var(--background-theme-color) !important;
        color: var(--theme-color) !important;

        .demo-tabs {
            background-color: var(--background-theme-color) !important;
        }
    }
}
</style>
