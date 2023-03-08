import { ref, onBeforeMount } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  function setUserData(data) {
    user.value = data;
  }

  onBeforeMount(() => {
    if (!user.value?.id) {
      user.value = JSON.parse(localStorage.getItem('user'));
    }
  });

  return { user, setUserData };
});
