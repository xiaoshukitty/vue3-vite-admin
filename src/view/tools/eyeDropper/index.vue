<template>
    <div :class="['eyeDropper', isDarkTheme ? 'eyeDropper-theme' : '']">
        <div class="color-box">
            <div class="bg-img">
                <el-image :src="imgURL" lazy />
            </div>
            <div class="color-show">
                <el-input id="copyText" placeholder="展示取的颜色" v-model="iptColor" style="width: 200px;" disabled>
                    <template #append>
                        <div @click="copyToClipboard(iptColor)" style="cursor: pointer;">
                            复制
                        </div>
                    </template>
                </el-input>
                <el-button class="color-picker-btn" @click="handleColorPicker">
                    点击取色
                </el-button>
                <div class="color-preview" :style="{ backgroundColor: iptColor }"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useThemeStore } from '@/store/modules/theme';

// 主题切换
const layOutThemeStore = useThemeStore();
const isDarkTheme = computed(() => layOutThemeStore.theme === 'dark');

// 图片 URL 和颜色数据
const imgURL = ref('https://raw.githubusercontent.com/xiaoshukitty/img-folder/refs/heads/main/17.jpeg');
const iptColor = ref('');

// 颜色拾取功能
const handleColorPicker = async () => {
    if ('EyeDropper' in window) {
        try {
            const eyeDropper = new EyeDropper();
            const result = await eyeDropper.open();
            iptColor.value = result.sRGBHex;
        } catch (error) {
            ElMessage.error('取色操作已取消或失败');
        }
    } else {
        ElMessage.warning('当前浏览器不支持 EyeDropper API');
    }
};

// 文本复制功能
const copyToClipboard = (val: string) => {
    if (!val) {
        ElMessage.warning('没有可复制的内容');
        return;
    }

    navigator.clipboard
        .writeText(val)
        .then(() => {
            ElMessage.success('复制成功');
        })
        .catch(() => {
            ElMessage.error('复制失败');
        });
};
</script>
<style scoped lang="scss">
.eyeDropper {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    .color-box {
        display: flex;

        .bg-img {
            flex: 2;
            padding-right: 1rem;

            img {
                width: 100%;
                border-radius: 0.5rem;
            }
        }

        .color-show {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .color-picker-btn {
                margin: 1rem 0;
                width: 100px;
            }

            .color-preview {
                width: 100px;
                height: 100px;
                border: 1px solid #ccc;
                border-radius: 0.5rem;
                margin-top: 1rem;
            }
        }
    }
}

.eyeDropper-theme {
    background-color: var(--background-theme-color) !important;
    border: 0.0625rem solid var(--border-theme-color) !important;
}
</style>
