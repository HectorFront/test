import { StoreApp } from "../../app/index.js";
import { ModelApp } from "../model/index.js";

export class ViewApp {
    constructor() {
        this.modelApp = new ModelApp();
        this.store = StoreApp.getStore();
        this.baseURLImages = './images';
        this.setBindMethods();
        this.observableStore();
    }

    setBindMethods() {
        this.setImagePopup = this.setImagePopup.bind(this);
    }

    observableStore() {
        StoreApp.subscribe(updatedStore => {
            this.store = updatedStore;
        });
    }

    showPopup(_event, elementPopup) {
        elementPopup.style.visibility = 'visible';
    }

    setImagePopup(elementPopupImage, source) {
        elementPopupImage.src = source;
        elementPopupImage.onerror = () => elementPopupImage.src = `${this.baseURLImages}/ops.png`;
    }

    closePopup(_event, elementPopup) {
        elementPopup.style.visibility = 'hidden';
    }
}