import { createApp } from 'vue';
// import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import VueApexCharts from 'vue3-apexcharts';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import store from './stores/vuex';

import App from './App.vue';
import router from './router';

import './assets/base.css';

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

app.component('VueDatePicker', VueDatePicker);
app.use(VueApexCharts);
app.use(vuetify);
// app.use(createPinia());
app.use(store);
app.use(router);

app.mount('#app');
