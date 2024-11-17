<template>
    <div :class="['stepForm', layOutThemeStore.theme === 'dark' ? 'stepForm-theme' : '']">
        <el-steps style="max-width: 600px" :active="active" align-center class="steps">
            <el-step title="第1步" description="填写转账信息" />
            <el-step title="第2步" description="确认转账信息" />
            <el-step title="第3步" description="完成" />
        </el-steps>
        <div class="form">
            <el-form v-if="active === 1 || active === 2" ref="ruleFormRef" style="max-width: 600px" :model="ruleForm"
                :rules="rules" label-width="auto" class="demo-ruleForm" :size="formSize">
                <el-form-item label="付款账户" :prop="active === 1 ? 'paymentAccount' : ''">
                    <el-input v-if="active === 1" v-model="ruleForm.paymentAccount" />
                    <div v-else>{{ ruleForm.paymentAccount }}</div>
                </el-form-item>
                <el-form-item label="收款账户" :prop="active === 1 ? 'collectionAccount' : ''">
                    <el-input v-if="active === 1" v-model="ruleForm.collectionAccount" />
                    <div v-else>{{ ruleForm.collectionAccount }}</div>
                </el-form-item>
                <el-form-item label="收款人姓名" :prop="active === 1 ? 'receivingName' : ''">
                    <el-input v-if="active === 1" v-model="ruleForm.receivingName" />
                    <div v-else>{{ ruleForm.receivingName }}</div>
                </el-form-item>
                <el-form-item label="转账金额" :prop="active === 1 ? 'transferAmount' : ''">
                    <el-input v-if="active === 1" v-model="ruleForm.transferAmount" />
                    <div style="font-weight: 600;" v-else>¥{{ ruleForm.transferAmount }}元</div>
                </el-form-item>
                <el-form-item v-if="active === 2" label="支付密码" prop="paymentPassword">
                    <el-input v-model="ruleForm.paymentPassword" />
                </el-form-item>
            </el-form>
            <div class="success-icon" v-if="active === 3" style="margin-bottom: 20px;">
                <el-result icon="success" title="支付成功">
                </el-result>
            </div>
        </div>
        <div class="introduce m20" v-if="active === 3">
            <div>
                <div class="mb20-color db">
                    <div class="tac">付款账户</div>
                    <div>****************</div>
                </div>
                <div class="mb20-color db">
                    <div class="tac">收款账户</div>
                    <div>****************</div>
                </div>
                <div class="mb20-color db">
                    <div class="tac">收款人姓名</div>
                    <div>****************</div>
                </div>
                <div class="mb20-color db">
                    <div class="tac">转账金额</div>
                    <div>￥{{ruleForm.transferAmount}}元</div>
                </div>
            </div>
        </div>
        <div class="form-btn">
            <el-button v-if="active === 1" type="primary" @click="next">下一步</el-button>
            <el-button v-if="active === 2" type="primary" @click="lastStep">上一步</el-button>
            <el-button v-if="active === 2" type="primary" :loading="loading" @click="submit">提交</el-button>
            <el-button v-if="active === 3" type="primary" @click="continueTransfer">再转一笔</el-button>
        </div>
        <div class="introduce" v-if="active === 1">
            <div>
                <div class="coarse mb20-color">转账到支付宝</div>
                <div class="mb20-color">生活好，支付宝。生活好，支付宝。生活好，支付宝。生活好，支付宝。</div>
                <div class="coarse mb20-color">转账到微信</div>
                <div class="mb20-color">微不可挡，万众一信。微不可挡，万众一信。微不可挡，万众一信。微不可挡，万众一信。</div>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { useThemeStore } from '@/store/modules/theme';
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'


const layOutThemeStore = useThemeStore();

interface RuleForm {
    paymentAccount: string
    collectionAccount: string
    receivingName: string
    transferAmount: string | number
    paymentPassword: string | number
}

const active = ref(1);
const loading = ref(false); //提交按钮loading
const formSize = ref<ComponentSize>('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
    paymentAccount: '**********',
    collectionAccount: '**********',
    receivingName: '***',
    transferAmount: '100',
    paymentPassword: '******'
});

const rules = reactive<FormRules<RuleForm>>({
    paymentAccount: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    collectionAccount: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    receivingName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    transferAmount: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    paymentPassword: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ]
});

// 下一步
const next = () => {
    if (active.value++ > 2) return
}

// 上一步
const lastStep = () => {
    if (active.value-- < 1) return
}

// 提交
const submit = () => {
    loading.value = true;
    setTimeout(() => {
        if (active.value++ > 2) return
    }, 1000)
}

// 再转一笔
const continueTransfer = () => {
    active.value = 1;
    loading.value = false;
}
</script>
<style scoped lang="scss">
.stepForm {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    height: 100%;
    padding: 1rem;

    .steps {
        margin: 20px auto 50px;
    }

    .form {
        .el-form {
            margin: 0 auto;
        }

        .success-icon {
            .el-result {
                padding: 0 !important;
            }
        }
    }

    .form-btn {
        text-align: center;
        margin: 20px 0;
    }

    .introduce {
        max-width: 600px;
        font-size: 12px;
        margin: 0 auto;
        padding: 20px;
        border: 0.0625rem solid var(--border-color);
        border-radius: .1875rem;
        background-color: rgba(0, 107, 230, 0.1490196078);

        .coarse {
            font-weight: 600;
            font-size: 14px;
        }


        .tac {
            width: 80px;
            font-size: 14px;
            text-align: right;
            margin-right: 20px;
        }

        .mb20-color {
            margin-bottom: 20px;
            color: #a8abb2;
        }

        .db {
            display: flex;
        }

    }
}

.stepForm-theme {
    background-color: var(--background-theme-color) !important;
    border: .0625rem solid var(--border-theme-color) !important;
}
</style>