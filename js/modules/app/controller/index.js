import { ViewApp } from "../view/index.js";
import { ModelApp } from "../model/index.js";
import { StoreApp } from "../../app/index.js";

/* TODO Code review done in the near day after sleeping and drinking coffee very black, a discount for me please :) Kkkkk */

export class ControllerApp {
    constructor() {
        this.viewApp = new ViewApp();
        this.modelApp = new ModelApp();
        this.store = StoreApp.getStore();
        this.setBindMethods();
        this.observableStore();
        this.elementsInteractive = {
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
        if (indexPokemonSelected === null) {
            const indexCurrentPokemon = this.modelApp.getIndexNextImagePokemons(pokemons, indexPokemonSelected);
            const pokemon = pokemons[indexCurrentPokemon];
            this.modelApp.getImagePokemon(pokemon, urlImage => {
                this.viewApp.setImagePopup(this.elementsInteractive.popupImage, urlImage);
            });
        }
        this.viewApp.showPopup(event, this.elementsInteractive.popup);
    }

    handleNextImagePopup(_event) {
        const { pokemons, indexPokemonSelected = null } = this.store;
        const indexCurrentPokemon = this.modelApp.getIndexNextImagePokemons(pokemons, indexPokemonSelected);
        const pokemon = pokemons[indexCurrentPokemon];
        this.modelApp.getImagePokemon(pokemon, urlImage => {
            this.viewApp.setImagePopup(this.elementsInteractive.popupImage, urlImage);
        });
    }

    handleClosePopup(event) {
        this.viewApp.closePopup(event, this.elementsInteractive.popup);
    }

    setListeners() {
        this.elementsInteractive.buttonOpenPopup.addEventListener("click", this.handleShowPopup);
        this.elementsInteractive.buttonClosePopup.addEventListener("click", this.handleClosePopup);
        this.elementsInteractive.buttonUpdatePopup.addEventListener("click", this.handleNextImagePopup);
    }

    init() {
        this.modelApp.initStore();
        this.modelApp.getPokemons();
        this.setListeners();
    }
}