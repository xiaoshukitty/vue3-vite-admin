<template>
    <div class="login">
        <div>
            <DefSvgIcon name="Sunny"></DefSvgIcon>
        </div>
        <div class="login-box">
            <div class="login-left">
                <div class="login-block2">1</div>
            </div>
            <div class="login-right">
                <div class="login-block">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    min-height: 100vh;
    background-color: #ccc;

    .login-box {
        width: 100%;
        min-height: 100vh;
        display: flex;

        .login-left {
            width: 50vw;
            min-height: 100vh;
            background-color: #f00;
        }

        .login-right {
            min-height: 100vh;
            background-color: #0f0;
            width: 50vw;
            display: inline-block;
            text-align: center;
            overflow: hidden;
            box-sizing: border-box;
        }

        .login-block {
            width: 12.5rem;
            height: 12.5rem;
            background-color: #00f;
            margin: 12.5rem auto;
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

        .login-block {
            display: inline-block;
            color: #3379b7;
            font-size: 18px;
            animation: Animation 2s forwards;
        }

        .login-block:hover {
            animation-play-state: paused;
            cursor: pointer;
        }
    }
}
</style>