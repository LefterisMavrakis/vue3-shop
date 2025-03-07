import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: () => import('../views/CheckoutView.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
