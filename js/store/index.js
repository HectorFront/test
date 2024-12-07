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

    setStore(data) {
        this.store = { ...this.store, ...data };
        this.notify();
    }
}
