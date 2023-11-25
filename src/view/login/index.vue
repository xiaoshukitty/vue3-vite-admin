<template>
    <div class="login_container">
        <el-row>
            <el-col :span="14" :xs="0"></el-col>
            <el-col :span="10" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
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
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item class="login_flex_space_between">
                        <el-checkbox v-model="checked" label="记住我" size="large" />
                        <div>忘记密码?</div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_btn" type="primary" @click="login" :loading="loading">登录</el-button>
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
import { ElNotification } from 'element-plus'
import { reactive, ref, computed } from 'vue';
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user';
import i18n from '@/lang'; // 引入i8n实例
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
//引入当前时间函数
import { getTime } from '@/utils/time'
let useStore = useUserStore();
//获取路由器
let $router = useRouter();
//获取 el-form组件
let loginForms = ref()

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
//定义变量控制按钮加载效果
let loading = ref(false)

// 登录按钮回调
const login = async () => {
    //保证全部表单验证通过才发请求
    await loginForms.value.validate();

    //开始加载效果:开始加载
    loading.value = true;

    //点击登录按钮
    // 通知 store/modules/user.ts 发登录请求
    // 请求成功->首页展示数据
    // 请求失败->弹出登录失败提示
    try {
        // await useStore.userLogin(loginForm);
        //编程式导航跳转到展示数据首页
        setTimeout(() => {
            loading.value = false;
            $router.push('/')
            ElNotification({
                type: "success",
                message: '登录成功',
                title: `Hi,${getTime()}好`
            })
        }, 2000)
    } catch (error) {
        //登录失败，加载效果消失
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}

//自定义校验规则函数(可以写正则)
const validateUserName = (rule: any, value: any, callback: any) => {
    // rule：即为校验规则对象
    // value：即为表单元素文本内容,
    // callback：如果符合条件 callback 放行通过，不符合条件 callback 方法，注入错误提示信息
    if (value.length >= 5) {
        callback();
    } else {
        callback(new Error('账号长度至少五位'))
    }
}
const validatePassWord = (rule: any, value: any, callback: any) => {
    // rule：即为校验规则对象
    // value：即为表单元素文本内容,
    // callback：如果符合条件 callback 放行通过，不符合条件 callback 方法，注入错误提示信息
    if (value.length >= 6) {
        callback();
    } else {
        callback(new Error('密码长度至少六位'))
    }
}

//定义表单校验需要配置对象
const rules = {
    /**
     * 规则对象属性
     * required：代表这个字段必须校验
     * min：文本长度最少多少位
     * max：文本长度最多多少位
     * message：错误的提示信息
     * trigger：触发校验表单的时机，change->文本发生变化触发校验，blur->失去焦点触发校验
     */
    username: [
        // { required: true, message: '用户名不能为空', trigger: 'blur' },
        // { min: 5, max: 10, message: '账号长度至少5位', trigger: 'blur' },
        //自定义校验规则
        { trigger: 'change', validator: validateUserName, }
    ],
    password: [
        // { required: true, message: '密码不能为空', trigger: 'change' },
        // { min: 6, max: 15, message: '密码长度至少5位', trigger: 'change' },
        //自定义校验规则
        { trigger: 'change', validator: validatePassWord, }
    ]
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