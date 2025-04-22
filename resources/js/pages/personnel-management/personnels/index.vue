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
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { TablePagination } from '@/components/ui/data-table';
import Table from './components/Table.vue';
import Tabs from './components/Tabs.vue';
import ModalsManager from './components/modals/ModalsManager.vue';
import type { Personnel } from './types';
import { usePersonnelManagement, type Props } from './usePersonnelManagement';

const props = defineProps<Props>();

const {
    position,
    search,
    currentPage,
    perPage,
    breadcrumbs,
    modalsManagerRef,
    handleTabChange,
    handleDelete,
    handleViewHistory,
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
</script>