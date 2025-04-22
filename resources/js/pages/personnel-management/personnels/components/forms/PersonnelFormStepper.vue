<template>
    <div class="space-y-6">
        <!-- Steps indicator -->
        <div class="flex justify-between items-center mb-8 overflow-x-auto sm:overflow-visible px-2 sm:px-0">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center flex-shrink-0">
                <div :class="[
                    'w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-medium text-sm sm:text-base',
                    currentStep > index 
                        ? 'bg-primary text-primary-foreground' 
                        : currentStep === index 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                ]">
                    {{ index + 1 }}
                </div>
                <div v-if="index < steps.length - 1" class="w-12 sm:w-20 h-1 mx-1 sm:mx-2" :class="[
                    currentStep > index ? 'bg-primary' : 'bg-muted'
                ]"></div>
            </div>
        </div>

        <!-- Step title -->
        <div class="text-base sm:text-lg font-medium mb-4 px-2 sm:px-0">
            {{ steps[currentStep].title }}
        </div>

        <!-- Step content -->
        <div class="mb-6 px-2 sm:px-0">
            <component 
                :is="steps[currentStep].component" 
                v-model="formData"
                :position="position"
                :errors="errors"
            />
        </div>

        <!-- Navigation buttons -->
        <div class="flex justify-between px-2 sm:px-0">
            <Button 
                variant="outline" 
                @click="prevStep" 
                :disabled="currentStep === 0"
                class="text-sm sm:text-base"
            >
                Previous
            </Button>
            <Button 
                @click="nextStep"
                :disabled="currentStep === steps.length - 1"
                class="text-sm sm:text-base"
            >
                Next
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import PersonalInfoStep from './steps/PersonalInfoStep.vue';
import ContactDetailsStep from './steps/ContactDetailsStep.vue';
import EmploymentDetailsStep from './steps/EmploymentDetailsStep.vue';
import ProfileImageStep from './steps/ProfileImageStep.vue';
import type { PersonnelFormData, Position } from '../../types';

const props = defineProps<{
    position: Position;
    initialData?: PersonnelFormData;
    errors?: Record<string, string>;
}>();

const emit = defineEmits<{
    (e: 'submit', form: PersonnelFormData): void;
}>();

const currentStep = ref(0);
const formData = ref<PersonnelFormData>({
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

const steps = [
    { 
        title: 'Personal Information',
        component: PersonalInfoStep 
    },
    { 
        title: 'Contact Details',
        component: ContactDetailsStep 
    },
    { 
        title: 'Employment Details',
        component: EmploymentDetailsStep 
    },
    { 
        title: 'Profile Image',
        component: ProfileImageStep 
    }
];

const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
};

const submit = () => {
    emit('submit', formData.value);
};

defineExpose({ submit });
</script> 