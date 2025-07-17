<script setup lang="ts">
import { ref } from 'vue';
import UsuariosView from './views/UsuariosView.vue';
import PublicacionesView from './views/PublicacionesView.vue';

const currentView = ref<'usuarios' | 'publicaciones'>('publicaciones');
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>🏫 Campus Voz ULEAM</h1>
      <p class="subtitle">Espacio para compartir ideas, quejas y opiniones</p>
      <nav class="nav-menu">
        <button 
          @click="currentView = 'publicaciones'" 
          :class="{ active: currentView === 'publicaciones' }"
        >
          📢 Publicaciones
        </button>
        <button 
          @click="currentView = 'usuarios'" 
          :class="{ active: currentView === 'usuarios' }"
        >
          👥 Usuarios
        </button>
      </nav>
    </header>
    
    <main class="app-main">
      <UsuariosView v-if="currentView === 'usuarios'" />
      <PublicacionesView v-if="currentView === 'publicaciones'" />
    </main>
    
    <footer class="app-footer">
      <p>© 2025 Campus Voz ULEAM - Desarrollo: Javier Zamora & Jostin Moreira</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.app-header h1 {
  margin-bottom: 0.5rem;
}

.subtitle {
  opacity: 0.8;
  margin-bottom: 1rem;
}

.nav-menu {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-menu button {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-menu button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-menu button.active {
  background-color: white;
  color: #2c3e50;
  font-weight: bold;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  text-align: center;
  padding: 1rem;
  background-color: #2c3e50;
  color: white;
  font-size: 0.9rem;
}
</style>