type PageName = 'home' | 'projects' | 'search' | 'codebase' | 'plugins';
type PageClass = Page | CodebasePage | SearchPage

interface PageDictionary {
    [key: string]: Page;
}

class Page extends Pane {
    constructor(name: PageName, parent: HTMLElement) {
        super(parent, CSS_FullSize);
        this.element.classList.add('page');
        this.element.setAttribute('page', name);
        ManagePages.registerPage(name as PageName, this);

        if (ManagePages.getPageCount() == 1) {
            this.showPage();
        }
    }

    showPage() {
        this.element.classList.add('show');
    }

    hidePage() {
        this.element.classList.remove('show');
    }
}

class PageManagement {
    PageIndex: PageDictionary;
    
    constructor() {
        this.PageIndex = {};
    }

    registerPage(name: PageName, page: PageClass): void {
        this.PageIndex[name] = page;
    }

    getPage(name: PageName): PageClass | null {
        return this.PageIndex[name];
    }

    getPageCount(): number {
        return Object.keys(this.PageIndex).length;
    }

    showPage(name: PageName): void {
        let keys = Object.keys(this.PageIndex);
        for (var i = 0; i < keys.length; i++) {
            let found_name: PageName = keys[i] as PageName;
            let found_page: PageClass | null = this.getPage(found_name);
            if (!found_page) continue;
            if (found_name == name) found_page.showPage();
            else found_page.hidePage();
        }
    }
}

const ManagePages: PageManagement = new PageManagement();