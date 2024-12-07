export class ViewApp {
    constructor() {
        this.baseURLImages = './images';
        this.setBindMethods();
    }

    setBindMethods() {
        this.setImagePopup = this.setImagePopup.bind(this);
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