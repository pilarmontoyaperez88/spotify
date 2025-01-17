<script setup>
import { ref, watchEffect, computed } from 'vue'

import spotifyService from '@/service/spotifyService'
import { useAuthStore } from '@/stores/authStore'

const emit = defineEmits(['playlist-selected'])

const authStore = useAuthStore()

const token = authStore.accessToken || localStorage.getItem('spotify_token')

const playlists = ref([])

const {
  execute: fetchAllPlaylists,
  data: playlistsData,
  isLoading: isPlaylistsLoading,
  isError: isPlaylistsError,
} = spotifyService.fetchPlaylists()

watchEffect(() => {
  if (token) {
    fetchAllPlaylists()
    console.log('Token:', token)
  } else {
    console.log('No se encontró el token de autenticación')
  }
})

watchEffect(() => {
  if (playlistsData.value) {
    playlists.value = playlistsData.value
  }
})

const computedPlaylists = computed(() => {
  return playlists.value || []
})

const selectPlaylist = (id) => {
  emit('playlist-selected', id)
}
</script>

<template>
  <div v-if="isPlaylistsLoading" class="loading">
    <p>Loading playlists...</p>
  </div>

  <div v-else-if="isPlaylistsError" class="error">
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

          <button @click="selectPlaylist(playlist.id)">View Playlist</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
