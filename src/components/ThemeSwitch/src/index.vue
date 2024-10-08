<template>
    <div class="theme-switch mr-8" :style="MoveRound ? 'border: 0.0625rem solid #c4bcbc;' : ''" @click="themeSwitch">
        <div :class="['theme-round', MoveRound ? 'move-round ' : '']"></div>
        <SvgIcon name="sun"></SvgIcon>
        <SvgIcon name="moon"></SvgIcon>
    </div>
</template>

<script setup lang='ts'>

import { defineEmits, defineProps } from 'vue'

defineProps({
    MoveRound: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:themeSwitch'])

const themeSwitch = (event: MouseEvent) => {
    emit('update:themeSwitch', event)
}
</script>
<style lang="scss" scoped>
.theme-switch {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    width: 3.125rem;
    height: 1.625rem;
    margin-left: auto;
    padding: 0 .375rem;
    border-radius: 1.875rem;
    background-color: #151515;
    cursor: pointer;

    .theme-round {
        position: absolute;
        z-index: 1;
        width: 1.125rem;
        height: 1.125rem;
        transition: transform .5s, background-color .5s;
        border-radius: 50%;
        background-color: #fff;
        will-change: transform;
    }

    .move-round {
        transform: translate(calc(100% + .125rem));
    }
}
</style>