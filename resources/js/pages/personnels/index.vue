<template>
    <Head title="Personnels" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="container mx-auto px-4 py-6 space-y-6">
            <Tabs 
                :model-value="type" 
                @update:model-value="handleTabChange"
                @view-history="handleViewHistory"
            />
            
            <Table
                :personnel="personnel"
                v-model="search"
                @edit="handleEdit"
                @remove="handleDelete"
                @view="handleView"
                @add-new="handleAddNew"
            />

            <TablePagination
                v-model:page="currentPage"
                v-model:items-per-page="perPage"
                :total-items="pagination.total"
                :current-items="personnel.length"
            />

            <ModalsManager 
                ref="modalsManager" 
                :type="type" 
                @submit="handleCreateSubmit"
                @update="handleUpdateSubmit"
            />
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Head } from '@inertiajs/vue3';

import AppLayout from '@/layouts/AppLayout.vue';

import { TablePagination } from '@/components/ui/data-table';

import Table from './components/Table.vue';
import Tabs from './components/Tabs.vue';
import ModalsManager from './components/modals/ModalsManager.vue';

import type { BreadcrumbItem } from '@/types';
import type { Personnel, PersonnelType } from './types';

import { usePersonnelManagement } from './usePersonnelManagement';

// Add type for ModalsManager
type ModalsManagerType = InstanceType<typeof ModalsManager>;

interface Props {
    personnel: Personnel[];
    type: PersonnelType;
    search?: string;
    filters: {
        search?: string;
        type: PersonnelType;
        only_active: boolean;
    };
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personnels',
        href: '/personnel',
    },
];

const {
    type,
    search,
    currentPage,
    perPage,
    modalsManager,
    handleTabChange,
    handleEdit,
    handleDelete,
    handleView,
    handleAddNew,
    handleViewHistory,
    handleFiltersChange,
    handleCreateSubmit,
    handleUpdateSubmit,
} = usePersonnelManagement({
    type: props.type,
    search: props.search,
    pagination: {
        current_page: props.pagination.current_page,
        per_page: props.pagination.per_page,
    },
});

// Watch for changes in filters and pagination
watch(
    [search, type, currentPage, perPage],
    ([newSearch, newType, newPage, newPerPage]) => {
        handleFiltersChange(newSearch, newType, newPage, newPerPage);
    }
);
</script>