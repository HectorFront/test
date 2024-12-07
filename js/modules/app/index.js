import { ControllerApp } from "./controller/index.js";
import { Store } from "../../store/index.js";

export const StoreApp = new Store();
const init = () => new ControllerApp().init();

window.onload = init;