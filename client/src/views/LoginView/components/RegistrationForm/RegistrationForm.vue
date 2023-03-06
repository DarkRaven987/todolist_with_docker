<script setup>
import { ref } from 'vue';
import FormInput from '../../../../components/FormInput/FormInput.vue';
import { authAgent } from '../../../../utils/agent';
import { AUTH_FORM } from '../../../../utils/consts';

const props = defineProps({
  handleFormChange: Function,
});

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const usernameFieldRules = [
  (value) => {
    if (!value) return 'Field is requried';
    if (value.length < 4) return 'Username should contain at least 4 symbols';
    return true;
  },
];

const passwordFieldRules = [
  (value) => {
    if (!value) return 'Field is requried';
    if (value.length < 8) return 'Username should contain at least 8 symbols';
    return true;
  },
];

const confirmPasswordFieldRules = [
  (value) => {
    if (!value) return 'Field is requried';
    if (value !== password.value)
      return 'Password and confirm password are not equal';
    return true;
  },
];

const handleNewUsernameChange = (event) => {
  username.value = event.target.value;
};

const handleNewPasswordChange = (event) => {
  password.value = event.target.value;
};

const handleConfirmPasswordChange = (event) => {
  confirmPassword.value = event.target.value;
};

const formSubmit = () => {
  authAgent
    .post('/auth/signup', {
      username: username.value,
      password: password.value,
    })
    .then(() => {
      props.handleFormChange(AUTH_FORM.LOGIN);
    });
};
</script>

<template>
  <v-container class="login-form-container">
    <v-form class="px-8 pt-4 pb-8" @submit.prevent="formSubmit">
      <v-row class="form-title mb-4">
        <h2>Sign Up</h2>
      </v-row>
      <FormInput
        class="mb-6"
        id="new_username"
        label="New username"
        type="text"
        :value="username"
        :rules="usernameFieldRules"
        @input="handleNewUsernameChange"
      />
      <FormInput
        id="new_password"
        label="New password"
        type="password"
        :value="password"
        :rules="passwordFieldRules"
        @input="handleNewPasswordChange"
      />
      <FormInput
        id="confirm_password"
        label="Confirm password"
        type="password"
        :value="confirmPassword"
        :rules="confirmPasswordFieldRules"
        @input="handleConfirmPasswordChange"
      />
      <v-row class="mt-10">
        <v-btn type="submit" block class="">Sign Up</v-btn>
      </v-row>

      <v-row class="mt-10 justify-center">
        <span
          class="link-replica"
          v-on:click="handleFormChange(AUTH_FORM.LOGIN)"
        >
          Go to Sign In
        </span>
      </v-row>
    </v-form>
  </v-container>
</template>

<style src="./RegistrationForm.css" scoped></style>
