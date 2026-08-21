// abstract class which every page will branch off of
abstract class Page extends PageElement {
    content: PageContent;

    constructor(content: PageContent) {
        super();
        this.content = content;
        this.element.classList.add('page');
        this.setParent(content);
    }

    public toggle(force?: boolean): void {
        this.element.classList.toggle('show', force);
    }
}

// a "block" in the page dedicated for a specific purpose
abstract class PageSegment extends PageElement {
    constructor(page: Page) {
        super();
        this.element.classList.add('segment');
        this.setParent(page);
    }

    // add large text
    public addHeader(text: string): void {
        const header: HTMLElement = document.createElement('h1');
        header.textContent = text;
        this.element.appendChild(header);
    }

    // add small text
    public addDescription(text: string): void {
        const description: HTMLElement = document.createElement('span');
        description.textContent = text;
        this.element.appendChild(description);
    }

    // adds a link (glass)
    public addLink(text: string, href: string) {
        const link: HTMLElement = document.createElement('a');
        link.textContent = text;
        link.setAttribute('href', href);
        link.classList.add('glass', 'gradient', 'hoverchange');
        this.element.appendChild(link);
    }

    // hides the segment from view
    public hide(): void {
        this.element.classList.add('hide');
    }
}

// by default the page segment has no visible background
// this adds the glass styling
abstract class GlassPageSegment extends PageSegment {
    constructor(page: Page) {
        super(page);
        this.element.classList.add('glass');
    }
}