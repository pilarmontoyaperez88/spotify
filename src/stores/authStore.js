import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    isAuthenticated: false,
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token
      this.isAuthenticated = true
    },
    clearAuthData() {
      this.accessToken = null
      this.isAuthenticated = false
    },
  },
})
