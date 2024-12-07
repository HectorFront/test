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
            cacheImagePokemons: {},
            indexPokemonSelected: null
        });
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
        this.getImagePokemonCache = this.getImagePokemonCache.bind(this);
    }

    getIdPokemonURLBase(url) {
        return url.split("/pokemon/")[1].replaceAll("/", "");
    }

    getIndexNextImagePokemons(pokemons, indexPokemonSelected) {
        const lastIndex = pokemons.length - 1;
        let indexPokemonCurrent = indexPokemonSelected;
        if (indexPokemonCurrent == null || indexPokemonCurrent === lastIndex) {
            indexPokemonCurrent = 0;
        } else {
            indexPokemonCurrent += 1;
        }
        StoreApp.setStore({ indexPokemonSelected: indexPokemonCurrent });
        return indexPokemonCurrent;
    }

    getImagePokemonCache(idPokemon) {
        const { cacheImagePokemons } = this.store;
        if (cacheImagePokemons.hasOwnProperty(idPokemon)) {
            return cacheImagePokemons[idPokemon];
        }
        return null;
    }

    getImagePokemon(pokemon, callbackImage = () => {}) {
        if (pokemon) {
            const idPokemon = this.getIdPokemonURLBase(pokemon?.url);
            const URLImageCache = this.getImagePokemonCache(idPokemon);
            if (URLImageCache) {
                callbackImage(URLImageCache);
            } else {
                this.getUniquePokemon(idPokemon)
                    .then(detailsPokemon => {
                        const URLImage = detailsPokemon?.sprites?.front_default;
                        StoreApp.setStore(({ cacheImagePokemons }) => {
                            return { cacheImagePokemons: { ...cacheImagePokemons, [idPokemon]: URLImage } }
                        })
                        callbackImage(URLImage);
                    }).catch(_err => {});
            }
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