// Copyright (c) 2026 Thaddeus MW.
//

// abstract base for anything saved to localStorage
// each subclass is bound to a single key within the 'data' object
abstract class SaveStorage<T> {
    abstract key: string;

    // attempts to save the given data under this key
    // resaves previous data.. appends new key
    public save(data: T): void {
        try {
            const previous_data: string = window.localStorage.getItem('data') || '{}';
            let data_object: Record<string, Object> = JSON.parse(previous_data);
            data_object[this.key] = data as Object;
            window.localStorage.setItem('data', JSON.stringify(data_object));
        } catch(error: any) {
            throw new Error(error);
        }
    }

    // fetches the data under this key for loading
    public fetch(): T {
        try {
            const previous_data: string = window.localStorage.getItem('data') || '{}';
            return JSON.parse(previous_data)[this.key];
        } catch(error: any) {
            throw new Error(error);
        }
    }
}

class NotesStorage extends SaveStorage<NotesSaveData> { key = 'notes'; }
class SearchStorage extends SaveStorage<SearchSaveData> { key = 'search'; }
class SettingsStorage extends SaveStorage<SettingsSaveData> { key = 'settings'; }
