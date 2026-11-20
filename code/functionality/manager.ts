/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

class PageManager {
    element: HTMLElement;
    header: PageHeader;
    sidebar: PageSidebar;
    content: PageContent;
    notifications: PageNotifications;

    constructor() {
        this.element = document.body;
        this.header = new PageHeader(this);
        this.sidebar = new PageSidebar(this);
        this.content = new PageContent(this);
        this.notifications = new PageNotifications(this);
    }

    // toggles sidebar.. mobile view.. etc
    // this is mostly handled in the various css files
    public shiftView(force?: boolean): void {
        this.element.classList.toggle('shift', force);
    }

}