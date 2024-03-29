<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import FormInput from '../../../../components/FormInput/FormInput.vue';
import FormPasswordInput from '../../../../components/FormPasswordInput/FormPasswordInput.vue';
import { authAgent } from '../../../../utils/agent';
import { AUTH_FORM, passwordRegExp } from '../../../../utils/consts';

defineProps({
  handleFormChange: Function,
});

const store = useStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const displayAPIError = ref(false);

const usernameRules = [
  (value) => {
    if (!value) return 'Field is requried';
    if (value.length < 4) return 'Username should contain at least 4 symbols';
    return true;
  },
];

const passwordRules = [
  (value) => {
    if (!value) return 'Field is requried';
    if (!passwordRegExp.test(value))
      return 'Length should be at least 8 symbols containing upper and lower case letters, numbers and special symbols';
    return true;
  },
];

const handleUsernameChange = (event) => {
  if (displayAPIError.value) displayAPIError.value = false;
  username.value = event.target.value;
};

const handlePasswordChange = (event) => {
  if (displayAPIError.value) displayAPIError.value = false;
  password.value = event.target.value;
};

const formSubmit = () => {
  if (username.value && password.value) {
    authAgent
      .post('/signin', {
        username: username.value,
        password: password.value,
      })
      .then(({ data }) => {
        store.dispatch('setUser', data?.user);
        localStorage.setItem('user', JSON.stringify(data?.user));
        localStorage.setItem('accessToken', `Bearer ${data.accessToken}`);
        localStorage.setItem('refreshToken', `Bearer ${data.refreshToken}`);
        router.push('/dashboard');
      })
      .catch(() => {
        displayAPIError.value = true;
      });
  }
};

const apiErrorMessages = computed(() => {
  return displayAPIError.value ? ['Username or password is invalid'] : [];
});
</script>

<template>
  <v-container class="login-form-container">
    <v-form class="px-8 pt-4 pb-8" @submit.prevent="formSubmit">
      <v-row class="form-title mb-4">
        <h2>Sign In</h2>
      </v-row>
      <FormInput
        class="mb-6"
        id="username"
        label="Username"
        type="text"
        :value="username"
        :rules="usernameRules"
        @input="handleUsernameChange"
        :errorMessages="apiErrorMessages"
        variant="outlined"
      />
      <FormPasswordInput
        id="password"
        label="Password"
        :value="password"
        :rules="passwordRules"
        @input="handlePasswordChange"
        :errorMessages="apiErrorMessages"
        variant="outlined"
      />
      <v-row class="mt-10">
        <v-btn type="submit" block class="">Sign In</v-btn>
      </v-row>

      <v-row class="mt-10 justify-center">
        <span
          class="link-replica"
          v-on:click="handleFormChange(AUTH_FORM.REGISTER)"
        >
          Go to Sign Up
        </span>
      </v-row>
    </v-form>
  </v-container>
</template>

<style src="./LoginForm.css" scoped></style>
