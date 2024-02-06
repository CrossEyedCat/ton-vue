import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/md-dark-indigo/theme.css'; // Замените 'saga-blue' на выбранную вами тему
import 'primevue/resources/primevue.min.css';
const app = createApp(App);

app.use(PrimeVue, { theme: 'md-dark-indigo' });

app.mount('#app');
