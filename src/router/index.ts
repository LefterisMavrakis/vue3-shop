import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          component: () => import('../views/HomeView.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      redirect: '/',
    },
  ],
})

export default router
