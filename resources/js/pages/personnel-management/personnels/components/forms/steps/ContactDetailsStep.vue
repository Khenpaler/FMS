<template>
    <div class="space-y-4">
        <!-- Contact Number -->
        <div class="space-y-2">
            <Label for="contact_number">Contact Number</Label>
            <Input 
                id="contact_number"
                v-model="modelValue.contact_number"
                :error="errors?.contact_number"
                placeholder="Enter contact number"
            />
            <InputError :message="errors?.contact_number" />
        </div>

        <!-- Contact Person -->
        <div class="space-y-2">
            <Label for="contact_person">Contact Person</Label>
            <Input 
                id="contact_person"
                v-model="modelValue.contact_person"
                :error="errors?.contact_person"
                placeholder="Enter contact person"
            />
            <InputError :message="errors?.contact_person" />
        </div>

        <!-- Contact Person Number -->
        <div class="space-y-2">
            <Label for="contact_person_number">Contact Person Number</Label>
            <Input 
                id="contact_person_number"
                v-model="modelValue.contact_person_number"
                :error="errors?.contact_person_number"
                placeholder="Enter contact person number"
            />
            <InputError :message="errors?.contact_person_number" />
        </div>

        <!-- Address -->
        <div class="space-y-2">
            <Label for="address">Address</Label>
            <Textarea 
                id="address"
                v-model="modelValue.address"
                :error="errors?.address"
                placeholder="Enter complete address"
            />
            <InputError :message="errors?.address" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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