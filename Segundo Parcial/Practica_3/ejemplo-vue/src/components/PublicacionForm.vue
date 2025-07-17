<script setup lang="ts">
import { ref } from 'vue';
import type { Publicacion } from '../types/Publicacion';

const emit = defineEmits<{
  (e: 'add-publicacion', publicacion: Omit<Publicacion, 'id'>): void;
}>();

const newPublicacion = ref<Omit<Publicacion, 'id'>>({
  titulo: '',
  contenido: '',
  fecha: new Date().toISOString().split('T')[0],
  usuarioId: 1,
  tipo: 'opinion'
});

const submitPublicacion = () => {
  if (newPublicacion.value.titulo.trim() === '' || newPublicacion.value.contenido.trim() === '') {
    alert('Por favor complete todos los campos');
    return;
  }
  emit('add-publicacion', newPublicacion.value);
  // Resetear solo los campos editables
  newPublicacion.value.titulo = '';
  newPublicacion.value.contenido = '';
  newPublicacion.value.tipo = 'opinion';
};
</script>

<template>
  <form @submit.prevent="submitPublicacion" class="publicacion-form">
    <div class="form-group">
      <label for="titulo">Título:</label>
      <input 
        id="titulo" 
        v-model="newPublicacion.titulo" 
        placeholder="Escribe un título llamativo" 
        maxlength="100"
        required
      >
    </div>
    
    <div class="form-group">
      <label for="contenido">Contenido:</label>
      <textarea 
        id="contenido" 
        v-model="newPublicacion.contenido" 
        placeholder="Describe tu idea, queja u opinión" 
        rows="4"
        required
      ></textarea>
    </div>
    
    <div class="form-group">
      <label for="tipo">Tipo:</label>
      <select id="tipo" v-model="newPublicacion.tipo" required>
        <option value="idea">💡 Idea</option>
        <option value="queja">⚠️ Queja</option>
        <option value="opinion">🗣️ Opinión</option>
      </select>
    </div>
    
    <button type="submit" class="submit-btn">Publicar</button>
  </form>
</template>

<style scoped>
.publicacion-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input, textarea, select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

.submit-btn {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.submit-btn:hover {
  background-color: #3367d6;
}
</style>