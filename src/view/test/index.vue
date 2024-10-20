<template>
    <div>
        <h1>储存hook</h1>
        <div>
            <h2>储存Session：{{ sessionStorage }}</h2>
            <el-button type="primary" @click="setSessionStorage">储存session</el-button>
            <el-button type="primary" @click="getSessionStorage">获取session</el-button>
            <el-button type="primary" @click="updateSessionStorage">更新session</el-button>
            <el-button type="primary" @click="delSessionStorage">删除session</el-button>
        </div>
        <div style="height: 6.25rem;"></div>
        <div>
            <h2>储存Local：{{ localStorage }}</h2>
            <el-button type="primary" @click="setLocalStorage">储存Local</el-button>
            <el-button type="primary" @click="getLocalStorage">获取Local</el-button>
            <el-button type="primary" @click="updateLocalStorage">更新Local</el-button>
            <el-button type="primary" @click="delLocalStorage">删除Local</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStorage } from '@/hooks/useStorage';
import { ref } from 'vue';

let sessionStorage = ref<string>('');
let localStorage = ref<string>('');
// const { setSessionStorage, getSessionStorage, updateSessionStorage, delSessionStorage } = useStorage();

/** 储存Session：  */

const setSessionStorage = () => {
    useStorage({ storageKey: 'token', storageValue: '123456789', storageType: 'session' });
}
const getSessionStorage = () => {
    const { value: newStorage } = useStorage({ storageKey: 'token', storageType: 'session' });
    sessionStorage.value = newStorage.value;
}
const updateSessionStorage = () => {
    const { updateStorage } = useStorage({ storageKey: 'token', storageType: 'session' });
    updateStorage('tokentoken');
}
const delSessionStorage = () => {
    const { removeStorage } = useStorage({ storageKey: 'token', storageType: 'session' });
    removeStorage();
}


/** 储存Local：   */

const setLocalStorage = () => {
    useStorage({ storageKey: 'name', storageValue: 'xiaoxiaoshu', storageType: 'local' });
}
const getLocalStorage = () => {
    const { value: newStorage } = useStorage({ storageKey: 'name', storageType: 'local' });
    localStorage.value = newStorage.value;
}
const updateLocalStorage = () => {
    const { updateStorage } = useStorage({ storageKey: 'name', storageType: 'local' });
    updateStorage('xiaohuan');
}
const delLocalStorage = () => {
    const { removeStorage } = useStorage({ storageKey: 'name', storageType: 'local' });
    removeStorage();
}

</script>
