"use strict";
class Page extends Pane {
    constructor(name, parent) {
        super(parent, CSS_FullSize);
        this.element.classList.add('page');
        this.element.setAttribute('page', name);
        ManagePages.registerPage(name, this);
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
    PageIndex;
    constructor() {
        this.PageIndex = {};
    }
    registerPage(name, page) {
        this.PageIndex[name] = page;
    }
    getPage(name) {
        return this.PageIndex[name];
    }
    getPageCount() {
        return Object.keys(this.PageIndex).length;
    }
    showPage(name) {
        let keys = Object.keys(this.PageIndex);
        for (var i = 0; i < keys.length; i++) {
            let found_name = keys[i];
            let found_page = this.getPage(found_name);
            if (!found_page)
                continue;
            if (found_name == name)
                found_page.showPage();
            else
                found_page.hidePage();
        }
    }
}
const ManagePages = new PageManagement();
