<script setup>
import { ref, computed } from 'vue';
import debounce from 'lodash/debounce';
import FormInput from '../../../../components/FormInput/FormInput.vue';
import { authAgent } from '../../../../utils/agent';
import { useUserStore } from '../../../../stores/user';

const users = useUserStore();

const username = ref('');
const confirmUsername = ref('');

const showIsUniqueUsernameError = ref(false);
const isLoadingUsernameCheck = ref(false);

const usernameFieldRules = [
  (value) => {
    if (!value) return 'Field is requried';
    if (value.length < 4) return 'Username should contain at least 4 symbols';
    return true;
  },
];

const confirmUsernameFieldRules = [
  (value) => {
    if (!value) return 'Field is requried';
    if (value !== username.value) return 'Entered usernames are not equal';
    return true;
  },
];

const debounceNameCheck = debounce(() => {
  if (username.value) {
    isLoadingUsernameCheck.value = true;
    authAgent
      .post('/checkUsername', { username: username.value })
      .then(({ data }) => {
        showIsUniqueUsernameError.value = !data.isUnique;
      })
      .finally(() => (isLoadingUsernameCheck.value = false));
  }
}, 2000);

const handleUsernameChange = (event) => {
  debounceNameCheck();
  if (showIsUniqueUsernameError.value) showIsUniqueUsernameError.value = false;
  username.value = event.target.value;
};

const handleConfirmUsernameChange = (event) => {
  confirmUsername.value = event.target.value;
};

const formSubmit = () => {
  if (isFormValid.value) {
    authAgent
      .patch('/users', {
        userId: users.user.id,
        username: username.value,
      })
      .then(() => {
        users.clearAllSessions();
      });
  }
};
const isFormValid = computed(() => {
  return (
    username.value && confirmUsername.value && !showIsUniqueUsernameError.value
  );
});

const isUniqueUsernameErrorMessage = computed(() => {
  return showIsUniqueUsernameError.value
    ? ['Entered username is being used']
    : [];
});
</script>

<template>
  <v-form class="pt-4" @submit.prevent="formSubmit">
    <FormInput
      class="mb-6"
      id="new_username"
      label="New username"
      type="text"
      :value="username"
      :rules="usernameFieldRules"
      @input="handleUsernameChange"
      :errorMessages="isUniqueUsernameErrorMessage"
      :loading="isLoadingUsernameCheck"
      :autoСomplete="`off`"
    />

    <FormInput
      id="confirm_username"
      label="Confirm username"
      type="text"
      :value="confirmUsername"
      :rules="confirmUsernameFieldRules"
      @input="handleConfirmUsernameChange"
      :autoСomplete="`off`"
    />

    <v-row class="mt-10">
      <v-btn type="submit" block>Confirm username change</v-btn>
    </v-row>
  </v-form>
</template>

<style src="./UsernameForm.css" scoped></style>
