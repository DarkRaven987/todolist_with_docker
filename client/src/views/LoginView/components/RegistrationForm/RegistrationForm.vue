<script setup>
import { ref, computed } from 'vue';
import debounce from 'lodash/debounce';
import FormInput from '../../../../components/FormInput/FormInput.vue';
import { authAgent } from '../../../../utils/agent';
import { AUTH_FORM, passwordRegExp } from '../../../../utils/consts';
import FormPasswordInput from '../../../../components/FormPasswordInput/FormPasswordInput.vue';

const props = defineProps({
  handleFormChange: Function,
});

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const showIsUniqueUsernameError = ref(false);
const isLoadingUsernameCheck = ref(false);

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

const debounceNameCheck = debounce(() => {
  if (username.value) {
    isLoadingUsernameCheck.value = true;
    authAgent
      .post('/auth/checkUsername', { username: username.value })
      .then(({ data }) => {
        showIsUniqueUsernameError.value = !data.isUnique;
      })
      .finally(() => (isLoadingUsernameCheck.value = false));
  }
}, 2000);

const handleNewUsernameChange = (event) => {
  debounceNameCheck();
  username.value = event.target.value;
};

const handleNewPasswordChange = (event) => {
  password.value = event.target.value;
};

const handleConfirmPasswordChange = (event) => {
  confirmPassword.value = event.target.value;
};

const formSubmit = () => {
  if (isFormValid.value) {
    authAgent
      .post('/auth/signup', {
        username: username.value,
        password: password.value,
      })
      .then(() => {
        props.handleFormChange(AUTH_FORM.LOGIN);
      });
  }
};

const isUniqueUsernameErrorMessage = computed(() => {
  return showIsUniqueUsernameError.value
    ? ['Entered username is being used']
    : [];
});

const isFormValid = computed(() => {
  return (
    username.value &&
    password.value &&
    confirmPassword.value &&
    !showIsUniqueUsernameError.value
  );
});
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
        :errorMessages="isUniqueUsernameErrorMessage"
        :loading="isLoadingUsernameCheck"
        variant="outlined"
      />
      <FormPasswordInput
        class="mb-6"
        id="new_password"
        label="New password"
        :value="password"
        :rules="passwordFieldRules"
        @input="handleNewPasswordChange"
        :errorMessages="apiErrorMessages"
        variant="outlined"
      />
      <FormPasswordInput
        id="confirm_password"
        label="Confirm password"
        :value="confirmPassword"
        :rules="confirmPasswordFieldRules"
        @input="handleConfirmPasswordChange"
        :errorMessages="apiErrorMessages"
        variant="outlined"
      />
      <v-row class="mt-10">
        <v-btn type="submit" block>Sign Up</v-btn>
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
