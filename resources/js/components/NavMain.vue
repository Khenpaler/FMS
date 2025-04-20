<script setup lang="ts">
import { ref, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import { ChevronDown } from 'lucide-vue-next';

defineProps<{
    items: NavItem[];
}>();

const page = usePage();

const isActive = (item: NavItem) => {
    if (item.href) {
        return page.url.startsWith(item.href);
    }
    if (item.children) {
        return item.children.some(child => child.href && page.url.startsWith(child.href));
    }
    return false;
};

const expandedItems = ref<Set<string>>(new Set());

const toggleCollapse = (itemTitle: string) => {
    if (expandedItems.value.has(itemTitle)) {
        expandedItems.value.delete(itemTitle);
    } else {
        expandedItems.value.add(itemTitle);
    }
};

const isExpanded = (itemTitle: string) => {
    return expandedItems.value.has(itemTitle);
};
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.title">
            <!-- Regular menu item -->
            <template v-if="!item.children">
                <SidebarMenuButton :as-child="true" :is-active="isActive(item)">
                    <Link v-if="item.href" :href="item.href" class="w-full">
                        <component :is="item.icon" class="h-4 w-4" />
                        {{ item.title }}
                    </Link>
                </SidebarMenuButton>
            </template>

            <!-- Dropdown menu item -->
            <template v-else>
                <SidebarMenuButton 
                    :as-child="true"
                    :is-active="isActive(item)"
                    @click="toggleCollapse(item.title)"
                >
                    <div class="w-full flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <component :is="item.icon" class="h-4 w-4" />
                            {{ item.title }}
                        </div>
                        <ChevronDown 
                            class="h-4 w-4 transition-transform" 
                            :class="{ 'rotate-180': isExpanded(item.title) }" 
                        />
                    </div>
                </SidebarMenuButton>

                <!-- Nested items -->
                <div v-show="isExpanded(item.title)" class="pl-6 mt-2 space-y-2">
                    <SidebarMenuButton 
                        v-for="child in item.children" 
                        :key="child.title"
                        :as-child="true"
                        :is-active="isActive(child)"
                    >
                        <Link v-if="child.href" :href="child.href" class="w-full">
                            <component :is="child.icon" class="h-4 w-4" />
                            {{ child.title }}
                        </Link>
                    </SidebarMenuButton>
                </div>
            </template>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
