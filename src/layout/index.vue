<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div :class="['layout_slider', layOutThemeStore.theme === 'dark' ? 'slider-theme' : '']">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu class="el-menu-vertical-demo" :collapse="LayOutSettingStore.fold ? true : false"
                    :default-active="$router.path" :background-color="menuBackground" :text-color="menuTextColor"
                    :active-text-color="menuActiveTextColor" router :unique-opened="true">
                    <Menu :menuList="menus"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_box">
            <div class="layout-header">
                <header :class="['layout_tabbar', layOutThemeStore.theme === 'dark' ? 'header-theme' : '']">
                    <!-- layout组件顶部 tabbar 组件 -->
                    <Tabbar></Tabbar>
                </header>
                <!-- 标签页 -->
                <section :class="['layout-label', layOutThemeStore.theme === 'dark' ? 'label-theme' : '']">
                    <LabelPage></LabelPage>
                </section>
            </div>
            <!-- 内容展示 -->
            <main :class="['layout_main', layOutThemeStore.theme === 'dark' ? '' : 'main-theme']">
                <div style="flex: 1 1 auto;" class="layout_main_content">
                    <Main></Main>
                </div>
                <div style="flex: 0 0 auto">
                    <Copyright></Copyright>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from 'vue-router';
//引入左侧菜单logo子组件
import Logo from './logo/index.vue';
//引入菜单组件
import Menu from './menu/index.vue';
//引入右侧内容展示组件(二级路由)
import Main from './main/index.vue';
// 引入 tabbar组件
import Tabbar from './tabbar/index.vue';
//引入标签页
import LabelPage from './labelPage/index.vue';
//引入版权组件
import Copyright from './copyright/index.vue';

//获取用户相关的小仓库路由
import useMenuStore from '@/store/modules/menu'
import useUserStore from '@/store/modules/user'
//获取 layout相关配置的仓库
import useLayOutSettingStore from '@/store/modules/setting'
import { ref, onMounted, computed, toRaw, toRefs } from 'vue';
import { useThemeStore } from '@/store/modules/theme'
import { useLabelRoute } from '@/store/modules/labelRoute';

const layOutThemeStore = useThemeStore();
const useMenu = useMenuStore();
const authUserStore = useUserStore();
let LayOutSettingStore = useLayOutSettingStore();
const { addLabelRoute } = useLabelRoute();
const { labelIndex } = toRefs(useLabelRoute());


//获取路由对象
let $router = useRoute();
let menus = ref<any>([]);

onMounted(() => {
    labelIndex.value = $router.path;
    addLabelRoute(toRaw($router));
    useMenu.generateMenus(authUserStore.userRole);
    menus.value = useMenu.menuRoutes;
})

// menuBackground: '#fff', //菜单背景色
//   menuTextColor: '#323639', //菜单字体颜色
//   menuActiveTextColor: '#006be6', //菜单选中字体颜色

const menuBackground = computed(() => {
    if (layOutThemeStore.theme === 'dark') {
        return '#1c1e23'
    } else {
        return '#fff'
    }

})
const menuTextColor = computed(() => {
    if (layOutThemeStore.theme === 'dark') {
        return '#fafafa'
    } else {
        return '#323639'
    }
})
const menuActiveTextColor = computed(() => {
    if (layOutThemeStore.theme === 'dark') {
        return '#ffd04b'
    } else {
        return '#006be6'
    }
})
</script>

<script lang="ts">
export default {
    name: "Layout"
}
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    display: flex;

    .layout_slider {
        color: #fff;
        background-color: #fff;
        border-right: .0625rem solid var(--border-color);
        transition-duration: .15s;
        transition-property: all;
        transition-timing-function: cubic-bezier(.4, 0, .2, 1);
        // z-index: 1101;


        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }
    }


    .slider-theme {
        border-right: .0625rem solid var(--border-theme-color) !important;
        background-color: var(--background-theme-color) !important;
        color: var(--theme-color);
    }

    .header-theme,
    .label-theme {
        background-color: var(--background-theme-color) !important;
        border-bottom: .0625rem solid var(--border-theme-color) !important;
        color: var(--theme-color);
    }

    .label-theme {
        border-top: .0625rem solid var(--border-theme-color) !important;
    }

    .layout_box {
        flex: 1;
        width: calc(100vw - $base-menu-width);

        .layout-header {
            .layout_tabbar {
                width: 100%;
                height: $base-tabbar-height;
                transition: all .3s;
            }

            .layout-label {
                border-top: .0625rem solid var(--border-color);
                border-bottom: .0625rem solid var(--border-color);
                height: $base-label-height;
                margin-left: 0px;
                width: 100%;
            }
        }


        .layout_main {
            display: flex;
            flex-flow: column nowrap;
            width: 100%;
            height: calc(100vh - ($base-tabbar-height + $base-label-height));
            padding: 1.25rem;
            overflow: auto;
            transition: all .3s;

            .layout_main_content {
                // background: var(--background-common-color);
                // border-radius: 0.8125rem;
                // border: 0.0625rem solid var(--border-color);
                // padding: 1rem;
            }
        }

        .main-theme {
            background-color: #f1f3f5 !important;
        }
    }

}


.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 13.75rem;
    min-height: 25rem;
}

::v-deep .el-sub-menu__title:hover,
::v-deep .el-menu-item:hover {
    background-color: var(--menu-item-hover-background-color) !important;
    cursor: pointer;
    -webkit-text-decoration: none;
    text-decoration: none;
}

::v-deep .el-sub-menu__title {
    height: 3.125rem !important;
    line-height: 3.125rem !important;
}


/* 横向竖向都隐藏 */
.el-aside::-webkit-scrollbar {
    display: none;
}
</style>