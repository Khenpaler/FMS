<template>
    <Head title="Bus Profiles" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div>
            <h1>Bus Profiles</h1>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bus Profiles',
        href: '/bus-profiles',
    },
];
</script>