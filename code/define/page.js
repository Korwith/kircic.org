"use strict";
// abstract class which every page will branch off of
class Page extends PageElement {
    content;
    constructor(content) {
        super();
        this.content = content;
        this.element.classList.add('page');
        this.setParent(content);
    }
    toggle(force) {
        this.element.classList.toggle('show', force);
    }
}
// a "block" in the page dedicated for a specific purpose
class PageSegment extends PageElement {
    constructor(page) {
        super();
        this.element.classList.add('segment');
        this.setParent(page);
    }
    // add large text
    addHeader(text) {
        const header = document.createElement('h1');
        header.textContent = text;
        this.element.appendChild(header);
    }
    // add small text
    addDescription(text) {
        const description = document.createElement('span');
        description.textContent = text;
        this.element.appendChild(description);
    }
    // adds a link (glass)
    addLink(text, href) {
        const link = document.createElement('a');
        link.textContent = text;
        link.setAttribute('href', href);
        link.classList.add('glass', 'gradient', 'hoverchange');
        this.element.appendChild(link);
    }
    // hides the segment from view
    hide() {
        this.element.classList.add('hide');
    }
}
// by default the page segment has no visible background
// this adds the glass styling
class GlassPageSegment extends PageSegment {
    constructor(page) {
        super(page);
        this.element.classList.add('glass');
    }
}
