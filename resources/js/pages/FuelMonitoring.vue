<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div>
            <h1>Fuel Monitoring</h1>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fuel Monitoring',
        href: '/fuel-monitoring',
    },
];
</script>