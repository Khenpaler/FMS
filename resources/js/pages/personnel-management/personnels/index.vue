<template>
    <Head title="Personnels" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="container mx-auto px-4 py-6 space-y-6">
            <Tabs 
                :model-value="position" 
                @update:model-value="handleTabChange"
                @view-history="handleViewHistory"
            />
            
            <Table
                v-model="search"
                :personnel="props.personnel"
                @edit="(person) => modalsManagerRef?.openModal('edit', person)"
                @view="(person) => modalsManagerRef?.openModal('view', person)"
                @remove="handleDelete"
                @add-new="modalsManagerRef?.openModal('create')"
            />

            <TablePagination
                v-model:page="currentPage"
                v-model:items-per-page="perPage"
                :total-items="pagination.total"
                :current-items="personnel.length"
            />

            <ModalsManager
                ref="modalsManagerRef"
                :position="position"
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
import type { Personnel, Position } from './types';

import { usePersonnelManagement } from './usePersonnelManagement';

interface Props {
    personnel: Personnel[];
    position: Position;
    search?: string;
    filters: {
        search?: string;
        position: Position;
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
        title: 'Personnel Management',
        href: '/personnel-management',
    },
    {
        title: 'Personnel',
        href: '/personnel-management/personnels',
    },
];

const {
    position,
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
    position: props.position,
    search: props.search,
    pagination: {
        current_page: props.pagination.current_page,
        per_page: props.pagination.per_page,
    },
});

const modalsManagerRef = ref<{ openModal: (name: string, personnel?: Personnel) => void } | null>(null);

// Watch for changes in filters and pagination
watch(
    [search, position, currentPage, perPage],
    ([newSearch, newPosition, newPage, newPerPage]) => {
        handleFiltersChange(newSearch, newPosition, newPage, newPerPage);
    }
);
</script>