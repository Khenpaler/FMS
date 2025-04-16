<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { Bus, Users, Wrench } from 'lucide-vue-next';
import GoogleMap from '@/components/GoogleMap.vue';
import BusDetailsPanel from '@/components/BusDetailsPanel.vue';
import { Card, CardContent } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// This would typically come from your backend
const stats = {
    busesInOperation: 6,
    busesInMaintenance: 0,
    currentEmployees: 3
};

const selectedBus = {
    id: '001',
    driver: 'Khen Paler',
    conductor: 'Juan Murillo',
    plateNumber: 'NOV-1232-123-12',
    status: 'Stationary'
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 p-4">
            <!-- Statistics Cards -->
            <div class="grid gap-4 md:grid-cols-3">
                <Card class="bg-white dark:bg-neutral-800">
                    <CardContent class="flex items-center p-6">
                        <div class="mr-4 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                            <Bus class="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold">{{ stats.busesInOperation }}</h3>
                            <p class="text-sm text-muted-foreground">Buses in Operation</p>
                        </div>
                    </CardContent>
                </Card>

                <Card class="bg-white dark:bg-neutral-800">
                    <CardContent class="flex items-center p-6">
                        <div class="mr-4 rounded-full bg-green-100 p-2 dark:bg-green-900">
                            <Wrench class="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold">{{ stats.busesInMaintenance }}</h3>
                            <p class="text-sm text-muted-foreground">Buses in Maintenance</p>
                        </div>
                    </CardContent>
                </Card>

                <Card class="bg-white dark:bg-neutral-800">
                    <CardContent class="flex items-center p-6">
                        <div class="mr-4 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                            <Users class="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold">{{ stats.currentEmployees }}</h3>
                            <p class="text-sm text-muted-foreground">Current Employees</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Map and Bus Details -->
            <div class="grid flex-1 gap-4 md:grid-cols-[1fr_350px]">
                <div class="relative h-full min-h-[400px] rounded-xl border border-border">
                    <GoogleMap :api-key="googleMapsApiKey" />
                </div>
                <BusDetailsPanel :bus="selectedBus" />
            </div>
        </div>
    </AppLayout>
</template>
