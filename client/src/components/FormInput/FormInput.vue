<script setup>
defineProps({
  id: String,
  label: String,
  type: String,
  value: String,
  onChange: Function,
  rules: Object,
});
</script>

<template>
  <v-row class="form-input-container">
    <v-text-field
      :id="id"
      :type="type"
      :label="label"
      :value="value"
      :rules="rules"
      v-on:input="$emit('input', $event)"
      variant="outlined"
    />
  </v-row>
</template>

<style src="./FormInput.css" scoped></style>
