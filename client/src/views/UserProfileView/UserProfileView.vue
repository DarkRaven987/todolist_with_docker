<script setup>
import { ref, computed } from 'vue';
import UsernameForm from './components/UsernameForm/UsernameForm.vue';
import PasswordForm from './components/PasswordForm/PasswordForm.vue';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.vue';
import { useUserStore } from '../../stores/user';
import UserIcon from './components/UserIcon/UserIcon.vue';

const user = useUserStore();

const userEditMode = ref('');

const handleSelectEditMode = (val) => {
  if (val !== userEditMode.value) userEditMode.value = val;
  else userEditMode.value = '';
};

const closeOtherSessions = () => {
  user.logoutExceptCurrent();
};

const isUsernameFormDisplayed = computed(
  () => userEditMode.value === 'username',
);
const isPasswordFormDisplayed = computed(
  () => userEditMode.value === 'password',
);

const usernameButtonClass = computed(() => {
  return `mr-6 ${isUsernameFormDisplayed.value ? 'active' : ''}`;
});

const passwordButtonClass = computed(() => {
  return isPasswordFormDisplayed.value ? 'active' : '';
});
</script>

<template>
  <v-layout>
    <DashboardHeader :title="'User Profile'" />
    <div class="content-container">
      <v-container class="less-width-container">
        <v-col>
          <v-row class="d-flex justify-center mb-8 position-relative">
            <h1>User Profile</h1>
          </v-row>
          <v-row>
            <UserIcon />

            <v-col class="user-content-col">
              <v-row class="user-name-label justify-space-between">
                <span>{{ user.user?.username }}</span>
                <v-btn @click="closeOtherSessions">Close other sessions</v-btn>
              </v-row>

              <v-row class="d-flex mt-10">
                <v-btn
                  :class="usernameButtonClass"
                  @click="handleSelectEditMode('username')"
                  >Change Username</v-btn
                >
                <v-btn
                  :class="passwordButtonClass"
                  @click="handleSelectEditMode('password')"
                  >Change Password</v-btn
                >
              </v-row>

              <v-row class="form-container mt-12">
                <UsernameForm v-if="isUsernameFormDisplayed" />
                <PasswordForm v-if="isPasswordFormDisplayed" />
              </v-row>
            </v-col>
          </v-row>
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
