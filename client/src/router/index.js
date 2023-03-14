import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView/HomeView.vue';
import LoginView from '../views/LoginView/LoginView.vue';
import UserProfileView from '../views/UserProfileView/UserProfileView.vue';
import AnalyticsView from '../views/AnalyticsView/AnalyticsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomeView,
    },
    {
      path: '/dashboard/profile',
      name: 'user_profile',
      component: UserProfileView,
    },
    {
      path: '/dashboard/analytics',
      name: 'analytics',
      component: AnalyticsView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

router.beforeEach(async (to) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if ((!accessToken || !refreshToken) && to.name !== 'login') {
    return { name: 'login' };
  }
});

export default router;
