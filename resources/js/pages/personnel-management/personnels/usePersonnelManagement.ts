import { ref, watch, onMounted } from 'vue';

import { useForm, router } from '@inertiajs/vue3';

import { useToast } from 'vue-toastification';

import type { BreadcrumbItem } from '@/types';
import type { PersonnelFormData, Personnel, Position } from './types';

// Props interface moved from index.vue
export interface Props {
    personnel: Personnel[];
    position: Position;
    search?: string;
    filters: {
        search?: string;
        position: Position;
        only_active: boolean;
    };
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

// Add interface for ModalsManager
interface ModalsManager {
    openModal: (modalName: 'create' | 'edit', personnel?: Personnel) => void;
    closeModal: (modalName: 'create' | 'edit') => void;
}

interface PersonnelManagementOptions {
    position: Position;
    search?: string;
    pagination: {
        current_page: number;
        per_page: number;
    };
}

export function usePersonnelManagement(initialData: PersonnelManagementOptions) {
    const toast = useToast();
    const form = useForm<PersonnelFormData>({
        first_name: '',
        last_name: '',
        middle_initial: '',
        license_number: '',
        address: '',
        date_of_birth: '',
        sex: 'Male',
        contact_number: '',
        contact_person: '',
        contact_person_number: '',
        user_profile_image: '',
        position: initialData.position || 'driver',
        date_hired: new Date().toISOString().split('T')[0],
        status: 'on_duty'
    });

    const position = ref(initialData.position || 'driver');
    const search = ref(initialData.search || '');
    const currentPage = ref(initialData.pagination.current_page);
    const perPage = ref(initialData.pagination.per_page);
    const modalsManager = ref<ModalsManager | null>(null);

    // Add the breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Personnel Management',
            href: '/personnel-management',
        },
        {
            title: 'Personnel',
            href: '/personnel-management/personnels',
        },
    ];

    // Add modalsManagerRef
    const modalsManagerRef = ref<{ openModal: (name: string, personnel?: Personnel) => void } | null>(null);

    // Setup function (replaces onMounted logic)
    const setup = () => {
        const initialPosition = initialData.position || 'driver';
        handleFiltersChange(
            initialData.search || '', 
            initialPosition, 
            initialData.pagination.current_page, 
            initialData.pagination.per_page
        );
    };

    // Watch setup (moved from component)
    watch(
        [search, position, currentPage, perPage],
        ([newSearch, newPosition, newPage, newPerPage]) => {
            handleFiltersChange(newSearch, newPosition, newPage, newPerPage);
        }
    );

    // Call setup on mount
    onMounted(setup);

    // Create
    const handleCreateSubmit = (submittedForm: ReturnType<typeof useForm<PersonnelFormData>>) => {
        const formData = new FormData();
        const data = submittedForm.data();
        
        // Append all form fields except user_profile_image to FormData
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'user_profile_image' && value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        // Handle file upload
        const fileInput = document.querySelector('#user_profile_image') as HTMLInputElement;
        if (fileInput?.files?.length) {
            formData.append('user_profile_image', fileInput.files[0]);
        }
        
        router.post(route('personnel-management.personnels.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Personnel created successfully');
                submittedForm.reset();
                submittedForm.clearErrors();
                modalsManager.value?.closeModal('create');
                router.visit(route('personnel-management.personnels.index', { position: position.value }));
            },
            onError: (errors: Record<string, string>) => {
                toast.error('Failed to create personnel');
                console.error('Form errors:', errors);
                Object.keys(errors).forEach(key => {
                    submittedForm.setError(key, errors[key]);
                });
            }
        });
    };

    // Update
    const handleUpdateSubmit = (id: number, submittedForm: ReturnType<typeof useForm<PersonnelFormData>>) => {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        const data = submittedForm.data();
        
        // Append all form fields except user_profile_image to FormData
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'user_profile_image' && value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        // Handle file upload if there's a new image
        const fileInput = document.querySelector('#user_profile_image') as HTMLInputElement;
        if (fileInput?.files?.length) {
            formData.append('user_profile_image', fileInput.files[0]);
        }

        router.post(route('personnel-management.personnels.update', id), formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Personnel updated successfully');
                submittedForm.reset();
                submittedForm.clearErrors();
                modalsManager.value?.closeModal('edit');
                router.visit(route('personnel-management.personnels.index', { position: position.value }));
            },
            onError: (errors: Record<string, string>) => {
                toast.error('Failed to update personnel');
                console.error('Form errors:', errors);
                Object.keys(errors).forEach(key => {
                    submittedForm.setError(key, errors[key]);
                });
            }
        });
    };

    // Delete
    const handleDelete = (personnel: Personnel) => {
        if (confirm('Are you sure you want to delete this personnel?')) {
            router.delete(route('personnel-management.personnels.destroy', personnel.user_profile_id), {
                onSuccess: () => {
                    toast.success('Personnel deleted successfully');
                    // Refresh the page to show updated list
                    router.visit(route('personnel-management.personnels.index', { position: position.value }));
                },
                onError: () => {
                    toast.error('Failed to delete personnel');
                }
            });
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
    const handleTabChange = (value: Position) => {
        position.value = value;
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

    const handleFiltersChange = (newSearch: string, newPosition: Position, newPage: number, newPerPage: number) => {
        router.get(
            route('personnel-management.personnels.index'),
            {
                position: newPosition,
                search: newSearch,
                page: newPage,
                per_page: newPerPage,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    return {
        form,
        position,
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
        breadcrumbs,
        modalsManagerRef,
        setup,
    };
}
