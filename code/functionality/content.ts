class PageContent extends PageElement {
    manager: PageManager;
    pages: Record<string, Page> = {};
    home: HomePage;
    projects: ProjectPage;
    search: SearchPage;
    codebase: CodebasePage;
    planner: PlannerPage;
    notes: NotesPage;

    constructor(manager: PageManager) {
        super();
        this.manager = manager;
        this.element.classList.add('content');

        this.home = new HomePage(this);
        this.projects = new ProjectPage(this);
        this.search = new SearchPage(this);
        this.codebase = new CodebasePage(this);
        this.planner = new PlannerPage(this);
        this.notes = new NotesPage(this);

        this.setParent(manager.element);        
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
        if (window.innerWidth <= 767) this.manager.shiftView(false);
    }
}