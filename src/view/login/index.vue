<template>
    <div class="login_container">
        <el-row>
            <el-col :span="14" :xs="0"></el-col>
            <el-col :span="10" :xs="24">
                <el-form class="login_form">
                    <div>
                        {{ $t('Login') }}
                    </div>
                    <el-popover placement="bottom" :width="200" trigger="click">
                        <div v-for="(item, index) in languageList" :key="index" @click="changeLangUage(item.langCode)"
                            :class="langColor == item.langCode ? 'paint' : ''">{{ item.langName
                            }}</div>
                        <template #reference>
                            <el-button class="m-2">{{ currentLang }}</el-button>
                        </template>
                    </el-popover>
                    <h1>登录</h1>
                    <el-form-item>
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item class="login_flex_space_between">
                        <el-checkbox v-model="checked" label="记住我" size="large" />
                        <div>忘记密码?</div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_btn" type="primary" @click="login">登录</el-button>
                    </el-form-item>
                    <el-form-item class="login_flex_1">
                        <el-button plain>手机登录</el-button>
                        <el-button plain>扫码登录</el-button>
                        <el-button plain>注册</el-button>
                    </el-form-item>
                    <el-form-item class="login_flex_conter">
                        <div>其他登录方式</div>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
  
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref, getCurrentInstance, computed } from 'vue';
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user';
import i18n from '@/lang'; // 引入i8n实例
import { useI18n } from 'vue-i18n';
let useStore = useUserStore();

//收集表单账号密码数据
let loginForm = reactive({ username: 'admin', password: '123456' });
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
let checked = ref(false)


// 登录按钮回调
const login = () => {
    useStore.userLogin(loginForm);
}
const { locale } = useI18n();
//语言切换

const changeLangUage = (langType: string) => {
    console.log(langType);
    locale.value = langType; // 切换语言
    localStorage.setItem('LANG', langType); // 本地存储当前语言类型
}

const currentLang = computed(() => {
    return locale.value == 'en-US' ? 'English' : '简体中文'
});

</script>
  
<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/bg.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        // width: 80%;
        width: 540px;
        top: 20vh;
        background-color: rgba(255, 255, 255, 0.5);
        padding: 20px;

        .el-form-item {
            padding: 0 50px;
        }

        h1 {
            color: #000;
            font-size: 40px;
            padding: 5px 0 20px 0;
        }

        .login_btn {
            width: 100%;
        }

        .login_flex_space_between {
            ::v-deep .el-form-item__content {
                justify-content: space-between;
            }

            div {
                color: #1677ff;
                cursor: pointer;
            }

            ::v-deep .el-checkbox__label {
                color: #1677ff;
            }
        }

        .login_flex_1 {
            ::v-deep .el-button {
                flex: 1;
            }
        }

        .login_flex_conter {
            margin: 20px 0;
            font-weight: 700;

            ::v-deep .el-form-item__content {
                justify-content: center;
            }
        }
    }
}
</style>