<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { onMounted } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

onMounted(() => {
    setTimeout(() => {
        window.location.href = route('login');
    }, 3000);
});
</script>

<template>
    <Head title="Welcome">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div class="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] lg:p-8">
        <div class="text-center">
            <!-- Logo -->
            <div class="mb-8">
                <img
                    src="/logo.png"
                    alt="Logo"
                    class="w-[500px] h-auto mx-auto"
                />
            </div>

            <!-- Loading Animation -->
            <div class="flex justify-center items-center mt-8">
                <LoadingSpinner />
            </div>
        </div>
    </div>
</template>
