<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/vue3';
import { Bus, LayoutGrid, MessageCircle, Monitor, Users, Wrench, Fuel, Locate, UserCircle } from 'lucide-vue-next';
import AppLogo from './AppLogo.vue';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Personnel Management',
        icon: Users,
        children: [
            {
                title: 'Personnel',
                href: '/personnel-management/personnels',
                icon: Users,
            },
            {
                title: 'Accounts',
                href: '/personnel-management/accounts',
                icon: UserCircle,
            },
        ],
    },
    {
        title: 'Bus Profiles',
        href: '/bus-profile',
        icon: Bus,
    },
    {
        title: 'Devices',
        href: '/devices',
        icon: Locate,
    },
    {
        title: 'Maintenance',
        href: '/maintenance',
        icon: Wrench,
    },
    {
        title: 'Dispatch Monitoring',
        href: '/dispatch-monitoring',
        icon: Monitor,
    },
    {
        title: 'Fuel Monitoring',
        href: '/fuel-monitoring',
        icon: Fuel,
    },
    {
        title: 'Feedbacks',
        href: 'feedbacks',
        icon: MessageCircle,
    },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="route('dashboard')">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
