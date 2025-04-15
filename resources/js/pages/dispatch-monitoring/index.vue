<template>
    <Head title="Dispatch Monitoring" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div>
            <h1>Dispatch Monitoring</h1>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dispatch Monitoring',
        href: '/dispatch-monitoring',
    },
];
</script>