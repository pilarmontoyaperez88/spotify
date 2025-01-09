<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { redirectToAuthCodeFlow, getAccessToken } from '@/service/authService'
import axios from 'axios'
import useAPI from '@/hooks/api'
import router from '@/router'

const profile = ref(null)

const route = useRoute()
const code = route.query.code

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID

const { execute: loadProfile } = useAPI(async (token) => {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
})

onMounted(() => {
  if (code) {
    getAccessToken(clientId, code)
      .then((accessToken) => {
        loadProfile(accessToken).then(() => {
          router.push({ name: 'global' })
        })
      })
      .catch((error) => {
        console.error('Error fetching the profile or token:', error)
      })
  } else {
    console.error('No authorization code found in the URL.')
    redirectToAuthCodeFlow(clientId)
  }
})
</script>

<template>
  <div>
    <h1>Tu perfil de Spotify</h1>

    <section v-if="profile" id="profile">
      <h2>Logueado como: {{ profile.display_name }}</h2>
      <img :src="profile.images[0]?.url" alt="Profile Image" />
      <ul>
        <li>User ID: {{ profile.id }}</li>
        <li>Email: {{ profile.email }}</li>
        <li>
          Spotify URI: <a :href="profile.uri" target="_blank">{{ profile.uri }}</a>
        </li>
        <li>
          Link:
          <a :href="profile.external_urls.spotify" target="_blank">{{
            profile.external_urls.spotify
          }}</a>
        </li>
        <li>Profile Image: <img :src="profile.images[0]?.url" alt="Profile Image" /></li>
      </ul>
    </section>

    <p v-else>cargando perfil...</p>
  </div>
</template>

<style scoped>
#profile img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
