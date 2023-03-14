<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';

defineProps({
  title: String,
});

const users = useUserStore();

const router = useRouter();

const drawer = ref(false);
const items = ref([
  {
    title: 'Dashboard',
    icon: 'mdi-home',
    value: 'dashboard',
    onClick: () => {
      router.push('/dashboard');
    },
  },
  {
    title: 'Analytics',
    icon: 'mdi-chart-bar',
    value: 'analytics',
    onClick: () => {
      router.push('/dashboard/analytics');
    },
  },
  {
    title: 'Profile',
    icon: 'mdi-account',
    value: 'profile',
    onClick: () => {
      router.push('/dashboard/profile');
    },
  },
  {
    title: 'Sign Out',
    icon: 'mdi-exit-to-app',
    value: 'sign_out',
    onClick: () => users.logout(),
  },
]);
</script>

<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>

    <v-toolbar-title>{{ title }}</v-toolbar-title>

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
