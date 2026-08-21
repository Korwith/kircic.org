"use strict";
class PageManager {
    element;
    header;
    sidebar;
    content;
    notifications;
    constructor() {
        this.element = document.body;
        this.header = new PageHeader(this);
        this.sidebar = new PageSidebar(this);
        this.content = new PageContent(this);
        this.notifications = new PageNotifications(this);
    }
    // toggles sidebar.. mobile view.. etc
    // this is mostly handled in the various css files
    shiftView(force) {
        this.element.classList.toggle('shift', force);
    }
    // attempts to save the current page configuration with a given key
    // resaves previous data.. appends new key
    saveData(key, data) {
        try {
            const previous_data = window.localStorage.getItem('data') || '{}';
            let data_object = JSON.parse(previous_data);
            data_object[key] = data;
            const new_data = JSON.stringify(data_object);
            window.localStorage.setItem('data', new_data);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    // fetches a given key for loading
    fetchData(key) {
        try {
            const previous_data = window.localStorage.getItem('data') || '{}';
            let data_object = JSON.parse(previous_data);
            return data_object[key];
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
