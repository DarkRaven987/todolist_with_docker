import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  function setUserData(data) {
    user.value = data;
  }

  return { user, setUserData };
});
