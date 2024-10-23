<template>
    <div class="label-page">
        <div class="left-lable fs-14" @contextmenu="showContextMenu($event)">
            <div class="d-flex left-lable-content">
                <div
                    :class="['left-lable-text', 'd-flex', 'ai-center', 'label-hover', layOutThemeStore.theme === 'dark' ? 'label-theme-hover' : '']">
                    首页</div>
                <div
                    :class="['left-lable-text', 'd-flex', 'ai-center', 'label-hover', layOutThemeStore.theme === 'dark' ? 'label-theme-hover' : '']">
                    页面滑动</div>
            </div>
        </div>
        <div class="right-labl">
            右
        </div>
    </div>

    <ContextMenu ref="contextMenu" :routerType="routerType"></ContextMenu>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useThemeStore } from '@/store/modules/theme';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
let layOutThemeStore = useThemeStore();
const contextMenu = ref();
let routerType = ref('');  //传递给 contextMenu 组件用来辨别

console.log(t('routerNavigation'));

const showContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    contextMenu.value.showMenu(e);
    routerType.value = 'labelPage';
}
</script>

<style lang="scss" scoped>
.label-page {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    .left-lable {
        height: 100%;
        text-align: center;
        line-height: 2.0625rem;

        .left-lable-content {
            height: 100%;
            align-items: center;
            margin-left: .625rem;

            .left-lable-text {
                padding: 0 .625rem;
                height: 100%;

            }

            .label-hover:hover {
                background-color: #f6f6f6;
                border-radius: .3125rem;
                height: 1.9375rem;
            }

            .label-theme-hover:hover {
                background-color: var(--theme-color-hover) !important;
            }
        }
    }
}
</style>