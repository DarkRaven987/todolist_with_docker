<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  console.log('Yay! I am new to this world!');
});

onUnmounted(() => {
  console.log('Make this world great! My final message! Goodbye...');
});
</script>

<template>
  <div class="box-container"></div>
</template>

<style src="./HomeBox.css" scoped></style>
