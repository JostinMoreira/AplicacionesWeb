<script setup lang="ts">
import { ref } from 'vue';
import type { Publicacion } from '../types/Publicacion';
import PublicacionForm from '../components/PublicacionForm.vue';
import PublicacionList from '../components/PublicacionList.vue';

const publicaciones = ref<Publicacion[]>([
  { 
    id: 1, 
    titulo: 'Nueva idea para el campus', 
    contenido: 'Propongo crear más áreas verdes...', 
    fecha: '2025-07-16', 
    usuarioId: 1, 
    tipo: 'idea' 
  }
]);

const addPublicacion = (publicacion: Omit<Publicacion, 'id'>) => {
  const newId = publicaciones.value.length > 0 ? Math.max(...publicaciones.value.map(p => p.id)) + 1 : 1;
  publicaciones.value.push({ id: newId, ...publicacion });
};

const deletePublicacion = (id: number) => {
  publicaciones.value = publicaciones.value.filter(p => p.id !== id);
};
</script>

<template>
  <div class="publicaciones-view">
    <h1>Publicaciones de Campus Voz</h1>
    <PublicacionForm @add-publicacion="addPublicacion" />
    <PublicacionList :publicaciones="publicaciones" @delete-publicacion="deletePublicacion" />
  </div>
</template>