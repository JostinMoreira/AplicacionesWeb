<script setup lang="ts">
import type { Usuario } from '../types/Usuario';

defineProps<{
  usuario: Usuario;
  rolBadge: string;
}>();

const emit = defineEmits<{
  (e: 'delete', id: number): void;
}>();
</script>

<template>
  <div class="usuario-item">
    <div class="usuario-grid">
      <div class="grid-item nombre">
        <span class="mobile-label">Nombre:</span>
        {{ usuario.nombre }}
      </div>
      <div class="grid-item email">
        <span class="mobile-label">Email:</span>
        {{ usuario.email }}
      </div>
      <div class="grid-item carrera">
        <span class="mobile-label">Carrera:</span>
        {{ usuario.carrera }}
      </div>
      <div class="grid-item rol">
        <span class="mobile-label">Rol:</span>
        {{ rolBadge }}
      </div>
      <div class="grid-item acciones">
        <button @click="emit('delete', usuario.id)" class="delete-btn">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.usuario-item {
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.usuario-item:hover {
  background-color: #f9f9f9;
}

.usuario-grid {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr;
  padding: 1rem;
  align-items: center;
}

.grid-item {
  padding: 0.5rem;
}

.rol {
  font-weight: 500;
}

.acciones {
  text-align: center;
}

.delete-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #cc0000;
}

.mobile-label {
  display: none;
  font-weight: bold;
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .usuario-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 1.5rem;
  }
  
  .mobile-label {
    display: inline;
  }
  
  .acciones {
    text-align: left;
    margin-top: 1rem;
  }
  
  .delete-btn {
    padding: 0.5rem;
    width: 100%;
  }
}
</style>