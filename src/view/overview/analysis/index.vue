<template>
    <div>
        <div :class="['p-16', 'd-flex', 'anaysis-top', layOutThemeStore.theme === 'dark' ? 'anaysis-top-theme' : '']">
            <div class="anaysis-img">
                <img :src="setting.logo" alt="">
            </div>
            <div class="anaysis-center ml-24 j-center d-flex f-cloumn">
                <div class="fs-20"> 早安, 小舒, 开始您一天的工作吧！ </div>
                <span :class="[layOutThemeStore.theme === 'dark' ? 'anaysis-block-theme' : '']" style="color:#323639cc">
                    今日晴，20℃ - 32℃！ </span>
            </div>
        </div>
        <div class="anaysis-bottom d-flex mt-20 ">
            <div class="anaysis-left mr-16">
                <div :class="['anaysis-card', 'mb-20', layOutThemeStore.theme === 'dark' ? 'anaysis-top-theme' : '']">
                    <div class="anaysis-card-top">项目</div>
                    <div class="anaysis-card-bottom">
                        <div :class="['anaysis-card-item', 'anaysis-card-item-hover', layOutThemeStore.theme === 'dark' ? 'anaysis-card-item-theme' : '']"
                            v-for="item in webItems" :key="item.id" @click="openLink(item.link)">
                            <div class="anaysis-block-top">
                                <div class="icon-hover">
                                    <SvgIcon :class="item.id == '1' ? 'icon' : ''" :name="item.icon" :width="'28px'"
                                        :height="'28px'" />
                                </div>
                                <div>{{ item.title }}</div>
                            </div>
                            <div
                                :class="['anaysis-block-conter', layOutThemeStore.theme === 'dark' ? 'anaysis-block-theme' : '']">
                                {{ item.introduce }}
                            </div>
                            <div
                                :class="['anaysis-block-bottom', layOutThemeStore.theme === 'dark' ? 'anaysis-block-theme' : '']">
                                <span>{{ item.type }}</span>
                                <span>{{ item.webDate }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="['anaysis-card', 'mb-20', layOutThemeStore.theme === 'dark' ? 'anaysis-top-theme' : '']">
                    <div class="anaysis-card-top">最新动态</div>
                    <div class="card-list">
                        <ul>
                            <li v-for="(item, index) in dynamicData" :key="index">
                                <div class="li-left">
                                    <div class="li-icon">
                                        <SvgIcon :name="item.icon" :width="'40px'" :height="'40px'" />
                                    </div>
                                    <div class="li-title">
                                        <span>{{ item.name }}</span>
                                        <span>{{ item.info }}</span>
                                    </div>
                                </div>
                                <div class="li-right">
                                    <span>{{ item.date }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div :class="['anaysis-right', layOutThemeStore.theme === 'dark' ? 'anaysis-top-theme' : '']">2</div>
        </div>

        <div class="anchor-point" v-if="isShowButton">
            <el-icon>
                <Upload />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { SvgIcon } from '@/components';
import { webItems } from '@/data/enum/index'
import setting from '@/setting';
import { useThemeStore } from '@/store/modules/theme'
import { dynamicData } from '@/data/enum/index'

const layOutThemeStore = useThemeStore();

// 定义 isShowButton 来控制按钮的显示与否
const isShowButton = ref(false);

//跳转外链
const openLink = (link: string) => {
    window.open(link, '_blank')
}

onMounted(() => {
    //强行刷新页面 暂时解决进入也看标签路由的小问题 --- 暂时 
    // 检查 sessionStorage 中是否有 "visited" 键
    const isFirstVisit = sessionStorage.getItem('visited') === null;
    if (isFirstVisit) {
        // 如果是第一次访问，执行刷新逻辑
        sessionStorage.setItem('visited', 'true');  // 设置标记
        window.location.reload();  // 刷新页面
    } else {
    }
})
</script>

<style scoped lang="scss">
.anaysis-top {
    background: var(--background-common-color);
    border-radius: .8125rem;
    border: .0625rem solid var(--border-color);

    .anaysis-img {
        width: 5rem;
        height: 5rem;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }

    .anaysis-center {
        div {
            font-weight: 600;
            line-height: 1.75rem;
            margin-bottom: .5rem;
        }
    }
}

.anchor-point {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition-duration: .5s;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    --tw-shadow: 0 6px 16px 0 rgba(0, 0, 0, .08), 0 3px 6px -4px rgba(0, 0, 0, .12), 0 9px 28px 8px rgba(0, 0, 0, .05);
    --tw-shadow-colored: 0 6px 16px 0 var(--tw-shadow-color), 0 3px 6px -4px var(--tw-shadow-color), 0 9px 28px 8px var(--tw-shadow-color);
    box-shadow: 0 0 transparent, 0 0 transparent, 0 6px 16px #00000014, 0 3px 6px -4px #0000001f, 0 9px 28px 8px #0000000d;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 transparent), var(--tw-ring-shadow, 0 0 transparent), var(--tw-shadow);
    color: #323639cc;
    z-index: 1000;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 1.25rem;
    right: 3.125rem;
}

.anaysis-bottom {
    width: 100%;

    .anaysis-left {
        width: 60%;
        border-radius: .8125rem;

        .anaysis-card {
            border: .0625rem solid var(--border-color);
            background: var(--background-common-color);
            border-radius: .8125rem;

            .anaysis-card-top {
                padding: 1.25rem;
                font-size: 1.125rem;
                line-height: 1.75rem;
                font-weight: 600;
            }

            .anaysis-card-bottom {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-gap: 0;

                .anaysis-card-item {
                    padding: 1rem;
                    border-radius: 0;
                    transition-duration: .15s;
                    transition-property: all;
                    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
                    border-top-width: .0625rem;
                    border-right-width: .0625rem;
                    border-bottom-width: 0;
                    border-color: var(--border-color);
                    border-style: solid;
                    box-sizing: border-box;
                    cursor: pointer;

                    .anaysis-block-top {
                        font-size: 1.125rem;
                        line-height: 1.75rem;
                        display: flex;

                        & div:nth-child(2) {
                            margin-left: 1rem;
                        }
                    }

                    .anaysis-block-conter {
                        height: 2.5rem;
                        margin-top: .5rem;
                        color: #00000073;
                        font-size: .875rem;
                    }

                    .anaysis-block-bottom {
                        display: flex;
                        justify-content: space-between;
                        color: #00000073;
                        font-size: .875rem;
                    }
                }

                .anaysis-card-item:nth-child(3n) {
                    border-right-width: 0 !important;
                }
            }

            .card-list {
                padding: 0 1.25rem 1.25rem;

                ul {
                    li {
                        padding-bottom: 1.25rem;
                        padding-top: 1.25rem;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: .0625rem solid #e4e4e7;

                        .li-left {
                            display: flex;
                            align-items: center;
                            column-gap: 1rem;

                            .li-icon {
                                width: 2.5rem;
                                height: 2.5rem;
                            }

                            .li-title {
                                flex: 1 1 auto;
                                display: flex;
                                flex-direction: column;

                                span:nth-child(1) {
                                    color: #323639;
                                    line-height: 1.5rem;
                                    font-weight: 600;
                                    font-size: .875rem;
                                }

                                span:nth-child(2) {
                                    color: #323639cc;
                                    line-height: 1.25rem;
                                    font-size: .75rem;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    margin-top: .25rem;
                                }
                            }
                        }

                        .li-right {
                            display: flex;
                            align-items: flex-end;

                            span {
                                color: #323639cc;
                                font-size: .75rem;
                                line-height: 1rem;
                            }
                        }
                    }

                    li:last-child {
                        border-block-end: none;
                    }
                }
            }
        }
    }

    .anaysis-right {
        border-radius: .8125rem;
        border: .0625rem solid var(--border-color);
        width: 40%;
        background: var(--background-common-color);
    }
}

.anaysis-card-item-hover:hover {
    box-shadow: 0 0 transparent, 0 0 transparent, 0 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, .1), 0 .5rem .625rem -0.375rem rgba(0, 0, 0, .1);
}

.anaysis-card-item-hover:hover .icon-hover {
    transform: scale(1.1);
}

.icon-hover {
    .icon {
        border-radius: 50%;
        background-color: #fff;
    }

}

.anaysis-top-theme {
    background-color: var(--background-theme-color) !important;
    border: .0625rem solid var(--border-theme-color) !important;
    color: var(--theme-color-active);

    ul {
        li {
            span {
                color: var(--theme-color-active) !important;
            }

            border-bottom: .0625rem solid var(--border-theme-color) !important;
        }

        li:last-child {
            border-block-end: none !important;
        }
    }
}

.anaysis-card-item-theme {
    border-color: var(--border-theme-color) !important;
}

.anaysis-block-theme {
    color: var(--theme-color-active) !important;
}
</style>