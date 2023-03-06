<script setup>
import { ref, computed } from 'vue';
import LoginForm from './components/LoginForm/LoginForm.vue';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.vue';
import { AUTH_FORM } from '../../utils/consts';

const loginState = ref(AUTH_FORM.LOGIN);

function handleDisplayForm(value) {
  loginState.value = value;
}

const loginFormDisplayed = computed(() => loginState.value === AUTH_FORM.LOGIN);
const registerFormDisplayed = computed(
  () => loginState.value === AUTH_FORM.REGISTER,
);
</script>

<template>
  <v-container class="login-page-container d-flex align-center justify-center">
    <LoginForm
      v-if="loginFormDisplayed"
      :handleFormChange="handleDisplayForm"
    />
    <RegistrationForm
      v-if="registerFormDisplayed"
      :handleFormChange="handleDisplayForm"
    />
  </v-container>
</template>

<style src="./LoginView.css" scoped></style>
