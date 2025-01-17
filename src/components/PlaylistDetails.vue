<script setup>
import { ref, watchEffect, computed } from 'vue'
import spotifyService from '@/service/spotifyService'

// import useAPI from '@/hooks/api'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  playlist_id: String,
})

const authStore = useAuthStore()
const token = authStore.accessToken || localStorage.getItem('spotify_token')
const isLoading = ref(false)
const isError = ref(false)

const tracks = ref([])

const computedTracks = computed(() => tracks.value)

watchEffect(() => {
  if (props.playlist_id && token) {
    console.log('Fetching tracks for playlist:', props.playlist_id)
    // Llamar al servicio para obtener las canciones
    spotifyService
      .fetchPlaylistTracks(props.playlist_id)
      .then((data) => {
        tracks.value = data
        console.log('Tracks:', data)
      })
      .catch((error) => {
        console.error('Error fetching tracks:', error)
      })
  } else {
    console.log('No playlistId or token found')
  }
})
</script>

<template>
  <div class="playlist-details">
    este es el PlayList details

    <div class="header">
      <!-- <p>{{ playlist.name }}</p> -->
      <img src="" alt="" />
    </div>
    <div v-if="isLoading" class="loading">
      <p>Loading playlists...</p>
    </div>

    <div v-else-if="isError" class="error">
      <p>There was an error fetching the playlists. Please try again.</p>
    </div>
    <div class="list">
      <ul>
        <li v-for="(track, index) in computedTracks" :key="index" class="track-item">
          <div>
            <!-- Título de la canción -->
            <h3>{{ track.name }}</h3>

            <!-- Artista -->
            <p>
              <strong>Artist:</strong>
              {{ track.artists.map((artist) => artist.name).join(', ') }}
            </p>

            <!-- Álbum -->
            <p><strong>Album:</strong> {{ track.album.name }}</p>

            <!-- Duración -->
            <p>
              <strong>Duration:</strong>
              {{ (track.duration_ms / 1000 / 60).toFixed(2) }} minutes
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
