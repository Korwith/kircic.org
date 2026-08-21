"use strict";
// holds all the various boxes for different search engines
class SearchHolder extends GlassPageSegment {
    page;
    constructor(page) {
        super(page);
        this.page = page;
        this.element.classList.add('search_holder', 'glass');
        this.addHeader('Search');
        this.addDescription('Browser Homepage');
        this.addSearchBars();
        this.setParent(this.page);
    }
    // adds the SearchBar elements
    addSearchBars() {
        for (const data of SearchInfo)
            new SearchBar(this, data);
    }
}
// the actual bar, each search engine gets one
// displayed in a search holder
class SearchBar extends PageElement {
    holder;
    logo;
    input; // Typed as HTMLInputElement to access .value
    go;
    search_url = '';
    constructor(holder, data) {
        super();
        this.holder = holder;
        this.logo = document.createElement('a');
        this.input = document.createElement('input');
        this.go = document.createElement('button');
        this.element.classList.add('search_entry');
        this.logo.classList.add('logo', 'glass', 'gradient', 'hoverchange');
        this.input.classList.add('box', 'glass', 'dark');
        this.go.classList.add('go', 'glass', 'gradient', 'hoverchange');
        this.propogate(data);
        // Keydown listener on the input field
        this.input.onkeydown = (e) => this.keydown(e);
        // Click listener on the go button
        this.go.onclick = () => this.executeSearch();
        this.element.appendChild(this.logo);
        this.element.appendChild(this.input);
        this.element.appendChild(this.go);
        this.setParent(this.holder);
    }
    // does all the specific styling based on the different service
    propogate(data) {
        this.search_url = data.search_url;
        this.logo.style.setProperty('--icon-url', `url(${data.image.icon})`);
        this.logo.style.setProperty('--icon-size', data.image.size || null);
        this.logo.setAttribute('href', data.base_url);
        this.input.setAttribute('id', data.name);
        this.input.setAttribute('placeholder', `Search ${data.name}`);
    }
    // triggers search on enter key press
    keydown(e) {
        if (e.key === 'Enter') {
            this.executeSearch();
        }
    }
    // constructs the URL and opens the search page
    executeSearch() {
        const query = this.input.value.trim();
        if (!query)
            return;
        const target_url = this.search_url + encodeURIComponent(query);
        window.open(target_url, '_blank');
    }
}
// displayed at the top of the search page
// user can bookmark various pages
class SearchBookmarkBar extends GeneralBookmarkBar {
    page;
    input;
    plus;
    trash;
    constructor(page) {
        super(page);
        this.page = page;
        this.input = new SearchBookmarkInput(this);
        this.plus = new SearchBookmarkPlus(this);
        this.trash = new SearchBookmarkDelete(this);
        this.loadPreviousSave();
    }
    // gathers and returns bookmark url data for saving
    fetchSaveData() {
        let save_data = {
            bookmarks: [],
            searches: [],
        };
        for (const button of this.buttons) {
            if (button instanceof BookmarkButtonWebsite)
                save_data.bookmarks.push(button.fetchBookmarkLink());
            if (button instanceof BookmarkButtonSearch)
                save_data.searches.push(button.fetchSearchData());
        }
        return save_data;
    }
    // loads data from the previous save
    loadPreviousSave() {
        const save_data = this.page.getSavedSearchData();
        if (!save_data)
            return;
        for (const url of save_data.bookmarks)
            this.addURL(url);
        // handle saved search terms later
    }
    // adds a bookmark
    addURL(force) {
        const url = this.formatLink(force || this.input.getText());
        if (!this.isLinkValid(url))
            throw new Error('Invalid Link');
        const button = new BookmarkButtonWebsite(this, url);
        this.buttons.push(button);
        console.log(this.input);
        this.input.reset();
        if (!force)
            this.page.saveSearchData();
    }
    // toggles delete mode
    toggleDelete() {
        this.element.classList.toggle('deletion');
    }
    // makes sure a link has https:// so it opens an external page
    formatLink(text) {
        const trim = text.trim();
        const correct = trim.startsWith('https://') || trim.startsWith('http://');
        return correct ? trim : `https://${trim}`;
    }
    // makes a link look like: google.com, for display
    cleanLink(text) {
        const formatted = text.match(/^https?:\/\//i)
            ? text
            : `https://${text}`;
        const host = new URL(formatted).hostname;
        const parts = host.split('.');
        return parts.join('.');
    }
    // determines if a url is actually valid
    isLinkValid(text) {
        try {
            const url = new URL(text);
            return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.');
        }
        catch {
            return false;
        }
    }
}
// the user inputs the website url here
class SearchBookmarkInput extends BookmarkInputBox {
    bookmarks;
    constructor(bar) {
        super(bar);
        this.bookmarks = bar;
        this.element.onkeydown = (e) => this.changed(e);
        this.element.onkeyup = (e) => this.changed(e);
    }
    // handles if the placeholder text is visible or not
    // rejects newlines
    changed(e) {
        if (e.key == 'Enter' && e.type == 'keydown') {
            e.preventDefault();
            if (e.type == 'keydown')
                this.bookmarks.addURL();
        }
        this.element.classList.toggle('empty', this.element.textContent.length < 1);
    }
}
class SearchBookmarkPlus extends BookmarkButtonPlus {
    bookmarks;
    constructor(bar) {
        super(bar);
        this.bookmarks = bar;
    }
    onclick() {
        this.bookmarks.addURL();
    }
}
class SearchBookmarkDelete extends BookmarkButtonTrash {
    bookmarks;
    constructor(bar) {
        super(bar);
        this.bookmarks = bar;
    }
    onclick() {
        this.bookmarks.toggleDelete();
    }
}
// bookmarked website entry
class BookmarkButtonWebsite extends BookmarkButton {
    link;
    bookmarks;
    constructor(bar, link) {
        super(bar, 'a');
        this.bookmarks = bar;
        this.link = link;
        this.element.classList.add('gradient', 'hoverchange');
        this.element.textContent = this.bookmarks.cleanLink(link);
        this.element.setAttribute('href', this.bookmarks.formatLink(link));
        this.setButtonImage(link);
    }
    async setButtonImage(link) {
        const favicon = this.getFaviconURL(link);
        this.element.classList.add('loading');
        const status = await this.testWebsiteFavicon(link);
        this.element.classList.remove('loading');
        this.element.style.setProperty('--icon-url', status ? `url(${favicon})` : null);
    }
    async testWebsiteFavicon(link) {
        return new Promise((resolve) => {
            const temp_image = document.createElement('img');
            temp_image.onload = () => {
                const is_default = temp_image.naturalWidth == 16 && temp_image.naturalHeight == 16;
                resolve(!is_default);
            };
            temp_image.onerror = () => resolve(false);
            temp_image.src = this.getFaviconURL(link);
        });
    }
    getFaviconURL(link) {
        return `https://www.google.com/s2/favicons?domain=${link}&sz=${64}`;
    }
    fetchBookmarkLink() {
        return this.link;
    }
    // it's already a link element
    // no need to complicate
    onclick() { }
    ;
}
// saved search entry
class BookmarkButtonSearch extends BookmarkButton {
    service;
    term;
    constructor(bar, service, term) {
        super(bar, 'a');
        this.service = service;
        this.term = term;
    }
    fetchSearchData() {
        return {
            service: this.service,
            term: this.term
        };
    }
    // see comment on previous class
    onclick() { }
    ;
}
