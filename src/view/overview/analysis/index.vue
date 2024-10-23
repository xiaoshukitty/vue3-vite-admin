<template>
    <div class="p-16 d-flex anaysis-top">
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
            <div class="anaysis-card mb-20">
                <div class="anaysis-card-top">项目</div>
                <div class="anaysis-card-bottom">
                    <div class="anaysis-card-item  anaysis-card-item-hover" v-for="item in webItems" :key="item.id">
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
            <div class="anaysis-card ">
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
                border-bottom: .0625rem solid var(--border-color);
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
                    border: 0;
                    border-radius: 0;
                    transition-duration: .15s;
                    transition-property: all;
                    transition-timing-function: cubic-bezier(.4, 0, .2, 1);

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
                        font-size: 14px;
                    }

                    .anaysis-block-bottom {
                        display: flex;
                        justify-content: space-between;
                        color: #00000073;
                        font-size: 14px;
                    }
                }

                .anaysis-card-item:nth-child(3n-1) {
                    border-left: .0625rem solid var(--border-color);
                    border-right: .0625rem solid var(--border-color);
                }

                .anaysis-card-item:nth-child(1),
                .anaysis-card-item:nth-child(2),
                .anaysis-card-item:nth-child(3) {
                    border-bottom: .0625rem solid var(--border-color);
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
    box-shadow: 0 0 transparent, 0 0 transparent, 0 20px 25px -5px rgba(0, 0, 0, .1), 0 8px 10px -6px rgba(0, 0, 0, .1);
}
</style>