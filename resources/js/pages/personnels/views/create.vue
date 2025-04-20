<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="container mx-auto px-4 py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Personnel</CardTitle>
                    <CardDescription>Fill in the details to add a new personnel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <PersonnelForm 
                        @submit="handleSubmit"
                        :show-actions="true"
                        @cancel="router.get(route('personnel.index'))"
                    />
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import PersonnelForm from '../components/forms/PersonnelForm.vue';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personnels',
        href: route('personnel.index'),
    },
    {
        title: 'Add New Personnel',
        href: route('personnel.create'),
    },
];

const handleSubmit = (form: any) => {
    form.post(route('personnel.store'), {
        onSuccess: () => {
            router.get(route('personnel.index', { type: form.type }));
        },
    });
};
</script> 