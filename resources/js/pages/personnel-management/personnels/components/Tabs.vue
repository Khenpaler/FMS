<template>
    <div class="border-b">
        <nav class="flex items-center justify-between" aria-label="Personnel categories">
            <div class="flex space-x-4">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="$emit('update:model-value', tab.id)"
                    :class="[
                        'px-3 py-2 text-sm font-medium transition-colors',
                        modelValue === tab.id
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                    ]"
                >
                    {{ tab.name }}
                </button>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import type { Position } from '../types';
import { watch } from 'vue';

interface Tab {
    id: Position;
    name: string;
}

const tabs: Tab[] = [
    { id: 'driver', name: 'Driver' },
    { id: 'passenger_assistant_officer', name: 'Passenger Assistant Officer' },
    { id: 'dispatcher', name: 'Dispatcher' },
] as const;

const props = defineProps<{
    modelValue: Position;
}>();

defineEmits<{
    (e: 'update:model-value', value: Position): void;
}>();

// Watch for changes in the selected position
watch(
    () => props.modelValue,
    (newPosition, oldPosition) => {
        console.log(`Position changed from ${oldPosition} to ${newPosition}`);
        // You can add additional side effects here
    }
);
</script>