<template>
    <div class="max-h-[85vh] overflow-y-auto px-2 sm:px-4">
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <!-- Profile Image Section -->
            <div class="w-full lg:w-auto lg:flex-shrink-0">
                <div class="relative">
                    <img 
                        :src="person.user_profile_image ? `/storage/${person.user_profile_image}` : '/path/to/default-avatar.png'" 
                        alt="Profile"
                        class="w-full lg:w-96 h-auto rounded-lg object-cover"
                    />
                    <Badge 
                        :class="getStatusColor(person.status)" 
                        class="absolute bottom-3 right-3 px-2 sm:px-3 py-1 text-sm sm:text-base"
                    >
                        {{ formatStatus(person.status) }}
                    </Badge>
                </div>
            </div>

            <!-- Information Sections -->
            <div class="flex-grow space-y-4 sm:space-y-6">
                <!-- Personal Information Section -->
                <div class="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-600">Personal Information</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                        <div class="col-span-1 sm:col-span-2">
                            <label class="text-xs font-medium text-gray-500">Full Name</label>
                            <p class="text-gray-900 text-base sm:text-lg font-medium">{{ `${person.last_name}, ${person.first_name} ${person.middle_initial || ''}` }}</p>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-gray-500">Date of Birth</label>
                            <p class="text-gray-900">{{ formatDate(person.date_of_birth) }}</p>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-gray-500">Sex</label>
                            <p class="text-gray-900">{{ person.sex }}</p>
                        </div>
                    </div>
                </div>

                <!-- Employment Information Section -->
                <div class="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-600">Employment Information</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                        <div>
                            <label class="text-xs font-medium text-gray-500">Position</label>
                            <p class="text-gray-900">{{ formatPosition(person.position) }}</p>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-gray-500">License Number</label>
                            <p class="text-gray-900">{{ person.license_number }}</p>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-gray-500">Date Hired</label>
                            <p class="text-gray-900">{{ formatDate(person.date_hired) }}</p>
                        </div>
                    </div>
                </div>

                <!-- Contact Information Section -->
                <div class="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-600">Contact Information</h3>
                    <div class="grid gap-3 sm:gap-4 text-sm">
                        <div>
                            <label class="text-xs font-medium text-gray-500">Address</label>
                            <p class="text-gray-900 break-words">{{ person.address }}</p>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label class="text-xs font-medium text-gray-500">Contact Number</label>
                                <p class="text-gray-900">{{ person.contact_number }}</p>
                            </div>
                            <div>
                                <label class="text-xs font-medium text-gray-500">Contact Person</label>
                                <p class="text-gray-900">{{ person.contact_person }}</p>
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-gray-500">Contact Person Number</label>
                            <p class="text-gray-900">{{ person.contact_person_number }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge';

import type { Personnel, Position, Status } from '../../types';

const props = defineProps<{
    person: Personnel;
}>();

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