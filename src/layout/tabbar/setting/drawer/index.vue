<template>
    <el-drawer v-model="openDrawer" :direction="direction"  close-on-click-modal  @close="closeDrawer" :size="drawerWidth">
        <template #header>
            <h4>set title by slot</h4>
        </template>
        <template #default>
            <p>set content by slot</p>
            <ThemeSwitch :MoveRound="dark" @update:themeSwitch="changeDark"></ThemeSwitch>
        </template>
    </el-drawer>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import type { DrawerProps } from 'element-plus';
//引入操作本地存储工具方法
import { SET_STORAGE, GET_STORAGE } from '@/utils/storage';
import { useThemeStore } from '@/store/modules/theme';

let layOutThemeStore = useThemeStore();
const direction = ref<DrawerProps['direction']>('rtl');
const openDrawer = ref(false);
const drawerWidth = ref('25%');
//收集开关
let dark = ref<boolean>(false);
const props = defineProps({
    isDrawer: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits(['close']);


watch(() => props.isDrawer, (val: boolean) => {
    openDrawer.value = val;

}, { immediate: true })

//主题切换
//获取 html 根节点
let html = document.documentElement;
if (GET_STORAGE('THEME') == 'dark') {
    html.className = 'dark';
    dark.value = true;
} else {
    html.className = '';
    dark.value = false;
}

//主题切换
const changeDark = (event: MouseEvent) => {
    dark.value = !dark.value;
    const transition = (document as Document).startViewTransition(() => {

        //判断标签是否有 dark
        if (dark.value) {
            html.className = 'dark';
            layOutThemeStore.theme = 'dark'
            SET_STORAGE('THEME', 'dark');
        } else {
            html.className = '';
            layOutThemeStore.theme = 'light';
            SET_STORAGE('THEME', 'light');
        }
    });

    //开关按钮的坐标
    const x = event.clientX;
    const y = event.clientY;

    //计算开关按钮到页面对角的距离(半径)
    const tragetRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    )

    transition.ready.then(() => {
        //过渡动画结束
        //第一个参数是关键帧，第二个参数是可选项
        document.documentElement.animate({
            // 裁剪路径，中心圆点从 0% 到 100% 
            clipPath: [
                `circle(0% at ${x}px ${y}px)`,
                `circle(${tragetRadius}px at  ${x}px ${y}px)`
            ],
        }, {
            duration: 1000,
            pseudoElement: '::view-transition-new(root)'
        })
    })
}


//关闭
const closeDrawer = () => {
    emits('close', false)
}
</script>
<style lang="scss" scoped>
.drawer {}

:v-deep .el-drawer.rtl {
    width: 25% !important;
}
</style>