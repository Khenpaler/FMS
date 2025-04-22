<template>
    <div class="w-full">
        <div class="flex items-center justify-between mb-4">
            <div class="w-1/3">
                <input
                    type="text"
                    placeholder="Find accounts..."
                    class="w-full px-4 py-2 border rounded-lg"
                    :value="modelValue"
                    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                />
            </div>
        </div>

        <Table>
            <TableCaption>List of Accounts</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead 
                        class="bg-blue-50 font-bold cursor-pointer hover:bg-blue-100 transition-colors"
                        @click="handleSort('name')"
                    >
                        <div class="flex items-center gap-2">
                            Name
                            <ArrowUpDown class="h-4 w-4" :class="{
                                'text-blue-600': sortField === 'name',
                                'rotate-180': sortField === 'name' && sortDirection === 'desc'
                            }" />
                        </div>
                    </TableHead>
                    <TableHead class="bg-blue-50 font-bold">ID</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Email</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Role</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Created At</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Email Verified</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="account in sortedAccounts" :key="account.id">
                    <TableCell>{{ account.name }}</TableCell>
                    <TableCell>{{ account.id }}</TableCell>
                    <TableCell>{{ account.email }}</TableCell>
                    <TableCell>{{ formatRole(account.role.name) }}</TableCell>
                    <TableCell>{{ formatDate(account.created_at) }}</TableCell>
                    <TableCell>
                        <Badge :class="account.email_verified_at ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'">
                            {{ account.email_verified_at ? 'Verified' : 'Not Verified' }}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div class="flex space-x-2">
                            <Button 
                                variant="default" 
                                size="sm" 
                                class="bg-yellow-500 hover:bg-yellow-600 text-white"
                                @click="$emit('toggle-active', account)"
                            >
                                <PowerIcon class="h-4 w-4 mr-1" />
                                {{ account.is_active ? 'Deactivate' : 'Activate' }}
                            </Button>
                            <Button 
                                variant="default" 
                                size="sm" 
                                class="bg-blue-500 hover:bg-blue-600 text-white"
                                @click="$emit('reset-limit', account)"
                            >
                                <RefreshCwIcon class="h-4 w-4 mr-1" />
                                Reset Limit
                            </Button>
                            <Button 
                                variant="default" 
                                size="sm" 
                                class="bg-purple-500 hover:bg-purple-600 text-white"
                                @click="$emit('reset-password', account)"
                            >
                                <KeyIcon class="h-4 w-4 mr-1" />
                                Reset Password
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
                <TableRow v-if="sortedAccounts.length === 0">
                    <TableCell colspan="7" class="text-center text-gray-500">
                        No accounts found
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowUpDown, PowerIcon, RefreshCwIcon, KeyIcon } from 'lucide-vue-next';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { Account } from '../types';

const props = defineProps<{
    accounts: Account[];
    modelValue: string;
}>();

defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'toggle-active', account: Account): void;
    (e: 'reset-limit', account: Account): void;
    (e: 'reset-password', account: Account): void;
}>();

const sortField = ref<'name' | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');

const handleSort = (field: 'name') => {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortField.value = field;
        sortDirection.value = 'asc';
    }
};

const sortedAccounts = computed(() => {
    if (!sortField.value) return props.accounts;

    return [...props.accounts].sort((a, b) => {
        const aValue = a[sortField.value!];
        const bValue = b[sortField.value!];

        if (sortDirection.value === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });
});

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
};

const formatRole = (role: string) => {
    return role.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};
</script>