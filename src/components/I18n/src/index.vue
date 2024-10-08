<template>
    <el-popover placement="bottom" :width="100" trigger="click" :visible="visiblePopover">
        <template #reference>
            <SvgIcon class="c-p" name="lang" :color="'rgb(153, 153, 153)'" @click="visiblePopover = true"></SvgIcon>
        </template>
        <div class="language_select">
            <div v-for="(item, index) in languageList" :key="index" @click="changeLangUage(item.langCode)"
                :class="langColor == item.langCode ? 'paint' : ''">{{ item.langName
                }}</div>
        </div>
    </el-popover>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { reactive } from 'vue'
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
])
let langColor = localStorage.getItem('LANG') || ref('zh-CN');
let visiblePopover = ref(false);


const { locale } = useI18n();


//语言切换
const changeLangUage = (langType: string) => {
    langColor = langType;
    locale.value = langType; // 切换语言
    localStorage.setItem('LANG', langType); // 本地存储当前语言类型
    visiblePopover.value = false;
}

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
<style lang="scss" scoped>
.language_select {
    div {
        height: 2rem;
        line-height: 2rem;
        padding-left: .625rem;
        border-radius: .25rem;
        cursor: pointer;
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

:v-deep .el-popover {
    padding: 0 !important;
}
</style>