<script setup>
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

if (window.location.pathname !== '/login') {
  store.dispatch('validateSession');
}
</script>

<template>
  <RouterView />
</template>
