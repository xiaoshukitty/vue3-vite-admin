<template>
    <div class="login">
        <div class="d-flex ai-center p-a top-16 right-16">
            <ThemeSwitch :MoveRound="MoveRound" @update:themeSwitch="themeSwitch"></ThemeSwitch>
            <I18n></I18n>
        </div>
        <div class="login-box">
            <div class="login-left">
                <div class="login-block2">1</div>
            </div>
            <div class="login-right d-flex j-center ai-center">
                <div class="login-block">
                    <h2 class="mr-10" :style="MoveRound ? 'color:#fff' : ''"> {{ $t('common.Login') }}</h2>
                    <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForms">
                        <el-form-item prop="username">
                            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                                show-password></el-input>
                        </el-form-item>
                        <el-form-item class="login-select">
                            <el-checkbox v-model="checked" label="记住我" size="large" />
                            <div>忘记密码?</div>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login_btn" type="primary" @click="login" :loading="loading">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
//引入当前时间函数
import { getTime } from '@/utils/time';
import { useThemeStore } from '@/store/modules/theme';
//引入操作本地存储工具方法
import { SET_STORAGE, GET_STORAGE } from '@/utils/storage';

let MoveRound = ref(false);
let checked = ref(false);
//定义变量控制按钮加载效果
let loading = ref(false);
//获取 el-form组件
let loginForms = ref();
//收集表单账号密码数据
let loginForm = reactive({ username: 'admin', password: '123456' });
let $route = useRoute();
//获取路由器
let $router = useRouter();
let layOutThemeStore = useThemeStore();

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

//主题切换
//获取 html 根节点
let html = document.documentElement;
if (GET_STORAGE('THEME') == 'dark') {
    html.className = 'dark';
    MoveRound.value = true;
} else {
    html.className = '';
    MoveRound.value = false;
}

//主题切换
const themeSwitch = () => {
    MoveRound.value = !MoveRound.value;
    //判断标签是否有 dark
    if (MoveRound.value) {
        html.className = 'dark';
        layOutThemeStore.theme = 'dark'
        SET_STORAGE('THEME', 'dark');
    } else {
        html.className = '';
        layOutThemeStore.theme = 'light';
        SET_STORAGE('THEME', 'light');
    }
}

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
            // 判断登录时候是否有 $route 参数
            let redirect: any = $route.query.redirect;
            $router.push({ path: redirect || '/home' })
            ElNotification({
                type: "success",
                message: '登录成功',
                title: `Hi,${getTime()}好`
            })
        }, 1000)
    } catch (error) {
        //登录失败，加载效果消失
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}

</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    min-height: 100vh;

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

    .login-box {
        width: 100%;
        min-height: 100vh;
        display: flex;

        .login-left {
            width: 50vw;
            min-height: 100vh;
        }

        .login-right {
            min-height: 100vh;
            width: 50vw;
            text-align: center;
            overflow: hidden;
            box-sizing: border-box;
        }


        .login-block {
            display: inline-block;
            font-size: 1.125rem;
            animation: Animation 2s ease-in-out;
            animation-fill-mode: forwards;
            animation-delay: .1s;

            h2 {
                width: 26.875rem;
                font-size: 1.75rem;
                font-weight: 500;
                text-align-last: left;
            }

            .login-form {
                padding: 1rem;

                .login-select {
                    ::v-deep .el-form-item__content {
                        justify-content: space-between;
                    }

                    div {
                        color: #1677ff;
                        cursor: pointer;
                    }

                }
            }

            .login_btn {
                width: 100%;
            }
        }

        @keyframes Animation {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }

            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }

    }
}

</style>