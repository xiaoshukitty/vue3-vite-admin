<template>
    <div :class="['eyeDropper', layOutThemeStore.theme === 'dark' ? 'eyeDropper-theme' : '']">
        <div class="color-box">
            <div class="bg-img">
                <!-- <img ref="clorImg" :src="imgURL" :alt="imgURL"> -->
                <el-image :src="imgURL" lazy />
            </div>
            <div class="color-show">
                <el-input id="copyText" placeholder="展示取的颜色" v-model="iptColor" style="width: 200px;" disabled>
                    <template #append>
                        <div @click="copyText(iptColor)" style="cursor: pointer;">
                            复制
                        </div>
                    </template>
                </el-input>
                <el-button style="margin: 20px 0; width: 100px;" plain @click="handleColor">点击取色</el-button>
                <div class="box" :style="containerBox"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus'
import { useThemeStore } from '@/store/modules/theme';

const layOutThemeStore = useThemeStore();
const imgURL = ref('https://raw.githubusercontent.com/xiaoshukitty/img-folder/refs/heads/main/17.jpeg');
const iptColor = ref('');
const containerBox = computed(() => ({ backgroundColor: iptColor.value }));

//取色
const handleColor = async () => {
    if ('EyeDropper' in window) {
        try {
            const eyeDropper = new EyeDropper();
            const result = await eyeDropper.open();
            iptColor.value = result.sRGBHex; // 颜色结果以 sRGBHex 格式返回
        } catch (error) {
            console.error('选择颜色失败:', error);
        }
    } else {
        alert('你的浏览器不支持 EyeDropper API');
    }
}

//复制
const copyText = (val: string) => {
    const input = document.createElement('input');
    input.value = val;

    // 将输入框添加到页面，但不显示
    document.body.appendChild(input);
    input.select(); // 选择输入框的内容

    // 执行复制操作
    document.execCommand('copy');

    // 清除临时输入框
    document.body.removeChild(input);
    ElMessage({
        message: '复制成功',
        type: 'success',
        plain: true,
    })
}

</script>
<style scoped lang="scss">
.eyeDropper {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;

    .color-box {
        display: flex;

        .bg-img {
            width: 70%;

            img {
                width: 100%;
            }
        }

        .color-show {
            margin-left: 20px;
            display: flex;
            flex-direction: column;

            .box {
                box-sizing: border-box;
                width: 100px;
                height: 100px;
                border: 1px solid #ccc;
            }
        }

    }
}

.eyeDropper-theme {
    background-color: var(--background-theme-color) !important;
    border: .0625rem solid var(--border-theme-color) !important;
}
</style>