<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authAgent } from '../../utils/agent';

const router = useRouter();

const drawer = ref(false);
const items = ref([
  {
    title: 'Dashboard',
    icon: 'mdi-home',
    value: 'dashboard',
    onClick: () => {
      console.log('Dashboard');
      router.push('/dashboard');
    },
  },
  {
    title: 'Profile',
    icon: 'mdi-account',
    value: 'profile',
    onClick: () => {
      console.log('Profile');
      router.push('/dashboard/profile');
    },
  },
  {
    title: 'Sign Out',
    icon: 'mdi-exit-to-app',
    value: 'sign_out',
    onClick: () => {
      authAgent.get('/auth/logout').then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.push('/login');
      });
    },
  },
]);
</script>

<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>

    <v-toolbar-title>User profile</v-toolbar-title>

    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="item.onClick"
        class="d-flex align-center"
      >
        <v-icon :icon="item.icon" class="mr-3" />
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style src="./DashboardHeader.css"></style>
