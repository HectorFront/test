class MainAlce {
    constructor() {
        this.btnOpenPopupElement = document.querySelector(".btn-popup");
        this.popupElement = document.querySelector(`.popup`);
    }

    setListeners() {
        
    }

    showPopup() {
        this.popupElement.style.display = 'block';
    }

    closePopup() {
        this.popupElement.style.display = 'none';
    }
}