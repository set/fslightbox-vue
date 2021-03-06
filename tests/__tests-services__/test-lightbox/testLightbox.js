import Vue from "vue";
import { fsLightboxStore } from "../../../src/fsLightboxStore";

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

innerWidth = 1000;
innerHeight = 500;

export function renderTestLightboxUsingComponent(Component) {
    new Vue({
        el: "#app",
        render: h => h(Component)
    });

    return fsLightboxStore[0];
}
