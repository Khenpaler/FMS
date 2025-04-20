<template>
    <Head title="Personnels" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="container mx-auto px-4 py-6 space-y-6">
            <Tabs 
                :model-value="currentTab" 
                @update:model-value="handleTabChange"
                @view-history="handleViewHistory"
            />
            
            <Table
                :personnel-type="currentTab"
                :personnel="paginatedPersonnel"
                v-model="search"
                @edit="handleEdit"
                @remove="handleRemove"
                @view="handleView"
                @add-new="handleAddNew"
            />

            <TablePagination
                v-model:page="currentPage"
                v-model:items-per-page="itemsPerPage"
                :total-items="filteredPersonnel.length"
                :current-items="paginatedPersonnel.length"
            />
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import Table from './components/Table.vue';
import Tabs from './components/Tabs.vue';
import { TablePagination } from '@/components/ui/data-table';
import type { BreadcrumbItem } from '@/types';

interface Personnel {
    id: number;
    name: string;
    birthday: string;
    age: number;
    licenseNumber: string;
    address: string;
    phoneNumber: string;
    contactPerson: string;
    type: 'drivers' | 'pao' | 'dispatchers';
}

interface Props {
    type?: string;
    search?: string;
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personnels',
        href: '/personnel',
    },
];

const currentTab = ref('drivers');
const search = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Sample data
const personnel = ref<Personnel[]>([
    {
        id: 5,
        name: 'John Driver1',
        birthday: '1990-05-10',
        age: 34,
        licenseNumber: 'D123456789',
        address: '123 Driver Street',
        phoneNumber: '09123456789',
        contactPerson: 'Jane Doe',
        type: 'drivers'
    },
    {
        id: 6,
        name: 'Mary PAO',
        birthday: '1992-07-22',
        age: 32,
        licenseNumber: 'P987654321',
        address: '456 PAO Avenue',
        phoneNumber: '09123456780',
        contactPerson: 'James Doe',
        type: 'pao'
    },
    {
        id: 7,
        name: 'Peter Dispatcher',
        birthday: '1985-06-10',
        age: 39,
        licenseNumber: 'D112233445',
        address: '789 Dispatcher Lane',
        phoneNumber: '09123456781',
        contactPerson: 'Sara Doe',
        type: 'dispatchers'
    }
]);

const filteredPersonnel = computed(() => {
    return personnel.value
        .filter(person => person.type === currentTab.value)
        .filter(person => 
            search.value === '' ||
            person.name.toLowerCase().includes(search.value.toLowerCase()) ||
            person.licenseNumber.toLowerCase().includes(search.value.toLowerCase())
        );
});

const paginatedPersonnel = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredPersonnel.value.slice(start, end);
});

// Reset page when search or personnel type changes
watch([search, currentTab], () => {
    currentPage.value = 1;
});

const handleTabChange = (value: string) => {
    currentTab.value = value;
};

const handleSearch = (value: string) => {
    search.value = value;
};

const handleEdit = (person: Personnel) => {
    console.log('Edit person:', person);
};

const handleRemove = (person: Personnel) => {
    if (confirm('Are you sure you want to delete this personnel?')) {
        console.log('Remove person:', person);
    }
};

const handleView = (person: Personnel) => {
    console.log('View person:', person);
};

const handleAddNew = () => {
    console.log('Add new person');
};

const handleViewHistory = () => {
    console.log('View history');
};
</script>