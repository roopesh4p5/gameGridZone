import './registerServiceWorker';
import './assets/index.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import { createApp } from 'vue';

import ToastPlugin from 'vue-toast-notification';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store).use(router).use(ToastPlugin);

app.mount('#app');