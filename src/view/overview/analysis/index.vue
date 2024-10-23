<template>
    <div :class="['p-16', 'd-flex', 'anaysis-top', layOutThemeStore.theme === 'dark' ? 'anaysis-top-theme' : '']">
        <div class="anaysis-img">
            <img :src="setting.logo" alt="">
        </div>
        <div class="anaysis-center ml-24 j-center d-flex f-cloumn">
            <div class="fs-20"> 早安, 小舒, 开始您一天的工作吧！ </div>
            <span style="color:#323639cc"> 今日晴，20℃ - 32℃！ </span>
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
                            <div>
                                <SvgIcon :name="item.icon" :width="'28px'" :height="'28px'" />
                            </div>
                            <div>{{ item.title }}</div>
                        </div>
                        <div class="anaysis-block-conter">
                            {{ item.introduce }}
                        </div>
                        <div class="anaysis-block-bottom">
                            <span>{{ item.type }}</span>
                            <span>{{ item.webDate }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="['anaysis-card', 'mb-20', layOutThemeStore.theme === 'dark' ? 'anaysis-top-theme' : '']">
                <h1>22</h1>
            </div>
        </div>
        <div class="anaysis-right">2</div>
    </div>
</template>

<script setup lang="ts">
import { SvgIcon } from '@/components';
import { webItems } from '@/data/enum/index'
import setting from '@/setting';
import { useThemeStore } from '@/store/modules/theme'

const layOutThemeStore = useThemeStore();


//跳转外链
const openLink = (link: string) => {
    window.open(link, '_blank')
}
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

.anaysis-top-theme {
    background-color: var(--background-theme-color) !important;
    border: .0625rem solid var(--border-theme-color) !important;
    color: var(--theme-color);
}

.anaysis-card-item-theme {
    border-color: var(--border-theme-color) !important;
}
</style>