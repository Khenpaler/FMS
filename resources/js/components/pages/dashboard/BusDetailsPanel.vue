<script setup lang="ts">
interface BusDetails {
  id: string;
  driver: string;
  conductor: string;
  plateNumber: string;
  status: string;
}

defineProps<{
  bus: BusDetails;
}>();
</script>

<template>
  <div class="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
    <h2 class="text-red-600 text-xl font-semibold mb-6">Bus {{ bus.id }}</h2>
    
    <div class="space-y-4">
      <div>
        <h3 class="font-semibold">Driver:</h3>
        <p>{{ bus.driver }}</p>
      </div>
      
      <div>
        <h3 class="font-semibold">Conductor:</h3>
        <p>{{ bus.conductor }}</p>
      </div>
      
      <div>
        <h3 class="font-semibold">Plate Number:</h3>
        <p>{{ bus.plateNumber }}</p>
      </div>
      
      <div>
        <h3 class="font-semibold">Status:</h3>
        <p>{{ bus.status }}</p>
      </div>
    </div>
  </div>
</template> 