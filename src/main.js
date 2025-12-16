import 'reflect-metadata';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.ts';

// Vuetify
import 'vuetify/styles';
import './style.scss';
import '@mdi/font/css/materialdesignicons.css';
import vuetify from './plugins/vuetify.js';

// eslint-disable-next-line
createApp(App).use(vuetify).use(router).mount('#app');
