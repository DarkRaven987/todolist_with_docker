<script setup>
import { ref } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  type: String,
  value: String,
  onChange: Function,
  rules: Object,
  errorMessages: Object,
  loading: Boolean,
  variant: String,
});

const localValue = ref(props.value);
</script>

<template>
  <v-row class="form-input-container">
    <v-text-field
      class="text-field"
      :variant="variant"
      :id="id"
      :type="type"
      :label="label"
      v-model="localValue"
      :rules="rules"
      v-on:input="$emit('input', $event)"
      :error-messages="errorMessages"
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

<style src="./FormInput.css"></style>
