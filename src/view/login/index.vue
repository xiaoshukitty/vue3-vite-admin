<template>
    <div class="login">
        <div class="d-flex ai-center p-a top-16 right-16 btn-top">
            <Direction />
            <ThemeSwitch :MoveRound="MoveRound" @update:themeSwitch="themeSwitch"></ThemeSwitch>
            <I18n></I18n>
        </div>
        <div class="login-box">
            <div class="login-left">
                <div class="login-block2">1</div>
            </div>
            <div class="login-right d-flex j-center pt-64">
                <div class="login-block">
                    <h2 class="mr-10 text-36" :style="MoveRound ? 'color:#fff' : ''"> {{ $t('common.WelcomeBack') }}
                    </h2>
                    <div class="text-tips fs-14">{{ $t('common.LoginIntroduce') }}</div>
                    <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForms">
                        <el-form-item prop="authority">
                            <el-select v-model="loginForm.authority" placeholder="Select" style="width: 100%"
                                size="large">
                                <el-option v-for="item in userAuthorityEnum" :key="item.value" :label="item.label"
                                    :value="item.label" />
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="username">
                            <el-input :prefix-icon="User" v-model="loginForm.username" size="large"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password
                                size="large"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <SliderVerification ref="sliderVerification" />
                        </el-form-item>
                        <el-form-item class="login-select">
                            <el-checkbox v-model="checked" :label="$t('common.RememberMe')" size="large" />
                            <div>{{ $t('common.ForgotPassword') }}</div>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login_btn" type="primary" @click="login" :loading="loading"
                                size="default">{{ $t('common.Login') }}</el-button>
                        </el-form-item>
                        <el-form-item>
                            <div class="sign-in d-flex j-between">
                                <el-button plain size="default" style="width: 47%">{{ $t('common.PhoneLogin')
                                    }}</el-button>
                                <el-button plain size="default" style="width: 47%">{{ $t('common.ScanPayLogin')
                                    }}</el-button>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="other-login d-flex j-between ai-center">
                                <div class="other-line"></div>
                                <div>{{ $t('common.OtherLogin') }}</div>
                                <div class="other-line"></div>
                            </div>
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
import { userAuthorityEnum } from '@/data/enum/index';
import useUserStore from '@/store/modules/user'
import SliderVerification from './components/SliderVerification.vue';
import Direction from './components/Direction.vue';

let MoveRound = ref(false);
let checked = ref(false);
//定义变量控制按钮加载效果
let loading = ref(false);
//获取 el-form组件
let loginForms = ref();
//收集表单账号密码数据
let loginForm = reactive({ authority: 'Super', username: 'admin', password: '123456' });
let $route = useRoute();
//获取路由器
let $router = useRouter();
let layOutThemeStore = useThemeStore();
const authUserStore = useUserStore();
const sliderVerification = ref();

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
    if (!sliderVerification.value.verified) {
        ElNotification({
            type: 'error',
            message: '请先拖动滑块验证'
        })
        return
    }

    //开始加载效果:开始加载
    loading.value = true;

    //点击登录按钮
    // 通知 store/modules/user.ts 发登录请求
    // 请求成功->首页展示数据
    // 请求失败->弹出登录失败提示
    try {
        await authUserStore.userLogin({ username: loginForm.username, password: loginForm.password, authority: loginForm.authority })
        // await useStore.userLogin(loginForm);
        //编程式导航跳转到展示数据首页

        setTimeout(() => {
            loading.value = false;
            // 判断登录时候是否有 $route 参数
            let redirect: any = $route.query.redirect;
            $router.push({ path: redirect || '/overview' })
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

    .btn-top {
        padding: .5rem .75rem;
        border-radius: 1.5rem;
        background-color: #f4f4f5;
    }

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
            width: 62vw;
            min-height: 100vh;
            background: linear-gradient(154deg, #07070915 30%, #006be64d 48%, #07070915 64%);
            filter: blur(100px);
        }

        .login-right {
            min-height: 100vh;
            width: 38vw;
            text-align: center;
            overflow: hidden;
            box-sizing: border-box;
        }


        .login-block {
            display: inline-block;
            font-size: 1.125rem;
            animation: Animation 1s ease-in-out;
            animation-fill-mode: forwards;
            animation-delay: .1s;

            h2 {
                width: 26.875rem;
                font-size: 1.75rem;
                font-weight: 500;
                text-align-last: left;
            }

            .login-form {

                .login-select {
                    ::v-deep .el-form-item__content {
                        justify-content: space-between;
                    }

                    div {
                        color: #1677ff;
                        cursor: pointer;
                    }

                }

                .sign-in {
                    width: 100%;
                }

                .other-login {
                    width: 100%;

                    .other-line {
                        border-color: #e4e4e7;
                        width: 35%;
                        border-bottom-width: 1px;
                        background: #e4e4e7;
                        height: 1px;
                    }
                }
            }

            .login_btn {
                width: 100%;
            }

            .text-36 {
                font-size: 2.25rem;
                line-height: 2.25rem;
            }

            .text-tips {
                margin: .75rem 0 1.75rem 0;
                text-align-last: left;
                color: #71717a;
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