<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { redirectToAuthCodeFlow, getAccessToken, fetchProfile } from '@/service/authService'

const profile = ref(null)
const authStore = useAuthStore()

const route = useRoute()
const router = useRouter()
const code = route.query.code

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID

onMounted(async () => {
  if (code) {
    try {
      const accessToken = await getAccessToken(clientId, code)
      authStore.setAccessToken(accessToken)
      router.push('/global')

      profile.value = await fetchProfile(accessToken)
    } catch (error) {
      console.error('Error fetching the profile:', error)
    }
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
