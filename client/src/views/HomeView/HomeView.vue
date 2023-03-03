<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useCounterStore } from '../../stores/counter';
import HomeBox from '../../components/HomeBox/HomeBox.vue';

const store = useCounterStore();

let setDisplayBox = false;

function modifyByIntervalFunction() {
  console.log(store.count);
  store.increment();
  setDisplayBox = !setDisplayBox;
}

const testRef = ref(setInterval(modifyByIntervalFunction, 1000));

onBeforeUnmount(() => {
  testRef.value && clearInterval(testRef.value);
});
</script>

<template>
  <div class="content-container">
    <span>Hello world! Here goes simple counter:</span>
    <span>{{ store.count }}</span>
    <span>And here this value doubled:</span>
    <span>{{ store.doubleCount }}</span>
    <HomeBox v-show="setDisplayBox" />
  </div>
</template>

<style src="./HomeView.css" scoped></style>
