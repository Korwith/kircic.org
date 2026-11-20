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
    storage: SearchStorage = new SearchStorage();

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
        this.storage.save(data);
    }

    // bookmark widths can only be measured while visible
    public toggle(force?: boolean): void {
        super.toggle(force);
        this.bookmarks.handleButtonOverflow();
    }

    public getSavedSearchData(): SearchSaveData {
        return this.storage.fetch();
    }
}