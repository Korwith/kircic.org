/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

class PageContent extends PageElement {
    manager: PageManager;
    pages: Record<string, Page> = {};
    home: HomePage;
    projects: ProjectPage;
    search: SearchPage;
    codebase: CodebasePage;
    //planner: PlannerPage;
    notes: NotesPage;
    current?: string;

    constructor(manager: PageManager) {
        super();
        this.manager = manager;
        this.element.classList.add('content');

        this.home = new HomePage(this);
        this.projects = new ProjectPage(this);
        this.search = new SearchPage(this);
        this.codebase = new CodebasePage(this);
        //this.planner = new PlannerPage(this);
        this.notes = new NotesPage(this);

        this.setParent(manager.element);

        // open the page found in the url (#home, #projects, etc)
        this.loadFromURL();
        window.addEventListener('hashchange', () => this.loadFromURL());
    }

    public registerPage(key: string, page: Page): void {
        this.pages[key] = page;
        page.setParent(this.element);
    }

    public showPage(key: string) {
        for (const pageName in this.pages) {
            const foundPage: Page = this.pages[pageName];
            foundPage.toggle(key == pageName);
        }
        this.current = key;
        if (window.location.hash != `#${key}`) history.pushState(null, '', `#${key}`);
        if (window.innerWidth <= 767) this.manager.shiftView(false);
    }

    // opens the page matching the url hash
    // invalid hashes reset the url back to the current page
    public loadFromURL(): void {
        const key: string = decodeURIComponent(window.location.hash.slice(1));
        if (key == this.current) return;
        if (key in this.pages) return this.showPage(key);
        const url: string = this.current ? `#${this.current}` : window.location.pathname + window.location.search;
        history.replaceState(null, '', url);
    }
}