<template>
    <Head title="Accounts" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="container mx-auto px-4 py-6 space-y-6">
            <!-- Table with built-in search -->
            <Table
                v-model="search"
                :accounts="accounts"
            />

            <TablePagination
                v-model:page="currentPage"
                v-model:items-per-page="perPage"
                :total-items="totalItems"
                :current-items="accounts.length"
            />
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { TablePagination } from '@/components/ui/data-table';
import Table from './components/Table.vue';
import { useAccountsManagement, type Props } from './useAccountsManagement';

const props = withDefaults(defineProps<Props>(), {
    accounts: () => [],
    search: '',
    pagination: () => ({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    })
});

const {
    search,
    currentPage,
    perPage,
    breadcrumbs,
    handleFiltersChange,
} = useAccountsManagement({
    search: props.search,
    pagination: props.pagination
});

const accounts = computed(() => props.accounts || []);
const totalItems = computed(() => props.pagination?.total || 0);
</script>