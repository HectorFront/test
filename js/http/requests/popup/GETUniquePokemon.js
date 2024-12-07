import { BASE_URL_API } from "../../../../domain/api.js";

export const RequestGETUniquePokemon = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL_API}/pokemon/${id}`)
            .then(response => response)
            .then(response => resolve(response.json()))
            .catch(err => reject(err));
    })
}