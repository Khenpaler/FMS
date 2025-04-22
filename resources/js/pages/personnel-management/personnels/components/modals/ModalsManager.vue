<template>
    <Teleport to="body">
        <!-- Create Modal Suspense -->
        <Suspense>
            <template #default>
                <Modals
                    v-model:is-open="modals.create"
                    title="Add New Personnel"
                    description="Fill in the details to add a new personnel."
                    @save="() => formRef?.submit()"
                    save-text="Save Personnel"
                    width="w-[95vw] sm:w-[500px] lg:w-[600px]"
                    :show-header="true"
                    :show-footer="true"
                >
                    <PersonnelForm ref="formRef" :position="position" @submit="$emit('submit', $event)" />
                </Modals>
            </template>
            <template #fallback>
                <LoadingState />
            </template>
        </Suspense>

        <!-- Edit Modal Suspense -->
        <Suspense>
            <template #default>
                <Modals
                    v-model:is-open="modals.edit"
                    title="Edit Personnel"
                    description="Update the personnel details."
                    @save="() => editFormRef?.submit()"
                    save-text="Update Personnel"
                    width="w-[95vw] sm:w-[500px] lg:w-[600px]"
                    :show-header="true"
                    :show-footer="true"
                >
                    <PersonnelForm 
                        v-if="selectedPersonnel"
                        ref="editFormRef" 
                        :position="selectedPersonnel.position"
                        :initial-data="selectedPersonnel"
                        @submit="$emit('update', Number(selectedPersonnel.user_profile_id), $event)" 
                    />
                </Modals>
            </template>
            <template #fallback>
                <LoadingState />
            </template>
        </Suspense>

        <!-- View Modal Suspense -->
        <Suspense>
            <template #default>
                <Modals
                    v-model:is-open="modals.view"
                    title="Personnel Information"
                    description="Complete biodata of the personnel"
                    width="w-[95vw] sm:w-[95vw] lg:w-[1200px] xl:w-[1400px]"
                    height="h-[90vh]"
                    max-height="90vh"
                    :show-header="true"
                    :show-footer="true"
                >
                    <ViewModal 
                        v-if="selectedPersonnel"
                        :person="selectedPersonnel"
                    />
                    
                    <template #footer>
                        <Button variant="default" @click="closeModal('view')">Close</Button>
                    </template>
                </Modals>
            </template>
            <template #fallback>
                <LoadingState />
            </template>
        </Suspense>

        <!-- Add more modals here as needed -->
    </Teleport>
</template>

<script setup lang="ts">
import { reactive, defineAsyncComponent, defineComponent, ref } from 'vue';

import type { InertiaForm } from '@inertiajs/vue3';

import Modals from '@/components/reusables/modals.vue';
import { Button } from '@/components/ui/button';

import type { PersonnelFormData, Position, Personnel } from '../../types';

// Internal Loading Component
const LoadingState = defineComponent({
    name: 'LoadingState',
    template: `
        <div class="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div class="flex flex-col items-center gap-2">
                <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p class="text-muted-foreground text-sm">Loading...</p>
            </div>
        </div>
    `
});

// Lazy load components
const PersonnelForm = defineAsyncComponent(() => 
    import('../forms/PersonnelForm.vue')
        .catch(error => {
            console.error('Error loading PersonnelForm:', error);
            throw error;
        })
);
const ViewModal = defineAsyncComponent(() => 
    import('./ViewModal.vue')
        .catch(error => {
            console.error('Error loading ViewModal:', error);
            throw error;
        })
);
interface ModalState {
    create: boolean;
    edit: boolean;
    view: boolean;
}

const modals = reactive<ModalState>({
    create: false,
    edit: false,
    view: false
});

const formRef = ref<{ submit: () => void } | null>(null);
const editFormRef = ref<{ submit: () => void } | null>(null);
const selectedPersonnel = ref<Personnel | null>(null);

defineProps<{
    position: Position;
}>();

defineEmits<{
    (e: 'submit', form: InertiaForm<PersonnelFormData>): void;
    (e: 'update', id: number, form: InertiaForm<PersonnelFormData>): void;
}>();

// Expose methods to control modals
const openModal = (modalName: keyof ModalState, personnel?: Personnel) => {
    if ((modalName === 'edit' || modalName === 'view') && personnel) {
        selectedPersonnel.value = personnel;
    }
    modals[modalName] = true;
};

const closeModal = (modalName: keyof ModalState) => {
    if (modalName === 'edit' || modalName === 'view') {
        selectedPersonnel.value = null;
    }
    modals[modalName] = false;
};

defineExpose({
    openModal,
    closeModal
});
</script>
