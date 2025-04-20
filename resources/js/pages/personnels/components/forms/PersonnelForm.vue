<template>
    <form @submit.prevent="$emit('submit', form)" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Name -->
            <div class="space-y-2">
                <Label for="name">Name</Label>
                <Input 
                    id="name"
                    v-model="form.name"
                    :error="form.errors.name"
                    placeholder="Enter full name"
                />
                <InputError :message="form.errors.name" />
            </div>

            <!-- Type -->
            <div class="space-y-2">
                <Label for="type">Type</Label>
                <Input 
                    id="type"
                    v-model="form.type"
                    :error="form.errors.type"
                    disabled
                    :value="typeDisplay"
                />
                <InputError :message="form.errors.type" />
            </div>

            <!-- Birthday -->
            <div class="space-y-2">
                <Label for="birthday">Birthday</Label>
                <Input 
                    id="birthday"
                    type="date"
                    v-model="form.birthday"
                    :error="form.errors.birthday"
                />
                <InputError :message="form.errors.birthday" />
            </div>

            <!-- License Number -->
            <div class="space-y-2">
                <Label for="license_number">License Number</Label>
                <Input 
                    id="license_number"
                    v-model="form.license_number"
                    :error="form.errors.license_number"
                    placeholder="Enter license number"
                />
                <InputError :message="form.errors.license_number" />
            </div>

            <!-- Phone Number -->
            <div class="space-y-2">
                <Label for="phone_number">Phone Number</Label>
                <Input 
                    id="phone_number"
                    v-model="form.phone_number"
                    :error="form.errors.phone_number"
                    placeholder="Enter phone number"
                />
                <InputError :message="form.errors.phone_number" />
            </div>

            <!-- Contact Person -->
            <div class="space-y-2">
                <Label for="contact_person">Contact Person</Label>
                <Input 
                    id="contact_person"
                    v-model="form.contact_person"
                    :error="form.errors.contact_person"
                    placeholder="Enter contact person"
                />
                <InputError :message="form.errors.contact_person" />
            </div>

            <!-- Address -->
            <div class="space-y-2 md:col-span-2">
                <Label for="address">Address</Label>
                <Textarea 
                    id="address"
                    v-model="form.address"
                    :error="form.errors.address"
                    placeholder="Enter complete address"
                />
                <InputError :message="form.errors.address" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

import { useForm } from '@inertiajs/vue3';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/ui/input-error.vue';

import type { PersonnelFormData } from '../../types';

const emit = defineEmits<{
    (e: 'submit', form: ReturnType<typeof useForm<PersonnelFormData>>): void;
}>();

const props = defineProps<{
    type: PersonnelFormData['type'];
}>();

const typeDisplay = computed(() => {
    switch (props.type) {
        case 'drivers':
            return 'Driver';
        case 'pao':
            return 'Passenger Assistant Officer';
        case 'dispatchers':
            return 'Dispatcher';
        default:
            return '';
    }
});

const form = useForm<PersonnelFormData>({
    name: '',
    type: props.type,
    birthday: '',
    license_number: '',
    address: '',
    phone_number: '',
    contact_person: '',
});

// Watch for type changes and update form
watch(() => props.type, (newType) => {
    form.type = newType;
}, { immediate: true });

const submit = () => {
    emit('submit', form);
};

defineExpose({ submit });
</script> 