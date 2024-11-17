<template>
    <div>
        <h1>储存 Hook</h1>
        <div>
            <h2>储存 Session：{{ sessionData }}</h2>
            <el-button type="primary" @click="handleStorage('session', 'set')">储存 Session</el-button>
            <el-button type="primary" @click="handleStorage('session', 'get')">获取 Session</el-button>
            <el-button type="primary" @click="handleStorage('session', 'update')">更新 Session</el-button>
            <el-button type="primary" @click="handleStorage('session', 'delete')">删除 Session</el-button>
        </div>
        <div style="height: 6.25rem;"></div>
        <div>
            <h2>储存 Local：{{ localData }}</h2>
            <el-button type="primary" @click="handleStorage('local', 'set')">储存 Local</el-button>
            <el-button type="primary" @click="handleStorage('local', 'get')">获取 Local</el-button>
            <el-button type="primary" @click="handleStorage('local', 'update')">更新 Local</el-button>
            <el-button type="primary" @click="handleStorage('local', 'delete')">删除 Local</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStorage } from '@/hooks/useStorage';
import { ref } from 'vue';

// 数据绑定
const sessionData = ref<string>('');
const localData = ref<string>('');

// 通用的存储操作函数
const handleStorage = (type: 'session' | 'local', action: 'set' | 'get' | 'update' | 'delete') => {
    const storageKey = type === 'session' ? 'token' : 'name';
    const storageValue = type === 'session' ? '123456789' : 'xiaoxiaoshu';
    const updateValue = type === 'session' ? 'tokentoken' : 'xiaohuan';

    const { value, updateStorage, removeStorage } = useStorage({
        storageKey,
        storageValue: action === 'set' ? storageValue : undefined,
        storageType: type,
    });

    switch (action) {
        case 'set':
            value.value = storageValue; // 设置存储值
            break;
        case 'get':
            if (type === 'session') sessionData.value = value.value;
            if (type === 'local') localData.value = value.value;
            break;
        case 'update':
            updateStorage(updateValue); // 更新存储值
            break;
        case 'delete':
            removeStorage(); // 删除存储值
            if (type === 'session') sessionData.value = '';
            if (type === 'local') localData.value = '';
            break;
    }
};
</script>
