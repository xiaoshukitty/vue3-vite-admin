<template>
    <div class="not-found">
        <div class="error-code">404</div>
        <div class="error-message">Page Not Found</div>
        <div class="animation-container">
            <div class="planet"></div>
            <div class="astronaut">
                <!-- <img src="@/assets/astronaut.png" alt="Astronaut" /> -->
            </div>
        </div>
        <el-button type="primary" @click="goHome" class="back-home-btn">返回首页</el-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// Navigate back to home
const goHome = () => {
    router.push('/overview/analysis');
};
</script>

<style scoped lang="scss">
.not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    background: linear-gradient(135deg, #1e1e2f, #252547);
    color: white;

    .error-code {
        font-size: 8rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        animation: pulse 1.5s infinite;
    }

    .error-message {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: #cfcfcf;
    }

    .animation-container {
        position: relative;
        width: 250px;
        height: 250px;
        margin: 2rem auto;

        .planet {
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, #4a90e2, #2a5079);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: rotate 5s linear infinite;
        }

        .astronaut {
            position: absolute;
            top: 10%;
            left: 50%;
            transform: translate(-50%, 0);
            width: 100px;
            animation: float 3s ease-in-out infinite;

            img {
                width: 100%;
                height: auto;
            }
        }
    }

    .back-home-btn {
        margin-top: 2rem;
        font-size: 1rem;
        padding: 0.5rem 1.5rem;
    }
}

// Animations
@keyframes rotate {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes float {

    0%,
    100% {
        transform: translate(-50%, 0);
    }

    50% {
        transform: translate(-50%, -15px);
    }
}

@keyframes pulse {

    0%,
    100% {
        text-shadow: 0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3);
    }

    50% {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.7), 0 0 40px rgba(255, 255, 255, 0.5);
    }
}
</style>