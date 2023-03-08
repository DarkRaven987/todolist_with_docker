<script setup>
import CircleLoader from '../../components/CircleLoader/CircleLoader.vue';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.vue';
import { useUserStore } from '../../stores/user';

const user = useUserStore();
</script>

<template>
  <v-layout>
    <DashboardHeader />
    <div class="content-container">
      <v-container>
        <v-col>
          <v-row class="d-flex justify-center mb-8 position-relative">
            <h1>User Profile</h1>
          </v-row>
          <v-row> Username: {{ user.user?.username }} </v-row>
        </v-col>
        <!-- <CircleLoader
          :loading="true"
          class="page-loader"
          color="warning"
          width="6"
          size="40"
        /> -->
      </v-container>
    </div>
  </v-layout>
</template>

<style src="./UserProfileView.css" scoped></style>
