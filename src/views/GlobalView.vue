<script setup>
import AppSearch from '@/components/globals/AppSearch.vue'
import PlaylistDetails from '@/components/PlaylistDetails.vue'
import AsidePlaylist from '@/components/AsidePlaylist.vue'
import { ref } from 'vue'

// Estado para almacenar la playlist seleccionada
const selectedPlaylistId = ref(null)

// Función para manejar la selección de una playlist
const onPlaylistSelected = (id) => {
  selectedPlaylistId.value = id // Asignar el ID de la playlist seleccionada
}
</script>

<template>
  <div class="global-view">
    <div class="header">
      <AppSearch />
    </div>
    <div class="content">
      <div class="aside-class">
        <aside>
          <AsidePlaylist @playlist-selected="onPlaylistSelected" />
        </aside>

        <div class="center">
          <PlaylistDetails :playlist_id="selectedPlaylistId" />
        </div>

        <div class="playing">aqui ira el componente de la cancion en reproducción</div>
      </div>
    </div>

    <footer>aqui ira el reproductor</footer>
  </div>
</template>

<style scoped>
.global-view {
  background: linear-gradient(to bottom, #242424, #0a0a0a);
  background-size: cover;
  min-height: 100vh;
  color: white;
}
.header {
  height: 48px;
  width: 1100px;
  margin: 0 auto;
  display: flex;
}

.content {
  display: flex;
}
</style>
