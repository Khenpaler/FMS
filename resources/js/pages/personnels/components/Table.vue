<template>
    <div class="w-full">
        <div class="flex items-center justify-between mb-4">
            <div class="flex-1">
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
                    <TableHead class="bg-blue-50 font-bold">Name</TableHead>
                    <TableHead class="bg-blue-50 font-bold">ID</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Birthday</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Age</TableHead>
                    <TableHead class="bg-blue-50 font-bold">License Number</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Address</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Phone Number</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Contact Person</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Status</TableHead>
                    <TableHead class="bg-blue-50 font-bold">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="person in personnel" :key="person.id">
                    <TableCell>{{ person.name }}</TableCell>
                    <TableCell>{{ person.id }}</TableCell>
                    <TableCell>{{ formatDate(person.birthday) }}</TableCell>
                    <TableCell>{{ person.age }}</TableCell>
                    <TableCell>{{ person.license_number }}</TableCell>
                    <TableCell>{{ person.address }}</TableCell>
                    <TableCell>{{ person.phone_number }}</TableCell>
                    <TableCell>{{ person.contact_person }}</TableCell>
                    <TableCell>
                        <Badge :class="person.is_active ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'" class="text-white">
                            {{ person.is_active ? 'Active' : 'Inactive' }}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div class="flex space-x-2">
                            <Button variant="default" size="sm" class="bg-blue-500 hover:bg-blue-600 text-white" @click="$emit('edit', person)">
                                <PencilIcon class="h-4 w-4 mr-1" />
                                Edit
                            </Button>
                            <Button variant="destructive" size="sm" class="bg-red-500 hover:bg-red-600" @click="$emit('remove', person)">
                                <TrashIcon class="h-4 w-4 mr-1" />
                                Remove
                            </Button>
                            <Button variant="default" size="sm" class="bg-purple-500 hover:bg-purple-600 text-white" @click="$emit('view', person)">
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
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from 'lucide-vue-next';

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

import type { Personnel } from '../types';

defineProps<{
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

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
};
</script>