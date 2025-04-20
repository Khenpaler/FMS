import { ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import type { PersonnelFormData, Personnel } from './types';

export function usePersonnelManagement(initialData: {
    type: string;
    search?: string;
    pagination: {
        current_page: number;
        per_page: number;
    };
}) {
    const form = useForm<PersonnelFormData>({
        name: '',
        type: '',
        birthday: '',
        license_number: '',
        address: '',
        phone_number: '',
        contact_person: '',
    });

    const type = ref(initialData.type);
    const search = ref(initialData.search || '');
    const currentPage = ref(initialData.pagination.current_page);
    const perPage = ref(initialData.pagination.per_page);
    const modalsManager = ref();

    const handleCreateSubmit = () => {
        form.post(route('personnel.store'), {
            onSuccess: () => {
                form.reset();
                form.clearErrors();
                form.isDirty = false;
            },
        });
    };

    const handleTabChange = (value: string) => {
        type.value = value;
    };

    const handleEdit = (person: Personnel) => {
        router.get(route('personnel.edit', person.id));
    };

    const handleRemove = (person: Personnel) => {
        if (confirm('Are you sure you want to delete this personnel?')) {
            router.delete(route('personnel.destroy', person.id));
        }
    };

    const handleView = (person: Personnel) => {
        router.get(route('personnel.show', person.id));
    };

    const handleAddNew = () => {
        modalsManager.value?.openModal('create');
    };

    const handleViewHistory = () => {
        // Implement view history functionality
        console.log('View history');
    };

    const handleFiltersChange = (newSearch: string, newType: string, newPage: number, newPerPage: number) => {
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
        handleCreateSubmit,
        handleTabChange,
        handleEdit,
        handleRemove,
        handleView,
        handleAddNew,
        handleViewHistory,
        handleFiltersChange,
    };
}
