import { ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import type { BreadcrumbItem } from '@/types';
import type { Account } from './types';

// Props interface
export interface Props {
    accounts?: Account[];
    search?: string;
    pagination?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

interface AccountsManagementOptions {
    search?: string;
    pagination?: {
        current_page: number;
        per_page: number;
    };
}

export function useAccountsManagement(initialData: AccountsManagementOptions) {
    const search = ref(initialData.search || '');
    const currentPage = ref(initialData.pagination?.current_page || 1);
    const perPage = ref(initialData.pagination?.per_page || 10);

    // Add the breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Personnel Management',
            href: '/personnel-management',
        },
        {
            title: 'Accounts',
            href: '/personnel-management/accounts',
        },
    ];

    // Watch for changes in search and pagination
    watch(
        [search, currentPage, perPage],
        ([newSearch, newPage, newPerPage]: [string, number, number]) => {
            handleFiltersChange(newSearch, newPage, newPerPage);
        }
    );

    const handleFiltersChange = (newSearch: string, newPage: number, newPerPage: number) => {
        router.get(
            route('personnel-management.accounts.index'),
            {
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
        search,
        currentPage,
        perPage,
        breadcrumbs,
        handleFiltersChange,
    };
}
