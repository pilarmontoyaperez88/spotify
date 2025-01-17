import useAPI from '@/hooks/api'
import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token || localStorage.getItem('spotify_token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized. Redirecting to login...')
      router.push('/login')
    }

    return Promise.reject(error)
  },
)

export default {
  fetchPlaylists() {
    return useAPI(() => apiClient.get('/me/playlists').then((res) => res.data.items))
  },

  fetchPlaylistTracks(playlist_id) {
    return useAPI(() => apiClient.get(`/playlists/${playlist_id}/tracks`).then((res) => res.data))
  },
}
