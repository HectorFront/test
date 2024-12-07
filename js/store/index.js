export class Store {
    constructor() {
        this.store = {};
        this.listeners = [];
    }

    getStore() {
        return this.store;
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    notify() {
        this.listeners.forEach(callback => callback(this.store));
    }

    setStore(callbackStore) {
        if (typeof callbackStore === "function") {
            this.store = { ...this.store, ...callbackStore(this.store) };
        }
        if (typeof callbackStore === "object") {
            this.store = { ...this.store, ...callbackStore };
        }
        this.notify();
    }
}
