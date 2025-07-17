<script setup lang="ts">
import { ref } from 'vue';
import type { Usuario } from '../types/Usuario';

const emit = defineEmits<{
  (e: 'add-usuario', usuario: Omit<Usuario, 'id'>): void;
}>();

const newUsuario = ref<Omit<Usuario, 'id'>>({
  nombre: '',
  email: '',
  carrera: '',
  rol: 'estudiante'
});

const submitUsuario = () => {
  emit('add-usuario', newUsuario.value);
  newUsuario.value = { nombre: '', email: '', carrera: '', rol: 'estudiante' };
};
</script>

<template>
  <form @submit.prevent="submitUsuario" class="usuario-form">
    <input v-model="newUsuario.nombre" placeholder="Nombre" required>
    <input v-model="newUsuario.email" type="email" placeholder="Email" required>
    <input v-model="newUsuario.carrera" placeholder="Carrera" required>
    <select v-model="newUsuario.rol" required>
      <option value="estudiante">Estudiante</option>
      <option value="administrador">Administrador</option>
    </select>
    <button type="submit">Agregar Usuario</button>
  </form>
</template>