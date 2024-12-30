<script setup>
import { ref } from 'vue'
import { redirectToAuthCodeFlow } from '@/service/authService'

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID

function redirectToAuth() {
  if (clientId) {// Ahora redirige correctamente
  } else {
    console.error('clientId is not defined!')
  }
}
</script>

<template>
  <div class="home">
    <h1>Bienvenido a tu aplciación de Spotify</h1>
    <p>Haz click en el botón para ver tu perfil de Spotify.</p>
    <button @click="redirectToAuth">Login con Spotify</button>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #1db954; /* Spotify Green */
  color: white;
  border: none;
  border-radius: 50px;
}

button:hover {
  background-color: #1ed760;
}
</style>
