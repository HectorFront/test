import { ViewApp } from "../view/index.js";
import { ModelApp } from "../model/index.js";
import { StoreApp } from "../../app/index.js";

export class ControllerApp {
    constructor() {
        this.viewApp = new ViewApp();
        this.modelApp = new ModelApp();
        this.store = StoreApp.getStore();
        this.setBindMethods();
        this.observableStore();
        this.elements = {
            popup: document.querySelector(".popup"),
            popupImage: document.querySelector(".content-popup-image"),
            buttonOpenPopup: document.querySelector(".btn-open-popup"),
            buttonClosePopup: document.querySelector(".btn-close-popup"),
            buttonUpdatePopup: document.querySelector(".btn-update-popup")
        };
    }

    observableStore() {
        StoreApp.subscribe(updatedStore => {
            this.store = updatedStore;
        });
    }

    setBindMethods() {
        this.setListeners = this.setListeners.bind(this);
        this.handleShowPopup = this.handleShowPopup.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
        this.handleNextImagePopup = this.handleNextImagePopup.bind(this);
    }

    handleShowPopup(event) {
        const { pokemons, indexPokemonSelected = null } = this.store;
        if (!indexPokemonSelected) {
            const indexCurrentPokemon = this.modelApp.getIndexNextImagePokemons(pokemons, indexPokemonSelected);
            const pokemon = pokemons[indexCurrentPokemon];
            this.modelApp.getImagePokemon(pokemon, urlImage => {
                this.viewApp.setImagePopup(this.elements.popupImage, urlImage);
            });
        }
        this.viewApp.showPopup(event, this.elements.popup);
    }

    handleNextImagePopup(_event) {
        const { pokemons, indexPokemonSelected = null } = this.store;
        const indexCurrentPokemon = this.modelApp.getIndexNextImagePokemons(pokemons, indexPokemonSelected);
        const pokemon = pokemons[indexCurrentPokemon];
        this.modelApp.getImagePokemon(pokemon, urlImage => {
            this.viewApp.setImagePopup(this.elements.popupImage, urlImage);
        });
    }

    handleClosePopup(event) {
        this.viewApp.closePopup(event, this.elements.popup);
    }

    setListeners() {
        this.elements.buttonOpenPopup.addEventListener("click", this.handleShowPopup);
        this.elements.buttonClosePopup.addEventListener("click", this.handleClosePopup);
        this.elements.buttonUpdatePopup.addEventListener("click", this.handleNextImagePopup);
    }

    init() {
        this.modelApp.initStore();
        this.modelApp.getPokemons();
        this.setListeners();
    }
}