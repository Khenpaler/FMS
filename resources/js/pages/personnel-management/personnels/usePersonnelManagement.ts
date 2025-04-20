import { ref } from 'vue';

import { useForm, router } from '@inertiajs/vue3';

import { useToast } from 'vue-toastification';

import type { PersonnelFormData, Personnel, PersonnelType } from './types';

// Add interface for ModalsManager
interface ModalsManager {
    openModal: (modalName: 'create' | 'edit', personnel?: Personnel) => void;
    closeModal: (modalName: 'create' | 'edit') => void;
}

export function usePersonnelManagement(initialData: {
    type: PersonnelType;
    search?: string;
    pagination: {
        current_page: number;
        per_page: number;
    };
}) {
    const toast = useToast();
    const form = useForm<PersonnelFormData>({
        name: '',
        type: initialData.type,
        birthday: '',
        license_number: '',
        address: '',
        phone_number: '',
        contact_person: '',
        is_active: true,
    });

    const type = ref(initialData.type);
    const search = ref(initialData.search || '');
    const currentPage = ref(initialData.pagination.current_page);
    const perPage = ref(initialData.pagination.per_page);
    const modalsManager = ref<ModalsManager | null>(null);

    // Create
    const handleCreateSubmit = (submittedForm: ReturnType<typeof useForm<PersonnelFormData>>) => {
        // Ensure type is set correctly
        const formData = {
            ...submittedForm.data(),
            type: type.value
        };
        
        router.post(route('personnel-management.personnels.store'), formData, {
            onSuccess: () => {
                toast.success('Personnel created successfully');
                submittedForm.reset();
                submittedForm.clearErrors();
                modalsManager.value?.closeModal('create');
                // Refresh the page to show new data
                router.visit(route('personnel-management.personnels.index', { type: type.value }));
            },
            onError: (errors: Record<string, string>) => {
                toast.error('Failed to create personnel');
                console.error('Form errors:', errors);
                // Pass errors back to the form
                Object.keys(errors).forEach(key => {
                    submittedForm.setError(key, errors[key]);
                });
            }
        } as any);
    };

    // Update
    const handleUpdateSubmit = (id: number, submittedForm: ReturnType<typeof useForm<PersonnelFormData>>) => {
        const formData = {
            ...submittedForm.data(),
            type: type.value
        };

        router.put(route('personnel-management.personnels.update', id), formData, {
            onSuccess: () => {
                toast.success('Personnel updated successfully');
                submittedForm.reset();
                submittedForm.clearErrors();
                modalsManager.value?.closeModal('edit');
                router.visit(route('personnel-management.personnels.index', { type: type.value }));
            },
            onError: (errors: Record<string, string>) => {
                toast.error('Failed to update personnel');
                console.error('Form errors:', errors);
                Object.keys(errors).forEach(key => {
                    submittedForm.setError(key, errors[key]);
                });
            }
        } as any);
    };

    // Delete
    const handleDelete = (personnel: Personnel) => {
        if (confirm('Are you sure you want to delete this personnel?')) {
            router.delete(route('personnel-management.personnels.destroy', personnel.id), {
                onSuccess: () => {
                    toast.success('Personnel deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete personnel');
                }
            } as any);
        }
    };

    // Restore
    const handleRestore = (personnel: Personnel) => {
        router.post(route('personnel-management.personnels.restore', personnel.id), {
            onSuccess: () => {
                toast.success('Personnel restored successfully');
            },
            onError: () => {
                toast.error('Failed to delete personnel');
            }
        } as any);
    };

    // Toggle Active Status
    const handleToggleActive = (personnel: Personnel) => {
        router.post(route('personnel-management.personnels.toggle-active', personnel.id));
    };

    // Navigation
    const handleEdit = (personnel: Personnel) => {
        console.log('handleEdit called with:', personnel);
        console.log('modalsManager ref:', modalsManager.value);
        modalsManager.value?.openModal('edit', personnel);
    };

    const handleView = (personnel: Personnel) => {
        router.get(route('personnel-management.personnels.show', personnel.id));
    };

    // UI Controls
    const handleTabChange = (value: PersonnelType) => {
        type.value = value;
    };

    const handleAddNew = () => {
        form.reset();
        form.clearErrors();
        modalsManager.value?.openModal('create');
    };

    const handleViewHistory = () => {
        // Implement view history functionality
        console.log('View history');
    };

    const handleFiltersChange = (newSearch: string, newType: PersonnelType, newPage: number, newPerPage: number) => {
        router.get(
            route('personnel-management.personnels.index'),
            {
                type: newType,
                search: newSearch,
                page: newPage,
                per_page: newPerPage,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return {
        form,
        type,
        search,
        currentPage,
        perPage,
        modalsManager,
        // Create
        handleCreateSubmit,
        // Update
        handleUpdateSubmit,
        // Delete
        handleDelete,
        // Restore
        handleRestore,
        // Toggle Active
        handleToggleActive,
        // Navigation
        handleEdit,
        handleView,
        // UI Controls
        handleTabChange,
        handleAddNew,
        handleViewHistory,
        handleFiltersChange,
    };
}
