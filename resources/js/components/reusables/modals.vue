<template>
    <Dialog :open="isOpen" @update:open="$emit('update:isOpen', $event)">
        <DialogOverlay class="fixed inset-0 bg-black/30" />
        <DialogContent
            :class="[
                'fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2',
                'z-50 grid gap-4 rounded-lg border p-4 sm:p-6 shadow-lg',
                'bg-background',
                'transition-opacity duration-200',
                'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
                height ? height : 'max-h-[85vh]',
                'overflow-y-auto',
                width ? width : 'sm:max-w-lg'
            ]"
            :style="{
                maxWidth: '95vw',
                maxHeight: maxHeight ? maxHeight : '85vh'
            }"
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
    DialogOverlay,
} from '@/components/ui/dialog';

defineProps<{
    isOpen: boolean;
    title?: string;
    description?: string;
    saveText?: string;
    width?: string;
    height?: string;
    maxHeight?: string;
    showHeader?: boolean;
    showFooter?: boolean;
    topPosition?: string;
}>();

defineEmits<{
    (e: 'update:isOpen', value: boolean): void;
    (e: 'save'): void;
}>();
</script> 