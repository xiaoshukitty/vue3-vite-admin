<template>
    <div class="slider-container">
        <div class="slider-track" ref="track">
            <div class="slider-handle" :style="{ left: handleLeft + 'px' }" @mousedown="startDrag">
                <el-icon style="color:#32363999">
                    <component :is="verified ? 'Check' : 'DArrowRight'"></component>
                </el-icon>
            </div>
            <div :class="['slider-progress', verified ? 'verified-color' : '']" :style="{ width: handleLeft + 'px' }">{{
                verified ? $t('common.Verify') : '' }}</div>
            <div>
                <span> {{ $t('common.SliderVerified') }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
    name: 'SliderVerify',
    setup() {
        const handleLeft = ref(0); // 滑块的位置
        const track = ref<HTMLElement | null>(null);
        const verified = ref(false); // 验证状态
        let isDragging = false;
        let startX = 0;
        let maxLeft = 0;

        // 计算最大拖动距离
        onMounted(() => {
            if (track.value) {
                maxLeft = track.value.offsetWidth - 41; // 减去滑块宽度
            }
        });

        // 开始拖动
        const startDrag = (event: MouseEvent) => {
            if (verified.value) return;
            isDragging = true;
            startX = event.clientX;
            document.addEventListener('mousemove', onDragging);
            document.addEventListener('mouseup', stopDrag);
        };

        // 正在拖动
        const onDragging = (event: MouseEvent) => {
            if (!isDragging) return;
            const deltaX = event.clientX - startX;
            handleLeft.value = Math.min(Math.max(0, deltaX), maxLeft);
        };

        // 停止拖动
        const stopDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            document.removeEventListener('mousemove', onDragging);
            document.removeEventListener('mouseup', stopDrag);

            // 判断是否拖动到最右侧
            if (handleLeft.value >= maxLeft) {
                verified.value = true;
            } else {
                handleLeft.value = 0; // 重置位置
            }
        };

        onBeforeUnmount(() => {
            document.removeEventListener('mousemove', onDragging);
            document.removeEventListener('mouseup', stopDrag);
        });

        return {
            handleLeft,
            verified,
            startDrag,
            track,
        };
    },
});
</script>

<style scoped lang="scss">
.slider-container {
    width: 100%;

    .slider-track {
        position: relative;
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        background-color: #f1f3f6;
        border-radius: .25rem;
        box-sizing: border-box;
        border: .0625rem solid var(--border-color);
        overflow: hidden;

        .slider-handle {
            box-sizing: border-box;
            position: absolute;
            width: 40px;
            height: 38px;
            background-color: #fff;
            cursor: pointer;
            display: flex;
            align-items: center;
            border-radius: .25rem;
            justify-content: center;
            color: white;
            font-weight: bold;
            user-select: none;
            box-shadow: 0 0 transparent, 0 0 transparent, 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a;
        }

        .slider-progress {
            position: absolute;
            height: 100%;
            background-color: #57d188;
            border-radius: .25rem 0 0 .25rem;
        }

        .slider-text,
        .slider-success {
            text-align: center;
            margin-top: 10px;
            font-size: 16px;
        }

        .slider-success {
            color: #57d188;
            font-weight: bold;
        }

        .verified-color {
            color: #fff;
        }
    }
}
</style>