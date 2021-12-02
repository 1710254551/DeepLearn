import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App";
import "ant-design-vue/dist/antd.css";
import router from "./router";

const app = createApp(App);
app.config.productionTip = false;

app.use(router).use(Antd).mount("#app");
