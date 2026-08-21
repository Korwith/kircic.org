"use strict";
class PageElement {
    element;
    constructor(tag) {
        this.element = document.createElement(tag || 'div');
    }
    setParent(parent) {
        if (parent instanceof PageElement)
            parent.element.appendChild(this.element);
        else
            parent.appendChild(this.element);
    }
}
class PageElementScroll extends PageElement {
    constructor(direction) {
        super();
        this.element.classList.add(`scroll_${direction}`);
    }
}
