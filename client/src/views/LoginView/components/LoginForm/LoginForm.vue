<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '../../../../components/FormInput/FormInput.vue';
import { useUserStore } from '../../../../stores/user';
import { authAgent } from '../../../../utils/agent';
import { AUTH_FORM } from '../../../../utils/consts';

defineProps({
  handleFormChange: Function,
});

const userStore = useUserStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const requiredRule = [
  (value) => {
    if (!value) return 'Field is requried';
    return true;
  },
];

const handleUsernameChange = (event) => {
  username.value = event.target.value;
};

const handlePasswordChange = (event) => {
  password.value = event.target.value;
};

const formSubmit = () => {
  authAgent
    .post('/auth/signin', {
      username: username.value,
      password: password.value,
    })
    .then(({ data }) => {
      userStore.setUserData(data?.user);
      localStorage.setItem('accessToken', `Bearer ${data.accessToken}`);
      localStorage.setItem('refreshToken', `Bearer ${data.refreshToken}`);
      router.push('/dashboard');
    });
};
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
        :rules="requiredRule"
        @input="handleUsernameChange"
      />
      <FormInput
        id="password"
        label="Password"
        type="password"
        :value="password"
        :rules="requiredRule"
        @input="handlePasswordChange"
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
