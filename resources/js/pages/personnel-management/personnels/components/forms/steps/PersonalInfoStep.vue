<template>
    <div class="space-y-4">
        <!-- Name Fields -->
        <div class="space-y-2">
            <Label for="last_name">Last Name</Label>
            <Input 
                id="last_name"
                v-model="modelValue.last_name"
                :error="errors?.last_name"
                placeholder="Enter last name"
            />
            <InputError :message="errors?.last_name" />
        </div>

        <div class="space-y-2">
            <Label for="first_name">First Name</Label>
            <Input 
                id="first_name"
                v-model="modelValue.first_name"
                :error="errors?.first_name"
                placeholder="Enter first name"
            />
            <InputError :message="errors?.first_name" />
        </div>

        <div class="space-y-2">
            <Label for="middle_initial">Middle Initial</Label>
            <Input 
                id="middle_initial"
                v-model="modelValue.middle_initial"
                :error="errors?.middle_initial"
                placeholder="M.I."
                maxlength="1"
            />
            <InputError :message="errors?.middle_initial" />
        </div>

        <!-- Date of Birth -->
        <div class="space-y-2">
            <Label for="date_of_birth">Date of Birth</Label>
            <div class="relative">
                <Input 
                    id="date_of_birth"
                    type="date"
                    v-model="modelValue.date_of_birth"
                    :error="errors?.date_of_birth"
                    class="[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
            </div>
            <InputError :message="errors?.date_of_birth" />
        </div>

        <!-- Sex -->
        <div class="space-y-2">
            <Label for="sex">Sex</Label>
            <Select>
                <SelectTrigger :value="modelValue.sex">
                    <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
            </Select>
            <InputError :message="errors?.sex" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue 
} from '@/components/ui/select';
import InputError from '@/components/ui/input-error.vue';
import type { PersonnelFormData } from '../../../types';

defineProps<{
    modelValue: PersonnelFormData;
    errors?: Record<string, string>;
}>();

defineEmits<{
    (e: 'update:modelValue', value: PersonnelFormData): void;
}>();
</script> 