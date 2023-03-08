<script setup>
import { computed } from 'vue';
const props = defineProps({
  loading: Boolean,
  class: String,
  color: String,
  width: String || Number,
  size: String || Number,
});

const className = computed(() => `circle-loader ${props.class}`);
const circleColor = computed(() => props.color || 'primary');
const widthValue = computed(() => props.width || '3');
const sizeValue = computed(() => props.size || '20');
</script>

<template>
  <v-progress-circular
    v-if="loading"
    :class="className"
    :color="circleColor"
    :width="widthValue"
    :size="sizeValue"
    absolute
    indeterminate
  >
  </v-progress-circular>
</template>

<style src="./CircleLoader.css"></style>
