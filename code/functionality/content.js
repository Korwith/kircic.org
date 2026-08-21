"use strict";
class PageContent extends PageElement {
    manager;
    pages = {};
    home;
    projects;
    search;
    codebase;
    constructor(manager) {
        super();
        this.manager = manager;
        this.element.classList.add('content');
        this.home = new HomePage(this);
        this.projects = new ProjectPage(this);
        this.search = new SearchPage(this);
        this.codebase = new CodebasePage(this);
        this.setParent(manager.element);
    }
    registerPage(key, page) {
        this.pages[key] = page;
        page.setParent(this.element);
    }
    showPage(key) {
        for (const pageName in this.pages) {
            const foundPage = this.pages[pageName];
            foundPage.toggle(key == pageName);
        }
        if (window.innerWidth <= 767)
            this.manager.shiftView(false);
    }
}
