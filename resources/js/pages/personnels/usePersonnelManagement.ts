import { ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import type { PersonnelFormData, Personnel, PersonnelType } from './types';

export function usePersonnelManagement(initialData: {
    type: PersonnelType;
    search?: string;
    pagination: {
        current_page: number;
        per_page: number;
    };
}) {
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
    const modalsManager = ref();

    // Create
    const handleCreateSubmit = () => {
        form.post(route('personnel.store'), {
            onSuccess: () => {
                form.reset();
                form.clearErrors();
                modalsManager.value?.closeModal('create');
            },
        });
    };

    // Update
    const handleUpdateSubmit = (id: number) => {
        form.put(route('personnel.update', id), {
            onSuccess: () => {
                form.reset();
                form.clearErrors();
                router.visit(route('personnel.index', { type: form.type }));
            },
        });
    };

    // Delete
    const handleDelete = (personnel: Personnel) => {
        if (confirm('Are you sure you want to delete this personnel?')) {
            router.delete(route('personnel.destroy', personnel.id));
        }
    };

    // Restore
    const handleRestore = (personnel: Personnel) => {
        router.post(route('personnel.restore', personnel.id));
    };

    // Toggle Active Status
    const handleToggleActive = (personnel: Personnel) => {
        router.post(route('personnel.toggle-active', personnel.id));
    };

    // Navigation
    const handleEdit = (personnel: Personnel) => {
        router.get(route('personnel.edit', personnel.id));
    };

    const handleView = (personnel: Personnel) => {
        router.get(route('personnel.show', personnel.id));
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
            route('personnel.index'),
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
