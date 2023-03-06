<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useCounterStore } from '../../stores/counter';
import HomeBox from '../../components/HomeBox/HomeBox.vue';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.vue';

const store = useCounterStore();

let setDisplayBox = false;

function modifyByIntervalFunction() {
  store.increment();
  setDisplayBox = !setDisplayBox;
}

const testRef = ref(setInterval(modifyByIntervalFunction, 1000));

onBeforeUnmount(() => {
  testRef.value && clearInterval(testRef.value);
});
</script>

<template>
  <v-layout>
    <DashboardHeader />
    <v-container class="content-container">
      <span>Hello world! Here goes simple counter:</span>
      <span>{{ store.count }}</span>
      <span>And here this value doubled:</span>
      <span>{{ store.doubleCount }}</span>
      <HomeBox v-show="setDisplayBox" />
    </v-container>
  </v-layout>
</template>

<style src="./HomeView.css" scoped></style>
