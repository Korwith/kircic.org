abstract class PageElement {
    element: HTMLElement;

    constructor(tag?: string) {
        this.element = document.createElement(tag || 'div')
    }

    setParent(parent: PageElement | HTMLElement) {
        if (parent instanceof PageElement) parent.element.appendChild(this.element);
        else parent.appendChild(this.element);
    }
}

abstract class PageElementScroll extends PageElement {
    constructor(direction: 'x' | 'y') {
        super();
        this.element.classList.add(`scroll_${direction}`);
    }
}