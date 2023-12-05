import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.css";
import "./registerServiceWorker";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
