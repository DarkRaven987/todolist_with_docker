<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authAgent } from '../../utils/agent';

const router = useRouter();

const drawer = ref(false);
const items = ref([
  {
    title: 'Profile',
    value: 'profile',
    onClick: () => {
      console.log('Profile');
    },
  },
  {
    title: 'Sign Out',
    value: 'sign_out',
    onClick: () => {
      authAgent
        .get('/auth/logout', {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
        .then(() => {
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

    <v-toolbar-title>Todo List</v-toolbar-title>

    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :title="item.title"
        @click="item.onClick"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style src="./DashboardHeader.css"></style>
