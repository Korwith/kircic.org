"use strict";
class StorageHandler {
    master_key;
    constructor(master_key) {
        this.master_key = master_key;
        this.#fixNullStorage();
    }
    getItem(key) {
        this.#fixNullStorage();
        let data = this.getDataObject();
        if (!data)
            return null;
        return data[key];
    }
    setItem(key, setData) {
        this.#fixNullStorage();
        let data = this.getDataObject();
        if (!data)
            return;
        data[key] = setData;
        localStorage.setItem(this.master_key, JSON.stringify(data));
    }
    removeItem(key) {
        this.#fixNullStorage();
        let data = this.getDataObject();
        if (!data)
            return;
        data[key] = null;
        localStorage.setItem(this.master_key, JSON.stringify(data));
    }
    initializeKeys(key_info) {
        for (var key in key_info) {
            let default_value = key_info[key];
            let found = this.getItem(key);
            if (found == null || found == undefined) {
                this.setItem(key, default_value);
            }
        }
    }
    delete() {
        localStorage.removeItem(this.master_key);
    }
    getDataObject() {
        let data = localStorage.getItem(this.master_key);
        if (!data)
            return null;
        try {
            return JSON.parse(data);
        }
        catch (error) {
            throw new Error('Error ' + error);
        }
    }
    #fixNullStorage() {
        let found = localStorage.getItem(this.master_key);
        if (!found) {
            localStorage.setItem(this.master_key, '{}');
        }
    }
}
