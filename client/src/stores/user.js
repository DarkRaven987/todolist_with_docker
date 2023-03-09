import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { authAgent } from '../utils/agent';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const router = useRouter();

  function setUserData(data) {
    user.value = data;
  }

  function logout() {
    authAgent.get('/auth/logout').then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/login');
    });
  }

  onBeforeMount(() => {
    if (!user.value?.id) {
      user.value = JSON.parse(localStorage.getItem('user'));
    }

    if (user?.value?.id) {
      authAgent.get(`/users/${user?.value?.id}`);
    }
  });

  return { user, setUserData, logout };
});
