<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { authAgent } from '../../../../utils/agent';
import { passwordRegExp } from '../../../../utils/consts';
import FormPasswordInput from '../../../../components/FormPasswordInput/FormPasswordInput.vue';

const store = useStore();

const password = ref('');
const confirmPassword = ref('');

const passwordFieldRules = [
  (value) => {
    if (!value) return 'Field is requried';
    if (!passwordRegExp.test(value))
      return 'Length should be at least 8 symbols containing upper and lower case letters, numbers and special symbols';
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

const handlePasswordChange = (event) => {
  password.value = event.target.value;
};

const handleConfirmPasswordChange = (event) => {
  confirmPassword.value = event.target.value;
};

const formSubmit = () => {
  if (isFormValid.value) {
    authAgent
      .patch('/users', {
        userId: store.state.user.id,
        password: password.value,
      })
      .then(() => {
        store.dispatch('clearAllSessions');
      });
  }
};
const isFormValid = computed(() => {
  return password.value && confirmPassword.value;
});
</script>

<template>
  <v-form class="pt-4" @submit.prevent="formSubmit">
    <FormPasswordInput
      class="mb-6"
      id="new_password"
      label="New password"
      type="password"
      :value="password"
      :rules="passwordFieldRules"
      @input="handlePasswordChange"
    />

    <FormPasswordInput
      id="confirm_password"
      label="Confirm password"
      type="password"
      :value="confirmPassword"
      :rules="confirmPasswordFieldRules"
      @input="handleConfirmPasswordChange"
    />

    <v-row class="mt-10">
      <v-btn type="submit" block>Confirm password change</v-btn>
    </v-row>
  </v-form>
</template>

<style src="./PasswordForm.css" scoped></style>
