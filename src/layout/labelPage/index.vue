<template>
    <div class="label-page">
        <div class="left-lable fs-14" @contextmenu="showContextMenu($event)">
            <div class="d-flex left-lable-content">
                <div v-for="(item, index) in labelRouteList" :key="index" @click="linkRouter(item)"
                    :class="['left-lable-text', 'd-flex', 'ai-center', 'label-hover', layOutThemeStore.theme === 'dark' ? 'label-theme-hover' : '', laberIndex === item.path ? 'label-active' : '']">
                    <el-icon class="fs-16 mr-5">
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    {{ item.meta.title }}
                    <el-icon v-if="labelRouteList.length > 1" class="label-page-icon" @click.stop="closeRoute(item)">
                        <Close />
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="right-labl">
            右
        </div>
    </div>

    <ContextMenu ref="contextMenu" :routerType="routerType"></ContextMenu>
</template>

<script setup lang='ts'>
import { ref, onMounted,toRefs } from 'vue';
import { useThemeStore } from '@/store/modules/theme';
import { useI18n } from 'vue-i18n';
import { useLabelRoute } from '@/store/modules/labelRoute';
import { useRouter, useRoute } from 'vue-router';
const { labelRouteList } = useLabelRoute();
const { laberIndex } = toRefs(useLabelRoute());

const { t } = useI18n();
let layOutThemeStore = useThemeStore();
const contextMenu = ref();
let routerType = ref('');  //传递给 contextMenu 组件用来辨别
const $router = useRouter();
const $route = useRoute();
console.log(t('routerNavigation'));

//路由跳转
const linkRouter = (item: any) => {
    if ($route.path === item.path) return;
    $router.push(item.path);
    laberIndex.value = item.path;
}
//删除
const closeRoute = (item: any) => {
}

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

                .label-page-icon {
                    width: .75rem;
                    margin-left: .625rem;
                }
            }

            .label-hover {
                margin-right: .1875rem;
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

.label-active {
    background-color: #f6f6f6;
    border-radius: .3125rem;
    height: 1.9375rem !important;
    color: #006be6;
}
</style>