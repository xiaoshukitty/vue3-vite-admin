<template>
    <el-drawer v-model="openDrawer" :direction="direction" close-on-click-modal @close="closeDrawer"
        :size="drawerWidth">
        <template #header>
            <h4>set title by slot</h4>
        </template>
        <template #default>
            <div class="content">
                <div class="tab-border">
                    <ul class="tab-tilte">
                        <li v-for="(item, index) in tabs" :key="index" :class="{ active: tabIndex == index }"
                            @click="changeTab(index)">
                            <div>{{ item }}</div>
                        </li>
                    </ul>
                </div>
                <div>
                    <div class="content-list" v-if="tabIndex == 0">
                        <div>
                            <h3>主题</h3>
                            <div class="line">
                                <div>主题</div>
                                <ThemeSwitch :MoveRound="dark" @update:themeSwitch="changeDark"></ThemeSwitch>
                            </div>
                        </div>
                        <div class="built-theme">
                            <h3>内置主题</h3>
                            <div class="theme-color">
                                <div class="theme-list" v-for="(item, index) in themeColor" :key="index">
                                    <div :class="['theme-item', colorIndex == index ? 'active-color' : '']"
                                        :style="[{ border: colorIndex == index ? '2px solid' + ' ' + item.color : '', }, hoverColor]"
                                        @click="colorChange(index)">
                                        <div class="theme-item-box" :style="{ background: item.color }"></div>
                                    </div>
                                    <div class="theme-text">{{ item.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </template>
    </el-drawer>
</template>

<script setup lang='ts'>
import { ref, watch, reactive, computed } from 'vue';
import type { DrawerProps } from 'element-plus';
//引入操作本地存储工具方法
import { SET_STORAGE, GET_STORAGE } from '@/utils/storage';
import { useThemeStore } from '@/store/modules/theme';

let layOutThemeStore = useThemeStore();
const direction = ref<DrawerProps['direction']>('rtl');
const openDrawer = ref(false);
const drawerWidth = ref('25%');
const tabs = reactive(['外观', '布局', '功能']);
const themeColor = reactive([
    { name: '默认', color: '#006be6' },
    { name: '紫罗兰', color: 'rgb(113, 102, 240)' },
    { name: '樱花粉', color: 'rgb(232, 74, 108)' },
    { name: '柠檬黄', color: 'rgb(239, 189, 72)' },
    { name: '天蓝色', color: 'rgb(78, 105, 253)' },
    { name: '浅绿色', color: 'rgb(11, 208, 146)' },
    { name: '锌色灰', color: 'rgb(63, 63, 70)' },
    { name: '深绿色', color: 'rgb(13, 148, 150)' },
    { name: '深蓝色', color: 'rgb(9, 96, 190)' },
    { name: '橙黄色', color: 'rgb(193, 66, 11)' },
    { name: '玫瑰红', color: 'rgb(187, 27, 27)' },
    { name: '中性色', color: 'rgb(64, 64, 64)' },
    { name: '石板灰', color: 'rgb(52, 66, 86)' },
    { name: '中灰色', color: 'rgb(56, 66, 82)' },
    { name: '自定义', color: 'rgb(223, 223, 223)' },]
)
let colorIndex = ref(0);//当前选中颜色
let tabIndex = ref(0);
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

//动态绑定 style 里面的 hover 事件
const hoverColor = computed(() => {
    return { "--background-color-hover": themeColor[colorIndex.value].color };
})

//切换tab
const changeTab = (index: number) => {
    tabIndex.value = index;
}
//主题切换
const colorChange = (index: number) => {
    colorIndex.value = index;

}

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
            duration: 600,
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
.content {
    padding: 1.25rem;

    .content-list {
        margin-top: .625rem;

        .content-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 3.125rem;

            .content-item-title {
                font-size: .875rem;
                color: #333;
            }

            .content-item-switch {
                ::v-deep .el-switch__core {
                    width: 2.5rem !important;
                    height: 1.25rem;
                    border-radius: .625rem;
                }

                ::v-deep .el-switch__core::after {
                    width: 1rem;
                    height: 1rem;
                }
            }
        }

        .built-theme {

            .theme-color {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                column-gap: .5rem;
                row-gap: .5rem;
                cursor: pointer;

                .theme-list {
                    box-sizing: border-box !important;

                    .theme-item {
                        position: relative;
                        // padding: .8125rem 1.25rem;
                        height: 3.125rem;
                        display: flex;
                        align-items: center;
                        border: .0625rem solid #e4e4e7;
                        border-radius: .625rem;
                        cursor: pointer;

                        .theme-item-box {
                            width: 1.25rem;
                            height: 1.25rem;
                            border-radius: .3125rem;
                            margin: auto;
                        }
                    }

                    .active-color:hover {
                        pointer-events: none;
                    }

                    .theme-item:hover:after {
                        height: 100%;
                        left: 0;
                        opacity: 1;
                        // outline-color: #006be6;
                        outline-color: var(--background-color-hover);

                        padding: .25rem;
                        top: 0;
                        width: 100%;
                    }


                    .theme-item:after {
                        border-radius: .625rem;
                        height: 0;
                        left: 50%;
                        opacity: 0;
                        outline-color: transparent;
                        outline-style: solid;
                        outline-width: 2px;
                        position: absolute;
                        top: 50%;
                        transition-duration: .3s;
                        transition-property: all;
                        transition-timing-function: cubic-bezier(.4, 0, .2, 1);
                        width: 1px;
                        z-index: 20;
                        animation-duration: .3s;
                        content: "";
                    }
                }


                .theme-text {
                    text-align: center;
                    margin: .625rem 0;
                }
            }
        }
    }


    .tab-border {
        background-color: #f4f4f5;
        padding: .3125rem;
        border-radius: .625rem;

        ul li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .tab-tilte {
            display: flex;
        }

        .tab-tilte li {
            flex: 1;
            padding: .5rem;
            text-align: center;
            background-color: #f4f4f5;
            border-radius: .625rem;
            cursor: pointer;
            transition: background-color .5s;
            color: #71717a;
            /* 添加过渡效果 */

        }

        /* 点击对应的标题添加对应的背景颜色 */
        .tab-tilte .active {
            background-color: #fff;
            color: #71717a;
            border-radius: .625rem;
            // transition-timing-function: cubic-bezier(.4,0,.2,1);
            // transition-duration: .3s;

        }
    }

    .line {
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: .5rem;
        padding-right: .5rem;
        border-radius: .625rem;
    }

    .line:hover {
        background-color: #f4f4f5;
    }
}
</style>
<style>
.el-drawer__body {
    padding: 0;
    border-top: 0.0625rem solid #ccc;
}
</style>