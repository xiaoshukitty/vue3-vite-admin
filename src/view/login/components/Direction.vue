<template>
    <div class="direction">
        <el-popover placement="bottom" :width="100" trigger="click" :visible="visiblePopover">
            <template #reference>
                <el-button class="c-p" size="small" :icon="current" circle @click="visiblePopover = true" />
            </template>
            <div class="popover-icon">
                <div v-for="(item, index) in directionIcon" :key="index" @click="changeIcon(item)"
                    :class="current == item.icon ? 'paint' : ''">
                    <el-button class="c-p" size="small" :icon="item.icon" circle />
                    {{ item.name }}
                </div>
            </div>
        </el-popover>
    </div>
</template>

<script setup lang='ts'>

import { ref, reactive, defineEmits } from 'vue'

let current = ref('Notebook');// 展示
let visiblePopover = ref(false);

const emits = defineEmits(['emitIcon']);
const directionIcon = reactive([
    {
        icon: 'Memo',
        name: '居左'
    },
    {
        icon: 'Tickets',
        name: '居中'
    },
    {
        icon: 'Notebook',
        name: '居右'
    },
])


const changeIcon = (e) => {
    let { icon, name } = e;
    current.value = icon;
    visiblePopover.value = false;
    emits('emitIcon', icon);
}
</script>
<style scoped lang="scss">
.direction {
    display: flex;
    align-items: center;
    padding-right: .375rem;
}

.popover-icon {
    div {
        height: 2rem;
        line-height: 2rem;
        padding-left: .625rem;
        border-radius: .25rem;
        cursor: pointer;
        margin-bottom: .25rem;
    }

    div:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }

    color: rgba(0, 0, 0, 0.88);

    .paint {
        color: #1677ff;
        background-color: #e6f4ff;
    }

    .paint:hover {
        background-color: #bae0ff !important;
    }

}
</style>