<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  apiKey: string;
}>();

const mapContainer = ref<HTMLElement | null>(null);
const map = ref<google.maps.Map | null>(null);
const mapType = ref<'roadmap' | 'satellite'>('roadmap');

const initMap = async () => {
  const loader = new Loader({
    apiKey: props.apiKey,
    version: 'weekly',
  });

  const google = await loader.load();
  
  if (mapContainer.value) {
    map.value = new google.maps.Map(mapContainer.value, {
      center: { lat: 8.4542, lng: 124.6319 }, // Cagayan de Oro coordinates
      zoom: 13,
      mapTypeId: mapType.value,
      mapTypeControl: false, // We'll use our own toggle
      zoomControl: true,
      streetViewControl: false,
      fullscreenControl: true,
    });
  }
};

const toggleMapType = () => {
  if (!map.value) return;
  
  mapType.value = mapType.value === 'roadmap' ? 'satellite' : 'roadmap';
  map.value.setMapTypeId(mapType.value);
};

onMounted(() => {
  initMap();
});
</script>

<template>
  <div class="relative h-full w-full rounded-xl overflow-hidden">
    <div class="absolute top-4 left-4 z-10 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
      <div class="flex">
        <button 
          class="px-4 py-2 text-sm font-medium rounded-l-lg"
          :class="mapType === 'roadmap' ? 'bg-primary text-white' : 'bg-white dark:bg-neutral-800'"
          @click="mapType === 'satellite' && toggleMapType()"
        >
          Map
        </button>
        <button 
          class="px-4 py-2 text-sm font-medium rounded-r-lg"
          :class="mapType === 'satellite' ? 'bg-primary text-white' : 'bg-white dark:bg-neutral-800'"
          @click="mapType === 'roadmap' && toggleMapType()"
        >
          Satellite
        </button>
      </div>
    </div>
    <div ref="mapContainer" class="h-full w-full"></div>
  </div>
</template> 