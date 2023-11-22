<template>
    <div>
        <el-popover placement="bottom" :width="200" trigger="click">
            <div v-for="(item, index) in languageList" :key="index" @click="changeLangUage(item.langCode)"
                :class="langColor == item.langCode ? 'paint' : ''">{{ item.langName
                }}</div>
            <template #reference>
                <el-button class="m-2">中文</el-button>
            </template>
        </el-popover>
    </div>
</template>
  
<script setup lang="ts">
import { reactive,computed } from 'vue'
import i18n from '@/lang'; // 引入i8n实例
import { useI18n } from 'vue-i18n';
const languageList = reactive([
    {
        langCode: 'zh-CN',
        langName: '简体中文'
    },
    {
        langCode: 'en-US',
        langName: 'English',
    }
]);

const { locale } = useI18n();
//语言切换
const changeLangUage = (langType: string) => {
    console.log(langType);
    locale.value = langType; // 切换语言
    localStorage.setItem('LANG', langType); // 本地存储当前语言类型
}

const currentLang = computed(() => locale.value);
/**
 * 
 * // 第一种方法：获取i18n实例对象 t 的方法1
const { proxy } = getCurrentInstance();
const t1 = proxy.$t('Login');
console.log(t1);
// 第二种方法：获取i18n实例对象 t 的方法1
const t2 = i18n.global.t('Login');
console.log(t2);
// 第三种方法：获取i18n实例对象 t 的方法3
const { t } = useI18n() // 解构出t方法
const t3 = t('Login');
console.log(t3);
 * 
 */

</script>
  
<style scoped lang="scss"></style>