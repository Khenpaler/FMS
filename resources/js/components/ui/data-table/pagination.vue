<template>
    <div class="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <p>Show</p>
            <Select
                v-model="selectedPageSize"
                class="w-[70px]"
                @update:modelValue="$emit('update:itemsPerPage', selectedPageSize)"
            >
                <SelectTrigger>
                    <SelectValue :placeholder="itemsPerPage" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem 
                        v-for="size in pageSizes" 
                        :key="size" 
                        :value="size"
                    >
                        {{ size }}
                    </SelectItem>
                </SelectContent>
            </Select>
            <p>entries</p>
        </div>

        <div class="flex items-center gap-4">
            <p class="text-sm text-muted-foreground whitespace-nowrap">
                Showing {{ currentItems }} of {{ totalItems }} entries
            </p>
            
            <Pagination v-if="totalPages > 0">
                <PaginationContent>
                    <PaginationFirst @click="$emit('update:page', 1)" :disabled="page === 1" />
                    <PaginationPrevious 
                        @click="$emit('update:page', page - 1)" 
                        :disabled="page === 1" 
                    />
                    
                    <PaginationItem 
                        v-for="pageNum in visiblePages" 
                        :key="pageNum"
                        :value="pageNum"
                        :isActive="page === pageNum"
                        @click="$emit('update:page', pageNum)"
                    >
                        {{ pageNum }}
                    </PaginationItem>

                    <PaginationNext 
                        @click="$emit('update:page', page + 1)" 
                        :disabled="page === totalPages" 
                    />
                    <PaginationLast 
                        @click="$emit('update:page', totalPages)" 
                        :disabled="page === totalPages" 
                    />
                </PaginationContent>
            </Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Pagination,
    PaginationContent,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    page: number;
    totalItems: number;
    currentItems: number;
    itemsPerPage: number;
}>();

const pageSizes = [5, 10, 20, 30, 40, 50];
const selectedPageSize = ref(props.itemsPerPage);

const totalPages = computed(() => 
    Math.ceil(props.totalItems / props.itemsPerPage)
);

const visiblePages = computed(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages.value <= maxVisiblePages) {
        for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i);
        }
    } else {
        let start = Math.max(1, props.page - Math.floor(maxVisiblePages / 2));
        let end = Math.min(totalPages.value, start + maxVisiblePages - 1);
        
        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
    }
    
    return pages;
});

// Reset selected page size when itemsPerPage prop changes
watch(() => props.itemsPerPage, (newValue) => {
    selectedPageSize.value = newValue;
});

defineEmits<{
    (e: 'update:page', value: number): void;
    (e: 'update:itemsPerPage', value: number): void;
}>();
</script>