<template>
    <Dialog :open="isOpen" @update:open="$emit('update:isOpen', $event)">
        <DialogContent
            :class="[
                'fixed left-[50%] top-[3%] -translate-x-1/2 translate-y-0',
                'z-50 grid w-[95vw] gap-4 rounded-lg border p-4 sm:p-6 shadow-lg',
                'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                width || 'sm:max-w-lg'
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
}>();

defineEmits<{
    (e: 'update:isOpen', value: boolean): void;
    (e: 'save'): void;
}>();
</script> 