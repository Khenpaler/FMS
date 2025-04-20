<template>
    <Suspense>
        <template #default>
            <!-- Create Personnel Modal -->
            <Modals
                v-model:is-open="modals.create"
                title="Add New Personnel"
                description="Fill in the details to add a new personnel."
                @save="() => {}"
                save-text="Save Personnel"
                width="w-[95vw] sm:w-[500px] lg:w-[600px]"
            >
                <PersonnelForm @submit="handleCreateSubmit" />
            </Modals>
        </template>

        <template #fallback>
            <LoadingState />
        </template>
    </Suspense>

    <!-- Add more modals here as needed -->
</template>

<script setup lang="ts">
import { reactive, defineAsyncComponent, defineComponent } from 'vue';
import Modals from '@/components/reusables/Modals.vue';

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
    import('./../forms/PersonnelForm.vue')
        .catch(error => {
            console.error('Error loading PersonnelForm:', error);
            throw error;
        })
);

interface ModalState {
    create: boolean;
    // Add more modal states here as needed
}

const modals = reactive<ModalState>({
    create: false
});

// Expose methods to control modals
const openModal = (modalName: keyof ModalState) => {
    modals[modalName] = true;
};

const closeModal = (modalName: keyof ModalState) => {
    modals[modalName] = false;
};

const handleCreateSubmit = (form: any) => {
    form.post(route('personnel.store'), {
        onSuccess: () => {
            form.reset();
            form.clearErrors();
            form.isDirty = false;
            closeModal('create');
        },
    });
};

defineExpose({
    openModal,
    closeModal
});
</script>
