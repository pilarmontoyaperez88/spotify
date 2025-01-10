<script setup>
import { ref, watchEffect, computed } from 'vue'
import { fetchPlaylists } from '@/service/spotifyService'
// import useAPI from '@/hooks/api'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const token = authStore.accessToken || localStorage.getItem('spotify_token')
const { execute, data, isLoading, isError } = fetchPlaylists()

watchEffect(() => {
  if (token) {
    execute(token)
    console.log('Token:', token)
  }
})

const playlists = ref([])

watchEffect(() => {
  if (data.value) {
    playlists.value = data.value
  }
})

const computedPlaylists = computed(() => {
  return playlists.value || []
})
</script>

<template>
  <div v-if="isLoading" class="loading">
    <p>Loading playlists...</p>
  </div>

  <div v-else-if="isError" class="error">
    <p>There was an error fetching the playlists. Please try again.</p>
  </div>

  <div v-else class="playlists">
    <h2>Your Playlists</h2>
    <ul>
      <li v-for="playlist in computedPlaylists" :key="playlist.id">
        <div>
          <img
            v-if="playlist.images.length"
            :src="playlist.images[0].url"
            alt="Playlist Cover"
            class="playlist-image"
          />
          <h3>{{ playlist.name }}</h3>
          <p>{{ playlist.description || 'No description available' }}</p>
          <button @click="selectPlaylist(playlist.id)">View Playlist</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
