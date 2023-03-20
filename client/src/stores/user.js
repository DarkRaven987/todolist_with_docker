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
    const refreshToken = localStorage.getItem('refreshToken');
    authAgent.post('/logout', { refreshToken }).then(() => {
      setUserData(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/login');
    });
  }

  function clearAllSessions() {
    authAgent.get('/total-logout').then(() => {
      setUserData(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/login');
    });
  }

  function logoutExceptCurrent() {
    const refreshToken = localStorage.getItem('refreshToken');
    authAgent.post('/logout-except-current', { refreshToken });
  }

  onBeforeMount(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (refreshToken && accessToken) {
      authAgent
        .post(`/validate-session`, {
          jwt: refreshToken,
        })
        .then(({ data }) => {
          if (!data?.sub) {
            logout();
          } else {
            setUserData({
              id: data.sub,
              username: data.username,
            });
          }
        });
    }
  });

  return { user, setUserData, logout, clearAllSessions, logoutExceptCurrent };
});
