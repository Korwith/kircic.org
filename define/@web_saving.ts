class StorageHandler {
    master_key: string;

    constructor(master_key: string) {
        this.master_key = master_key;
        this.#fixNullStorage();
    }

    getItem(key: string): unknown|null {
        this.#fixNullStorage();
        let data: Record<string, unknown>|null = this.getDataObject();
        if (!data) return null;
        return data[key];
    }

    setItem(key: string, setData: any): void {
        this.#fixNullStorage();
        let data: Record<string, unknown>|null = this.getDataObject();
        if (!data) return;
        data[key] = setData;
        localStorage.setItem(this.master_key, JSON.stringify(data));

    }

    removeItem(key: string): void {
        this.#fixNullStorage();
        let data: Record<string, unknown>|null = this.getDataObject();
        if (!data) return;
        data[key] = null;
        localStorage.setItem(this.master_key, JSON.stringify(data));
    }

    initializeKeys(key_info: Record<string, string | string[] | boolean>): void {
        for (var key in key_info) {
            let default_value: string | string[] | boolean = key_info[key];
            let found: unknown | null = this.getItem(key);
            if (found == null || found == undefined) {
                this.setItem(key, default_value);
            }
        }
    }

    delete(): void {
        localStorage.removeItem(this.master_key);
    }

    getDataObject(): Record<string, unknown>|null {
        let data: string|null = localStorage.getItem(this.master_key);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch(error: unknown) {
            throw new Error('Error ' + error);
        }
    }

    #fixNullStorage(): void {
        let found = localStorage.getItem(this.master_key);
        if (!found) {
            localStorage.setItem(this.master_key, '{}');
        }
    }
}