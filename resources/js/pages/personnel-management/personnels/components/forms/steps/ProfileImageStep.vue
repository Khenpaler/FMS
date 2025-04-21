<template>
    <div class="space-y-4">
        <!-- Profile Image -->
        <div class="space-y-2">
            <Label for="user_profile_image">Profile Image</Label>
            
            <!-- Image Preview -->
            <div v-if="modelValue.user_profile_image" class="mb-4">
                <img 
                    :src="modelValue.user_profile_image.startsWith('blob:') 
                        ? modelValue.user_profile_image 
                        : `/storage/${modelValue.user_profile_image}`"
                    alt="Profile Preview"
                    class="w-32 h-32 object-cover rounded-full border"
                />
            </div>
            
            <Input 
                id="user_profile_image"
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                :error="errors?.user_profile_image"
            />
            <InputError :message="errors?.user_profile_image" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/ui/input-error.vue';
import type { PersonnelFormData } from '../../../types';

const props = defineProps<{
    modelValue: PersonnelFormData;
    errors?: Record<string, string>;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: PersonnelFormData): void;
}>();

const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
        const file = input.files[0];
        const newValue = {
            ...props.modelValue,
            user_profile_image: URL.createObjectURL(file)
        };
        emit('update:modelValue', newValue);
    }
};
</script> 