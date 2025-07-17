<script setup lang="ts">
import type { Publicacion } from '../types/Publicacion';
import PublicacionItem from './PublicacionItem.vue';

defineProps<{
  publicaciones: Publicacion[];
}>();

const emit = defineEmits<{
  (e: 'delete-publicacion', id: number): void;
}>();
</script>

<template>
  <div class="publicacion-list">
    <div v-if="publicaciones.length === 0" class="empty-message">
      No hay publicaciones aún. ¡Sé el primero en compartir!
    </div>
    <PublicacionItem 
      v-for="publicacion in publicaciones" 
      :key="publicacion.id" 
      :publicacion="publicacion" 
      @delete="emit('delete-publicacion', publicacion.id)" 
    />
  </div>
</template>

<style scoped>
.publicacion-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.empty-message {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}
</style>