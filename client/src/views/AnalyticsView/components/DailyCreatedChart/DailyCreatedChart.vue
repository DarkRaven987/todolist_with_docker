<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import dayjs from 'dayjs';
import { apiAgent } from '../../../../utils/agent';

const startDate = ref(dayjs().subtract(20, 'days'));
const endDate = ref(dayjs());
const dates = ref([]);
const series = ref([]);

const loadChartData = async () => {
  const data = await apiAgent
    .get(
      `/todos/dailyCreated/${startDate.value.format(
        'YYYY-MM-DD',
      )}/${endDate.value.format('YYYY-MM-DD')}`,
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

onBeforeMount(() => {
  loadChartData();
});
</script>
<template>
  <v-col>
    <v-row>
      <h2>Daily Created Todos</h2>
    </v-row>
    <v-row>
      <div class="w-full">
        <apexchart type="bar" :options="options" :series="series"></apexchart>
      </div>
    </v-row>
  </v-col>
</template>

<style src="./DailyCreatedChart.css" scoped></style>
