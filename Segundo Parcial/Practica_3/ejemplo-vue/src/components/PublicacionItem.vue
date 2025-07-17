<script setup lang="ts">
import type { Publicacion } from '../types/Publicacion';

defineProps<{
  publicacion: Publicacion;
}>();

const emit = defineEmits<{
  (e: 'delete', id: number): void;
}>();

const getTipoIcono = (tipo: string) => {
  switch(tipo) {
    case 'idea': return '💡';
    case 'queja': return '⚠️';
    case 'opinion': return '🗣️';
    default: return '';
  }
};
</script>

<template>
  <div class="publicacion-item" :class="'tipo-' + publicacion.tipo">
    <div class="publicacion-header">
      <span class="tipo-icono">{{ getTipoIcono(publicacion.tipo) }}</span>
      <h3>{{ publicacion.titulo }}</h3>
    </div>
    <p class="contenido">{{ publicacion.contenido }}</p>
    <div class="publicacion-footer">
      <span class="fecha">{{ publicacion.fecha }}</span>
      <button @click="emit('delete', publicacion.id)" class="delete-btn">Eliminar</button>
    </div>
  </div>
</template>

<style scoped>
.publicacion-item {
  border-left: 4px solid;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.publicacion-item.tipo-idea {
  border-left-color: #4caf50;
}

.publicacion-item.tipo-queja {
  border-left-color: #f44336;
}

.publicacion-item.tipo-opinion {
  border-left-color: #2196f3;
}

.publicacion-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tipo-icono {
  font-size: 1.5rem;
}

h3 {
  margin: 0;
  color: #333;
}

.contenido {
  margin: 0.5rem 0;
  color: #555;
  white-space: pre-line;
}

.publicacion-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #777;
}

.delete-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.delete-btn:hover {
  background-color: #cc0000;
}
</style>