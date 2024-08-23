import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

console.log('Starting Vue app...');

const app = createApp(App);

app.use(router);

try {
  app.mount('#app');
  console.log('Vue app mounted.');
} catch (error) {
  console.error('Error mounting Vue app:', error);
}
axios.defaults.baseURL = 'http://localhost:3000';