import useAPI from '@/hooks/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

export function fetchPlaylists() {
  const { accessToken } = useAuthStore()

  // Asegurarse de que hay un token
  if (!accessToken) {
    console.error('No se encontró el token de acceso')
    return
  }

  return useAPI(() =>
    axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data.items)
      .catch((error) => {
        console.error('Error al obtener las playlists:', error)
        throw new Error('Error al obtener las playlists')
      }),
  )
}

export async function fetchPlaylistDetails(playlistId) {
  const { accessToken } = useAuthStore()
  if (!accessToken) {
    console.error('No se encontró el token de acceso')
    throw new Error('Token no disponible')
  }
  return useAPI(() =>
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => response.data.items)
      .catch((error) => {
        console.log('error al obtener los detalles', error)
        throw new Error('error al obtener los detalles')
      }),
  )
}

//   export async function createCollaborativePlaylist(token, name, description) {
//     const response = await fetch("https://api.spotify.com/v1/users/{user_id}/playlists", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name,
//         description,
//         public: false,
//         collaborative: true
//       })
//     });
//     const data = await response.json();
//     return data;  // Detalles de la nueva lista colaborativa creada
