<template>
    <div :class="['stepForm', layOutThemeStore.theme === 'dark' ? 'stepForm-theme' : '']">
        <el-steps style="max-width: 600px" :active="active" align-center class="steps">
            <el-step title="第1步" description="填写转账信息" />
            <el-step title="第2步" description="确认转账信息" />
            <el-step title="第3步" description="完成" />
        </el-steps>
        <div class="form">
            <el-form v-if="active !== 3" ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules"
                label-width="auto" class="demo-ruleForm" :size="formSize">
                <el-form-item v-for="field in fields" :key="field.prop" :label="field.label"
                    :prop="active === 1 ? field.prop : ''">
                    <template v-if="active === 1">
                        <el-input v-model="ruleForm[field.prop]" />
                    </template>
                    <template v-else>
                        <div v-if="field.prop !== 'paymentPassword'">{{ formatField(field.prop) }}</div>
                        <el-input v-else v-model="ruleForm.paymentPassword" />
                    </template>
                </el-form-item>
            </el-form>
            <div class="success-icon" v-if="active === 3">
                <el-result icon="success" title="支付成功" />
            </div>
        </div>

        <div class="introduce m20" v-if="active === 3">
            <div v-for="field in displayFields" :key="field.prop" class="mb20-color db">
                <div class="tac">{{ field.label }}</div>
                <div>{{ field.prop === 'transferAmount' ? `￥${ruleForm[field.prop]}元` : '****************' }}</div>
            </div>
        </div>

        <div class="form-btn">
            <el-button v-if="active === 1" type="primary" @click="next">下一步</el-button>
            <el-button v-if="active === 2" type="primary" @click="lastStep">上一步</el-button>
            <el-button v-if="active === 2" type="primary" :loading="loading" @click="submit">提交</el-button>
            <el-button v-if="active === 3" type="primary" @click="continueTransfer">再转一笔</el-button>
        </div>

        <div class="introduce" v-if="active === 1">
            <div v-for="intro in intros" :key="intro.title">
                <div class="coarse mb20-color">{{ intro.title }}</div>
                <div class="mb20-color">{{ intro.description }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/modules/theme';
import { reactive, ref } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus';

const layOutThemeStore = useThemeStore();

interface RuleForm {
    paymentAccount: string;
    collectionAccount: string;
    receivingName: string;
    transferAmount: string | number;
    paymentPassword: string | number;
}

const active = ref(1);
const loading = ref(false);
const formSize = ref<ComponentSize>('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
    paymentAccount: '**********',
    collectionAccount: '**********',
    receivingName: '***',
    transferAmount: '100',
    paymentPassword: '******',
});

const rules = reactive<FormRules<RuleForm>>({
    paymentAccount: [{ required: true, message: '请输入付款账户', trigger: 'blur' }],
    collectionAccount: [{ required: true, message: '请输入收款账户', trigger: 'blur' }],
    receivingName: [{ required: true, message: '请输入收款人姓名', trigger: 'blur' }],
    transferAmount: [{ required: true, message: '请输入转账金额', trigger: 'blur' }],
    paymentPassword: [{ required: true, message: '请输入支付密码', trigger: 'blur' }],
});

const fields = [
    { label: '付款账户', prop: 'paymentAccount' },
    { label: '收款账户', prop: 'collectionAccount' },
    { label: '收款人姓名', prop: 'receivingName' },
    { label: '转账金额', prop: 'transferAmount' },
    { label: '支付密码', prop: 'paymentPassword' },
];

const displayFields = fields.slice(0, 4);

const intros = [
    { title: '转账到支付宝', description: '生活好，支付宝。生活好，支付宝。生活好，支付宝。' },
    { title: '转账到微信', description: '微不可挡，万众一信。微不可挡，万众一信。微不可挡，万众一信。' },
];

const next = () => active.value < 3 && active.value++;
const lastStep = () => active.value > 1 && active.value--;
const submit = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        next();
    }, 1000);
};
const continueTransfer = () => (active.value = 1);

const formatField = (prop: keyof RuleForm) =>
    prop === 'transferAmount' ? `¥${ruleForm[prop]}元` : ruleForm[prop];
</script>

<style scoped lang="scss">
.stepForm {
    background: var(--background-common-color);
    border-radius: 0.8125rem;
    border: 0.0625rem solid var(--border-color);
    padding: 1rem;
    height: 100%;

    .form {
        .el-form {
            margin: auto;
        }

        .success-icon {
            .el-result {
                padding: 0 !important;
            }
        }
    }

    .steps {
        margin: 1.25rem auto 3.125rem;
    }

    .form-btn {
        text-align: center;
        margin: 1.25rem 0;
    }

    .introduce {
        max-width: 37.5rem;
        font-size: .75rem;
        margin: 1.25rem auto;
        padding: 1.25rem;
        border: 0.0625rem solid var(--border-color);
        border-radius: 0.1875rem;
        background-color: rgba(0, 107, 230, 0.15);

        .coarse {
            font-weight: 600;
            font-size: 14px;
        }

        .tac {
            width: 5rem;
            font-size: .875rem;
            text-align: right;
            margin-right: 1.25rem;
        }

        .mb20-color {
            margin-bottom: 1.25rem;
            color: #a8abb2;
        }

        .db {
            display: flex;
        }
    }

    &-theme {
        background-color: var(--background-theme-color) !important;
        border: 0.0625rem solid var(--border-theme-color) !important;
    }
}
</style>
