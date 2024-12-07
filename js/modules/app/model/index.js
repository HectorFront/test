import { StoreApp } from "../../app/index.js";
import { RequestGETListPokemons, RequestGETUniquePokemon } from "../../../http/index.js";

export class ModelApp {
    constructor() {
        this.store = StoreApp.getStore();
        this.setBindMethods();
        this.observableStore();
    }

    initStore() {
        StoreApp.setStore({ 
            pokemons: [],
            indexPokemonSelected: null
        })
    }

    observableStore() {
        StoreApp.subscribe(updatedStore => {
            this.store = updatedStore;
        });
    }

    setBindMethods() {
        this.getImagePokemon = this.getImagePokemon.bind(this);
        this.getUniquePokemon = this.getUniquePokemon.bind(this);
        this.getIdPokemonURLBase = this.getIdPokemonURLBase.bind(this);
    }

    getIdPokemonURLBase(url) {
        return url.split("/pokemon/")[1].replaceAll("/", "");
    }
    
    getIndexNextImagePokemons(pokemons, indexPokemonSelected) {
        const lastIndexPokemonts = pokemons.length - 1;
        let indexPokemonCurrent = indexPokemonSelected;
        if (indexPokemonCurrent == null || indexPokemonCurrent === lastIndexPokemonts) {
            indexPokemonCurrent = 0;
        } else {
            indexPokemonCurrent += 1;
        }
        StoreApp.setStore({ indexPokemonSelected: indexPokemonCurrent });
        return indexPokemonCurrent;
    }

    getImagePokemon(pokemon, callbackImage = () => {}) {
        if (pokemon) {
            const idPokemon = this.getIdPokemonURLBase(pokemon?.url);
            this.getUniquePokemon(idPokemon)
            .then(details => {
                callbackImage(details?.sprites?.front_default)
            }).catch(_err => {});
        } else {
            callbackImage(null);
        }
    }

    getPokemons() {
        return new Promise((resolve, reject) => {
            RequestGETListPokemons()
                .then(({ results }) => {
                    StoreApp.setStore({ pokemons: results })
                    resolve(results);
                }).catch(err => reject(err));
        });
    }

    getUniquePokemon(idPokemon) {
        return new Promise((resolve, reject) => {
            RequestGETUniquePokemon(idPokemon)
                .then((pokemonSelected) => {
                    StoreApp.setStore({ pokemonSelected })
                    resolve(pokemonSelected);
                })
                .catch(err => reject(err));
        });
    }
}