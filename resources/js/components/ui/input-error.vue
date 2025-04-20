<template>
    <p v-if="message" class="text-sm text-destructive mt-1">{{ message }}</p>
</template>

<script setup lang="ts">
defineProps<{
    message?: string;
}>();
</script> 