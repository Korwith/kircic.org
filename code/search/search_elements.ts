// holds all the various boxes for different search engines
class SearchHolder extends GlassPageSegment {
    page: SearchPage;

    constructor(page: SearchPage) {
        super(page);
        this.page = page;
        this.element.classList.add('search_holder', 'glass');

        this.addHeader('Search');
        this.addDescription('Browser Homepage');
        this.addSearchBars();
        this.setParent(this.page);
    }

    // adds the SearchBar elements
    protected addSearchBars(): void {
        for (const data of SearchInfo) new SearchBar(this, data);
    }
}

// the actual bar, each search engine gets one
// displayed in a search holder
class SearchBar extends PageElement {
    holder: SearchHolder;
    logo: HTMLElement;
    input: HTMLInputElement; // Typed as HTMLInputElement to access .value
    go: HTMLElement;
    search_url: string = '';

    constructor(holder: SearchHolder, data: SearchEntryInfo) {
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
        this.input.onkeydown = (e: KeyboardEvent) => this.keydown(e);
        
        // Click listener on the go button
        this.go.onclick = () => this.executeSearch();

        this.element.appendChild(this.logo);
        this.element.appendChild(this.input);
        this.element.appendChild(this.go);
        this.setParent(this.holder);
    }

    // does all the specific styling based on the different service
    protected propogate(data: SearchEntryInfo): void {
        this.search_url = data.search_url;
        this.logo.style.setProperty('--icon-url', `url(${data.image.icon})`);
        this.logo.style.setProperty('--icon-size', data.image.size || null);
        this.logo.setAttribute('href', data.base_url);
        this.input.setAttribute('id', data.name);
        this.input.setAttribute('placeholder', `Search ${data.name}`);
    }

    // triggers search on enter key press
    protected keydown(e: KeyboardEvent): void {
        if (e.key === 'Enter') {
            this.executeSearch();
        }
    }

    // constructs the URL and opens the search page
    protected executeSearch(): void {
        const query = this.input.value.trim();
        if (!query) return;

        const target_url = this.search_url + encodeURIComponent(query);
        window.open(target_url, '_blank');
    }
}

// displayed at the top of the search page
// user can bookmark various pages
class SearchBookmarkBar extends GeneralBookmarkBar {
    page: SearchPage;
    input: BookmarkInputBox;
    plus: BookmarkButtonPlus;
    trash: BookmarkButtonTrash;

    constructor(page: SearchPage) {
        super(page);
        this.page = page;
        this.input = new SearchBookmarkInput(this);
        this.plus = new SearchBookmarkPlus(this)
        this.trash = new SearchBookmarkDelete(this);
        this.loadPreviousSave();
    }

    // gathers and returns bookmark url data for saving
    public fetchSaveData(): SearchSaveData {
        let save_data: SearchSaveData = {
            bookmarks: [],
            searches: [],
        };

        for (const button of this.buttons) {
            if (button instanceof BookmarkButtonWebsite) save_data.bookmarks.push(button.fetchBookmarkLink());
            if (button instanceof BookmarkButtonSearch) save_data.searches.push(button.fetchSearchData());
        }

        return save_data;
    }

    // loads data from the previous save
    protected loadPreviousSave(): void {
        const save_data: SearchSaveData = this.page.getSavedSearchData();
        if (!save_data) return;
        for (const url of save_data.bookmarks) this.addURL(url);
        // handle saved search terms later
    }

    // adds a bookmark
    public addURL(force?: string): void {
        const url: string = this.formatLink(force || this.input.getText());
        if (!this.isLinkValid(url)) throw new Error('Invalid Link');

        const button: BookmarkButton = new BookmarkButtonWebsite(this, url);
        this.buttons.push(button);

        console.log(this.input)
        this.input.reset();

        if (!force) this.page.saveSearchData();
    }

    // toggles delete mode
    public toggleDelete(): void {
        this.element.classList.toggle('deletion');
    }

    // makes sure a link has https:// so it opens an external page
    public formatLink(text: string): string {
        const trim: string = text.trim();
        const correct: boolean = trim.startsWith('https://') || trim.startsWith('http://');
        return correct ? trim : `https://${trim}`;
    }

    // makes a link look like: google.com, for display
    public cleanLink(text: string): string {
        const formatted = text.match(/^https?:\/\//i) 
            ? text 
            : `https://${text}`;
        const host: string = new URL(formatted).hostname;
        const parts: string[] = host.split('.');
        return parts.join('.');
    }

    // determines if a url is actually valid
    public isLinkValid(text: string): boolean {
        try {
            const url = new URL(text);
            return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.');
        } catch {
            return false;
        }
    }
}

// the user inputs the website url here
class SearchBookmarkInput extends BookmarkInputBox {
    bookmarks: SearchBookmarkBar;

    constructor(bar: SearchBookmarkBar) {
        super(bar);
        this.bookmarks = bar;
        this.element.onkeydown = (e: KeyboardEvent) => this.changed(e);
        this.element.onkeyup = (e: KeyboardEvent) => this.changed(e);
    }

    // handles if the placeholder text is visible or not
    // rejects newlines
    protected changed(e: KeyboardEvent): void {
        if (e.key == 'Enter' && e.type == 'keydown') {
            e.preventDefault();
            if (e.type == 'keydown') this.bookmarks.addURL();
        }
        this.element.classList.toggle('empty', this.element.textContent.length < 1);
    }
}

class SearchBookmarkPlus extends BookmarkButtonPlus {
    bookmarks: SearchBookmarkBar;

    constructor(bar: SearchBookmarkBar) {
        super(bar);
        this.bookmarks = bar;
    }

    public onclick() {
        this.bookmarks.addURL();
    }
}

class SearchBookmarkDelete extends BookmarkButtonTrash {
    bookmarks: SearchBookmarkBar;

    constructor(bar: SearchBookmarkBar) {
        super(bar);
        this.bookmarks = bar;
    }

    onclick(): void {
        this.bookmarks.toggleDelete();
    }
}

// bookmarked website entry
class BookmarkButtonWebsite extends BookmarkButton {
    link: string;
    bookmarks: SearchBookmarkBar;

    constructor(bar: SearchBookmarkBar, link: string) {
        super(bar, 'a');
        this.bookmarks = bar;
        this.link = link;
        this.element.classList.add('gradient', 'hoverchange');
        this.element.textContent = this.bookmarks.cleanLink(link);
        this.element.setAttribute('href', this.bookmarks.formatLink(link));
        this.setButtonImage(link);
    }

    private async setButtonImage(link: string): Promise<void> {
        const favicon: string = this.getFaviconURL(link);
        this.element.classList.add('loading');

        const status = await this.testWebsiteFavicon(link);
        this.element.classList.remove('loading');
        this.element.style.setProperty('--icon-url', status ? `url(${favicon})` : null);
    }

    private async testWebsiteFavicon(link: string): Promise<boolean> {
        return new Promise((resolve) => {
            const temp_image: HTMLImageElement = document.createElement('img');
            temp_image.onload = () => {
                const is_default: boolean = temp_image.naturalWidth == 16 && temp_image.naturalHeight == 16;
                resolve(!is_default);
            };
            temp_image.onerror = () => resolve(false);
            temp_image.src = this.getFaviconURL(link);
        });
    }

    private getFaviconURL(link: string): string {
        return `https://www.google.com/s2/favicons?domain=${link}&sz=${64}`;
    }

    public fetchBookmarkLink(): string {
        return this.link;
    }

    // it's already a link element
    // no need to complicate
    onclick(): void { };
}


// saved search entry
class BookmarkButtonSearch extends BookmarkButton {
    service: string;
    term: string;

    constructor(bar: SearchBookmarkBar, service: string, term: string) {
        super(bar, 'a');
        this.service = service;
        this.term = term;
    }

    fetchSearchData(): {service: string, term: string} {
        return {
            service: this.service,
            term: this.term
        }
    }

    // see comment on previous class
    onclick(): void { };
}
