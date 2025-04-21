<template>
    <PersonnelFormStepper
        ref="stepperRef"
        :position="position"
        :initial-data="initialData"
        @submit="handleSubmit"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import PersonnelFormStepper from './PersonnelFormStepper.vue';
import type { PersonnelFormData, Personnel, Position } from '../../types';

const emit = defineEmits<{
    (e: 'submit', form: ReturnType<typeof useForm<PersonnelFormData>>): void;
}>();

const props = defineProps<{
    position: Position;
    initialData?: Personnel;
}>();

const stepperRef = ref<{ submit: () => void } | null>(null);

const form = useForm<PersonnelFormData>({
    first_name: props.initialData?.first_name ?? '',
    last_name: props.initialData?.last_name ?? '',
    middle_initial: props.initialData?.middle_initial ?? '',
    license_number: props.initialData?.license_number ?? '',
    address: props.initialData?.address ?? '',
    date_of_birth: props.initialData?.date_of_birth ?? '',
    sex: props.initialData?.sex ?? 'Male',
    contact_number: props.initialData?.contact_number ?? '',
    contact_person: props.initialData?.contact_person ?? '',
    contact_person_number: props.initialData?.contact_person_number ?? '',
    user_profile_image: props.initialData?.user_profile_image ?? '',
    position: props.position,
    date_hired: props.initialData?.date_hired ?? new Date().toISOString().split('T')[0],
    status: 'off_duty',
});

const handleSubmit = (formData: PersonnelFormData) => {
    Object.assign(form, formData);
    emit('submit', form);
};

defineExpose({ submit: () => stepperRef.value?.submit() });
</script> 