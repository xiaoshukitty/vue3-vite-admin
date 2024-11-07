<template>
    <div class="context-menu" v-if="visible" :style="{ left: position.x + 'px', top: position.y + 'px' }">
        <ul :class="[layOutThemeStore.theme === 'dark' ? 'menu-theme' : '']">
            <li v-for="(item, index) in labelPages" :key="index" @click="triggerClick(item)"
                :class="['d-flex', 'ai-center', item.label == laberClick(item) ? 'isMenu' : '']" :style="isMenu">
                <el-icon class="mr-5">
                    <component :is="item.icon" />
                </el-icon>
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts'>
import { defineExpose, defineProps, ref, watch, onMounted, computed, toRefs } from 'vue';
import { fieldsListEnum } from '@/utils/method';
import useLayOutSettingStore from '@/store/modules/setting';
import { useThemeStore } from '@/store/modules/theme';
import { useRoute } from 'vue-router';
import { useLabelRoute } from '@/store/modules/labelRoute'
import type { RouteType } from '@/store/modules/types/labelRouteType'

const props = defineProps(['routerType'])
let layOutSettingStore = useLayOutSettingStore();
const layOutThemeStore = useThemeStore();
const { closeLabelRoute } = useLabelRoute();
const { labelRouteList } = toRefs(useLabelRoute())
const $route = useRoute();
const routeCopy = ref<RouteType>();

interface IContextMenu {
    name: string,
    icon: string,
    label: string,
}

let position = ref({ x: 0, y: 0 });
let visible = ref(false);
let labelPages = ref<any>([]);
let isRefresh = ref(false);
let isCloseLeft = ref(false);
let isCloseRight = ref(false);
let isClose = ref(false);
let isCloseAll = ref(false);
let isTopRight = ref(false);


//监听传递过来的来判断返回什么数据
watch(() => props.routerType, (newVal: string) => {
    if (newVal) {
        labelPages.value = fieldsListEnum(newVal)
    }
}, {
    immediate: true
})

//判断是否是当前路由
const laberClick = (item: IContextMenu) => {
    if (item.label == 'refresh') {
        // 判断是否是刷新
        if (!isRefresh.value) {
            return item.label == 'refresh' ? item.label : isRefresh.value;
        }
    }
    if (item.label == 'back') {
        // 判断是否可删除左侧
        if (!isCloseLeft.value) {
            return item.label == 'back' ? item.label : isCloseLeft.value;
        }
    }
    if (item.label == 'right') {
        //判断是否可删除右侧
        if (!isCloseRight.value) {
            return item.label == 'right' ? item.label : isCloseRight.value;
        }
    }
}


// 鼠标右键事件
const showMenu = (event: MouseEvent, route: RouteType) => {
    isRefresh.value = false;
    isCloseLeft.value = false;
    isCloseRight.value = false;
    const index = labelRouteList.value.findIndex(
        (e: RouteType) => e.path === route.path,
    );
    if (route.path === $route.path) {
        isRefresh.value = true;
        isCloseLeft.value = true;
        isCloseRight.value = true;
        if(index == 0){
            isCloseLeft.value = false;
        }
        if(index == labelRouteList.value.length - 1){
            isCloseRight.value = false;
        }
    }
    routeCopy.value = route;


    console.log('index', index);


    event.preventDefault(); // 阻止默认右键菜单
    position.value = { x: event.clientX, y: event.clientY };
    visible.value = true;
}
//让父组件调用
defineExpose({
    showMenu
})

// 点击事件
const triggerClick = (item: IContextMenu) => {
    let routeContextMenuObj = {
        'refresh': () => {
            //页面刷新
            layOutSettingStore.refsh = !layOutSettingStore.refsh;
        },
        'close': () => {
            closeLabelRoute(routeCopy.value);
        },
        'operation': () => {
            //关闭所有
            console.log('关闭所有');
            closeLabelRoute(routeCopy.value, 'all');
        },
        'back': () => {
            //关闭左侧
            closeLabelRoute(routeCopy.value, 'left');

        },
        'right': () => {
            //关闭右侧
            closeLabelRoute(routeCopy.value, 'right');
            console.log('关闭右侧');
        },
        'topRight': () => {
            //新的窗口打开
            window.open(routeCopy.value.path, '_blank');
        },
    } as any;

    routeContextMenuObj[item.label] && routeContextMenuObj[item.label]();
    visible.value = false;
}

const handleClickOutside = () => {
    // 如果点击发生在菜单组件外部，则关闭菜单
    window.addEventListener('click', () => {
        visible.value = false;
        isRefresh.value = false;
    })
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
})
</script>
<style lang="scss" scoped>
.context-menu {
    width: 10rem;
    position: absolute;
    background-color: #fff;
    border-radius: .3125rem;
    z-index: 1000;
}

.context-menu ul {
    list-style: none;
    padding: .3125rem;
    background-color: #FFF;
    border: 1px solid #EBEEF5;
    border-radius: .3125rem;
    box-shadow: 0 .125rem .75rem 0 rgba(0, 0, 0, .1);
}

.context-menu li {
    list-style: none;
    line-height: 1.875rem;
    padding-left: 10px;
    margin: 0;
    font-size: 14px;
    color: #000;
    cursor: pointer;
    outline: 0;
}

.context-menu li:hover {
    background-color: #f6f6f6;
    border-radius: .3125rem;
}

.menu-theme {
    border: 0.0625rem solid var(--border-theme-color) !important;
    background-color: var(--background-theme-color) !important;
    color: var(--theme-color);

    li {
        color: hsl(var(--theme-text-color));
    }

    li:hover {
        background-color: var(--theme-color-hover) !important;
    }
}

.isMenu {
    opacity: .5;
    pointer-events: none;
}
</style>