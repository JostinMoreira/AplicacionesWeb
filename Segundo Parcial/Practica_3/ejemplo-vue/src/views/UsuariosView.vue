<script setup lang="ts">
import { ref } from 'vue';
import type { Usuario } from '../types/Usuario';
import UsuarioForm from '../components/UsuarioForm.vue';
import UsuarioList from '../components/UsuarioList.vue';

const usuarios = ref<Usuario[]>([
  { id: 1, nombre: 'Javier Zamora', email: 'javier@uleam.edu.ec', carrera: 'Software', rol: 'estudiante' },
  { id: 2, nombre: 'Jostin Moreira', email: 'jostin@uleam.edu.ec', carrera: 'Software', rol: 'estudiante' }
]);

const addUsuario = (usuario: Omit<Usuario, 'id'>) => {
  const newId = usuarios.value.length > 0 ? Math.max(...usuarios.value.map(u => u.id)) + 1 : 1;
  usuarios.value.push({ id: newId, ...usuario });
};

const deleteUsuario = (id: number) => {
  usuarios.value = usuarios.value.filter(usuario => usuario.id !== id);
};
</script>

<template>
  <div class="usuarios-view">
    <h1>Gestión de Usuarios</h1>
    <UsuarioForm @add-usuario="addUsuario" />
    <UsuarioList :usuarios="usuarios" @delete-usuario="deleteUsuario" />
  </div>
</template>