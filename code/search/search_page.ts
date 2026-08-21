interface SearchSaveData {
    bookmarks: string[];
    searches: SavedSearch[];
}

interface SavedSearch {
    term: string;
    service: string;
}

// browser homepage
class SearchPage extends Page {
    bookmarks: SearchBookmarkBar;
    search_holder: SearchHolder;

    constructor(content: PageContent) {
        super(content);
        this.content = content;
        this.bookmarks = new SearchBookmarkBar(this);
        this.search_holder = new SearchHolder(this);
        this.element.classList.add('search');
        content.registerPage('search', this);
    }

    // gathers data from the sub elements and puts them in a savable format
    // requests the save from the page manager
    public saveSearchData(): void {
        const data: SearchSaveData = this.bookmarks.fetchSaveData();
        this.content.manager.saveData('search', data);
    }

    public getSavedSearchData(): SearchSaveData {
        const data: SearchSaveData = this.content.manager.fetchData('search') as SearchSaveData;
        return data;
    }
}