import { BASE_URL_API } from "../../../../domain/api.js";

export const RequestGETListPokemons = () => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL_API}/pokemon`)
            .then(response => response)
            .then(response => resolve(response.json()))
            .catch(err => reject(err));
    })
}