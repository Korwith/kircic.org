"use strict";
// browser homepage
class SearchPage extends Page {
    bookmarks;
    search_holder;
    constructor(content) {
        super(content);
        this.content = content;
        this.bookmarks = new SearchBookmarkBar(this);
        this.search_holder = new SearchHolder(this);
        this.element.classList.add('search');
        content.registerPage('search', this);
    }
    // gathers data from the sub elements and puts them in a savable format
    // requests the save from the page manager
    saveSearchData() {
        const data = this.bookmarks.fetchSaveData();
        this.content.manager.saveData('search', data);
    }
    getSavedSearchData() {
        const data = this.content.manager.fetchData('search');
        return data;
    }
}
