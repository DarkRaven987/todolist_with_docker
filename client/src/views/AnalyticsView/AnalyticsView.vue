<script setup>
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.vue';
import DashboardCreatedChart from './components/DailyCreatedChart/DailyCreatedChart.vue';
import DashboardDoneChart from './components/DailyDoneChart/DailyDoneChart.vue';
</script>

<template>
  <v-layout>
    <DashboardHeader :title="'Dashboard Analytics'" />
    <div class="content-container">
      <v-container class="less-width-container">
        <v-col>
          <v-row class="d-flex justify-center mb-8 position-relative">
            <h1>Todos Analytics</h1>
          </v-row>
          <v-row>
            <v-col>
              <DashboardCreatedChart />
            </v-col>
            <v-col>
              <DashboardDoneChart />
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </div>
  </v-layout>
</template>

<style src="./AnalyticsView.css" scoped></style>
