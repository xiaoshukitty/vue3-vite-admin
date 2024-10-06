<template>
    <el-drawer v-model="openDrawer" :direction="direction"  close-on-click-modal  @close="closeDrawer" :size="drawerWidth">
        <template #header>
            <h4>set title by slot</h4>
        </template>
        <template #default>
            <p>set content by slot</p>
        </template>
    </el-drawer>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import type { DrawerProps } from 'element-plus'

const direction = ref<DrawerProps['direction']>('rtl')
const openDrawer = ref(false);
const drawerWidth = ref('25%')
const props = defineProps({
    isDrawer: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['close'])


watch(() => props.isDrawer, (val: boolean) => {
    openDrawer.value = val;

}, { immediate: true })


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