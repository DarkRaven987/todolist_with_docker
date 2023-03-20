<script setup>
import { ref, computed, onBeforeMount, watch } from 'vue';
import dayjs from 'dayjs';
import { apiAgent } from '../../../../utils/agent';

const date = ref([dayjs().subtract(20, 'days').toDate(), dayjs().toDate()]);
const dates = ref([]);
const series = ref([]);

const loadChartData = async () => {
  const data = await apiAgent
    .get(
      `/todos/daily-done/${dayjs(date.value[0]).format('YYYY-MM-DD')}/${dayjs(
        date.value[1],
      ).format('YYYY-MM-DD')}`,
    )
    .then(({ data }) => data);

  dates.value = data.dates.map((date) => dayjs(date).format('MMM D'));
  series.value = data.data;
};

const options = computed(() => {
  return {
    chart: {
      id: 'daily-done-todos',
    },
    xaxis: {
      categories: dates.value,
    },
  };
});

watch(date, () => {
  loadChartData();
});

onBeforeMount(() => {
  loadChartData();
});
</script>
<template>
  <v-col>
    <v-row>
      <h2>Daily Done Todos</h2>
    </v-row>
    <v-row>
      <VueDatePicker v-model="date" :range="true" :enable-time-picker="false" />
    </v-row>
    <v-row>
      <div class="w-full">
        <apexchart type="bar" :options="options" :series="series"></apexchart>
      </div>
    </v-row>
  </v-col>
</template>

<style src="./DailyDoneChart.css" scoped></style>
