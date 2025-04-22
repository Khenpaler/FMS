<template>
    <div class="w-full">
        <div class="flex items-center justify-between mb-4">
            <div class="w-1/3">
                <input
                    type="text"
                    placeholder="Find personnel..."
                    class="w-full px-4 py-2 border rounded-lg"
                    :value="modelValue"
                    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                />
            </div>
            <Button variant="default" class="ml-4 bg-green-600 hover:bg-green-700 text-white" @click="$emit('add-new')">
                <PlusIcon class="h-4 w-4 mr-2" />
                Add New
            </Button>
        </div>

        <Table>
            <TableCaption>List of Personnel</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead 
                        class="bg-blue-50 font-bold cursor-pointer hover:bg-blue-100 transition-colors"
                        @click="handleSort('last_name')"
                    >
                        <div class="flex items-center gap-2">
                            Name
                            <ArrowUpDown class="h-4 w-4" :class="{
                                'text-blue-600': sortField === 'last_name',
                                'rotate-180': sortField === 'last_name' && sortDirection === 'desc'
                            }" />
                        </div>
                    </TableHead>
                    <TableHead class="bg-blue-50 font-bold">ID</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Position</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Date of Birth</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Sex</TableHead>
                    <TableHead class="bg-blue-50 font-bold">License Number</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Address</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Contact Number</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Status</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="person in sortedPersonnel" :key="person.user_profile_id">
                    <TableCell>{{ `${person.last_name}, ${person.first_name} ${person.middle_initial || ''}` }}</TableCell>
                    <TableCell>{{ person.user_profile_id }}</TableCell>
                    <TableCell>{{ formatPosition(person.position) }}</TableCell>
                    <TableCell>{{ formatDate(person.date_of_birth) }}</TableCell>
                    <TableCell>{{ person.sex }}</TableCell>
                    <TableCell>{{ person.license_number }}</TableCell>
                    <TableCell>{{ person.address }}</TableCell>
                    <TableCell>{{ person.contact_number }}</TableCell>
                    <TableCell>
                        <Badge :class="getStatusColor(person.status)">
                            {{ formatStatus(person.status) }}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div class="flex space-x-2">
                            <Button variant="default" size="sm" class="bg-blue-500 hover:bg-blue-600 text-white" @click="() => {
                                console.log('Edit button clicked', person);
                                $emit('edit', person);
                            }">
                                <PencilIcon class="h-4 w-4 mr-1" />
                                Edit
                            </Button>
                            <Button variant="destructive" size="sm" class="bg-red-500 hover:bg-red-600" @click="$emit('remove', person)">
                                <TrashIcon class="h-4 w-4 mr-1" />
                                Remove
                            </Button>
                            <Button 
                                variant="default" 
                                size="sm" 
                                class="bg-purple-500 hover:bg-purple-600 text-white" 
                                @click="$emit('view', person)"
                            >
                                <EyeIcon class="h-4 w-4 mr-1" />
                                View Full Data
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, ArrowUpDown } from 'lucide-vue-next';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import type { Personnel, Position, Status } from '../types';

const props = defineProps<{
    personnel: Personnel[];
    modelValue: string;
}>();

defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'edit', person: Personnel): void;
    (e: 'remove', person: Personnel): void;
    (e: 'view', person: Personnel): void;
    (e: 'add-new'): void;
}>();

const sortField = ref<'last_name' | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');

const handleSort = (field: 'last_name') => {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortField.value = field;
        sortDirection.value = 'asc';
    }
};

const sortedPersonnel = computed(() => {
    if (!sortField.value) return props.personnel;

    return [...props.personnel].sort((a, b) => {
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

const formatPosition = (position: Position) => {
    return position.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};

const formatStatus = (status: Status) => {
    return status.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};

const getStatusColor = (status: Status) => {
    const colors = {
        'on_duty': 'bg-green-500 hover:bg-green-600',
        'off_duty': 'bg-yellow-500 hover:bg-yellow-600',
        'terminate': 'bg-red-500 hover:bg-red-600'
    };
    return `${colors[status]} text-white`;
};
</script>