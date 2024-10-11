<template>
    <div class="context-menu" v-if="visible" :style="{ left: position.x + 'px', top: position.y + 'px' }">
        <ul>
            <li class="d-flex ai-center" v-for="(item, index) in labelPages" :key="index" @click="triggerClick(item)">
                <el-icon class="mr-5">
                    <component :is="item.icon" />
                </el-icon>
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts'>
import { defineExpose, defineProps, ref, watch, onMounted } from 'vue';
import { fieldsListEnum } from '@/utils/method';

const props = defineProps(['routerType'])

interface IContextMenu {
    name: string,
    icon: string,
    label: string,
}

let position = ref({ x: 0, y: 0 });
let visible = ref(false);
let labelPages = ref<any>([]);


//监听传递过来的来判断返回什么数据
watch(() => props.routerType, (newVal: string) => {
    if (newVal) {
        labelPages.value = fieldsListEnum(newVal)
    }
}, {
    immediate: true
})

// 鼠标右键事件
const showMenu = (event: MouseEvent) => {
    event.preventDefault(); // 阻止默认右键菜单
    position.value = { x: event.clientX, y: event.clientY };
    visible.value = true;
}
//让父组件调用
defineExpose({
    showMenu
})

// 点击事件
const triggerClick = (item: IContextMenu) => {
    visible.value = false;
    console.log('item--', item);

}

const handleClickOutside = () => {
    // 如果点击发生在菜单组件外部，则关闭菜单
    window.addEventListener('click', () => {
        visible.value = false;
    })
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
})
</script>
<style lang="scss" scoped>
.context-menu {
    width: 10rem;
    position: absolute;
    background-color: #fff;
    border-radius: .3125rem;
    z-index: 1000;
}

.context-menu ul {
    list-style: none;
    padding: .3125rem;
    background-color: #FFF;
    border: 1px solid #EBEEF5;
    border-radius: .3125rem;
    box-shadow: 0 .125rem .75rem 0 rgba(0, 0, 0, .1);
}

.context-menu li {
    list-style: none;
    line-height: 1.875rem;
    padding-left: 10px;
    margin: 0;
    font-size: 14px;
    color: #000;
    cursor: pointer;
    outline: 0;
}

.context-menu li:hover {
    background-color: #f6f6f6;
    border-radius: .3125rem;
}
</style>