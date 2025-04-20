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
            <Button variant="default" class="ml-4" @click="$emit('add-new')">
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
                        <Badge :variant="person.is_active ? 'default' : 'destructive'">
                            {{ person.is_active ? 'Active' : 'Inactive' }}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div class="flex space-x-2">
                            <Button variant="default" size="sm" @click="$emit('edit', person)">
                                Edit
                            </Button>
                            <Button variant="destructive" size="sm" @click="$emit('remove', person)">
                                Remove
                            </Button>
                            <Button variant="default" size="sm" @click="$emit('view', person)">
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

interface Personnel {
    id: number;
    name: string;
    birthday: string;
    age: number;
    license_number: string;
    address: string;
    phone_number: string;
    contact_person: string;
    type: 'drivers' | 'pao' | 'dispatchers';
    is_active: boolean;
}

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