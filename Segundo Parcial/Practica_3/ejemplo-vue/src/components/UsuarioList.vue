<script setup lang="ts">
import type { Usuario } from '../types/Usuario';
import UsuarioItem from './UsuarioItem.vue';

defineProps<{
  usuarios: Usuario[];
}>();

const emit = defineEmits<{
  (e: 'delete-usuario', id: number): void;
}>();

const getRolBadge = (rol: string) => {
  switch(rol) {
    case 'administrador': return '👑 Admin';
    case 'estudiante': return '🎓 Estudiante';
    default: return rol;
  }
};
</script>

<template>
  <div class="usuario-list">
    <div v-if="usuarios.length === 0" class="empty-state">
      <p>No hay usuarios registrados todavía.</p>
    </div>
    
    <div v-else class="list-header">
      <span class="header-item">Nombre</span>
      <span class="header-item">Email</span>
      <span class="header-item">Carrera</span>
      <span class="header-item">Rol</span>
      <span class="header-item action">Acciones</span>
    </div>
    
    <UsuarioItem 
      v-for="usuario in usuarios" 
      :key="usuario.id" 
      :usuario="usuario" 
      :rol-badge="getRolBadge(usuario.rol)"
      @delete="emit('delete-usuario', usuario.id)" 
    />
  </div>
</template>

<style scoped>
.usuario-list {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #666;
  font-style: italic;
}

.list-header {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr;
  padding: 1rem;
  background-color: #f8f9fa;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.header-item {
  padding: 0.5rem;
}

.header-item.action {
  text-align: center;
}

@media (max-width: 768px) {
  .list-header {
    display: none;
  }
}
</style>