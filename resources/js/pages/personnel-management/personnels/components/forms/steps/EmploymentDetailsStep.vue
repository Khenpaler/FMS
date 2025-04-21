<template>
    <div class="space-y-4">
        <!-- Position -->
        <div class="space-y-2">
            <Label for="position">Position</Label>
            <Input 
                id="position"
                v-model="modelValue.position"
                :error="errors?.position"
                disabled
                :value="formatPosition(modelValue.position)"
            />
            <InputError :message="errors?.position" />
        </div>

        <!-- License Number -->
        <div class="space-y-2">
            <Label for="license_number">License Number</Label>
            <Input 
                id="license_number"
                v-model="modelValue.license_number"
                :error="errors?.license_number"
                placeholder="Enter license number"
            />
            <InputError :message="errors?.license_number" />
        </div>

        <!-- Date Hired -->
        <div class="space-y-2">
            <Label for="date_hired">Date Hired</Label>
            <div class="relative">
                <Input 
                    id="date_hired"
                    type="date"
                    v-model="modelValue.date_hired"
                    :error="errors?.date_hired"
                    class="[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
            </div>
            <InputError :message="errors?.date_hired" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/ui/input-error.vue';
import type { PersonnelFormData } from '../../../types';

defineProps<{
    modelValue: PersonnelFormData;
    errors?: Record<string, string>;
}>();

defineEmits<{
    (e: 'update:modelValue', value: PersonnelFormData): void;
}>();

const formatPosition = (position: string) => {
    return position.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};
</script> 