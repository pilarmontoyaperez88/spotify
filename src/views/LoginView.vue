<script setup>
import { redirectToAuthCodeFlow } from '@/service/authService'
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const logoUrl = new URL('@/assets/spotify.png', import.meta.url).href

function redirectToAuth() {
  if (clientId) {
    redirectToAuthCodeFlow(clientId)
  } else {
    console.error('clientId is not defined!')
  }
}
</script>

<template>
  <div class="container">
    <div class="login-container">
      <div class="header">
        <img :src="logoUrl" alt="Logo de Spotify" />
        <h1>Bienvenido a tu app de Spotify</h1>
      </div>

      <div class="button">
        <p>Haz click en el botón para ver tu perfil de Spotify.</p>
        <button @click="redirectToAuth">Login con Spotify</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #242424, #0a0a0a);
}
img {
  width: 56px;
  height: 56px;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  border-radius: 8px;
  padding-bottom: 32px;
  width: 534px;
  height: 564px;
  padding: 32px;
  background: linear-gradient(to bottom, #0a0a0a, #242424);
  color: white;
  row-gap: normal;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #1db954;
  color: black;
  border: none;
  border-radius: 50px;
}

button:hover {
  background-color: #1ed760;
}
</style>
