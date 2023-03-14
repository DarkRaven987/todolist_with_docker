<script setup>
import { ref } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  value: String,
  onChange: Function,
  rules: Object,
  errorMessages: Object,
  loading: Boolean,
  variant: String,
  autoСomplete: String,
});

const showPassword = ref(false);
const localValue = ref(props.value);

const toggleShowPassword = () => (showPassword.value = !showPassword.value);
</script>

<template>
  <v-row class="form-input-container">
    <v-text-field
      class="text-field"
      :variant="variant"
      :id="id"
      :type="showPassword ? 'text' : 'password'"
      :label="label"
      v-model="localValue"
      :rules="rules"
      v-on:input="$emit('input', $event)"
      :error-messages="errorMessages"
      :autocomplete="autoСomplete"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="toggleShowPassword"
    >
      <template v-slot:loader>
        <v-progress-circular
          v-if="loading"
          class="circular-loader"
          color="primary"
          width="3"
          size="20"
          absolute
          indeterminate
        >
        </v-progress-circular>
      </template>
    </v-text-field>
  </v-row>
</template>

<style src="./FormPasswordInput.css"></style>
