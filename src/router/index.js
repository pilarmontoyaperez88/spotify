import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LoginView.vue'
import CallbackProfile from '@/components/CallbackProfile.vue'
import GlobalView from '@/views/GlobalView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: HomeView,
    },
    {
      path: '/callback',
      name: 'callback',
      component: CallbackProfile,
    },
    {
      path: '/global',
      name: 'global',
      component: GlobalView,
    },
  ],
})

export default router
