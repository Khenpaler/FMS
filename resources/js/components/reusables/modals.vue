<template>
    <Dialog :open="isOpen" @update:open="$emit('update:isOpen', $event)">
        <DialogContent
            :class="[
                'fixed left-[50%]',
                // Default to 40% for regular modals, 48% for larger ones
                topPosition || (width?.includes('1200px') || width?.includes('1400px') ? 'top-[48%]' : 'top-[40%]'),
                '-translate-x-1/2',
                topPosition ? '' : '-translate-y-1/2',
                'z-50 grid gap-4 rounded-lg border p-4 sm:p-6 shadow-lg',
                'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                'max-h-[90vh] overflow-y-auto',
                width ? width : 'sm:max-w-lg'
            ]"
        >
            <DialogHeader v-if="showHeader">
                <DialogTitle>{{ title }}</DialogTitle>
                <DialogDescription v-if="description">{{ description }}</DialogDescription>
            </DialogHeader>

            <slot />

            <DialogFooter v-if="showFooter">
                <slot name="footer">
                    <Button 
                        type="button" 
                        variant="outline" 
                        @click="$emit('update:isOpen', false)"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" @click="$emit('save')">
                        {{ saveText }}
                    </Button>
                </slot>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

defineProps<{
    isOpen: boolean;
    title?: string;
    description?: string;
    saveText?: string;
    width?: string;
    showHeader?: boolean;
    showFooter?: boolean;
    topPosition?: string;
}>();

defineEmits<{
    (e: 'update:isOpen', value: boolean): void;
    (e: 'save'): void;
}>();
</script> 