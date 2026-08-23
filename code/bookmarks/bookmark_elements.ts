abstract class GeneralBookmarkBar extends PageSegment {
    page: Page;
    buttons: BookmarkButton[] = [];

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.element.classList.add('bookmarks', 'no_padding');

        // this.loadPreviousSave();
        this.setParent(page);
    }

    public toggleDeletion(): void {
        this.element.classList.toggle('deletion');
    }

    public inDeleteMode(): boolean {
        return this.element.classList.contains('deletion');
    }

    public delete(entry: BookmarkButton) {
        const found: number = this.buttons.indexOf(entry);
        if (found === -1) return;
        this.buttons.splice(found, 1);
        entry.element.remove();
        this.handleButtonOverflow();
        this.requestSave();
    }

    protected abstract handleButtonOverflow(): void;
    public abstract fetchSaveData(): any; // add specific later
    protected abstract loadPreviousSave(): void;
    protected abstract requestSave(): void;
}

// general input box for varying bookmark things
abstract class BookmarkInputBox extends PageElement {
    bookmarks: GeneralBookmarkBar;

    constructor(bar: GeneralBookmarkBar) {
        super('strong');
        this.bookmarks = bar;
        this.element.classList.add('glass', 'empty');
        this.element.setAttribute('contenteditable', 'true');
        this.element.setAttribute('placeholder', 'Add Page...');
        this.setParent(bar);
    }

    // called to get textcontent
    public getText(): string {
        return this.element.textContent.trim();
    }

    // clears previous text
    public reset(): void {
        this.element.textContent = null;
        this.element.classList.add('empty');
    }

    protected abstract changed(e: KeyboardEvent): void;
}

// general class for buttons found in bookmark segment
abstract class BookmarkButton extends PageElement {
    bookmarks: GeneralBookmarkBar;

    constructor(bar: GeneralBookmarkBar, tag?: string) {
        super(tag || 'button');
        this.bookmarks = bar;
        this.element.classList.add('bookmark_button', 'glass');
        this.setParent(bar);
    }

    public delete(): void {
        this.bookmarks.delete(this);
    }

    // on click
    abstract onclick(): void;
    abstract toggleDeletionMode(deletion: boolean): void;
}

// same as above.. except square
abstract class BookmarkButtonSquare extends BookmarkButton {
    constructor(bar: GeneralBookmarkBar, tag?: string) {
        super(bar, tag);
        this.element.classList.add('square');
    }

    abstract onclick(): void;
}

// user clicks this to add web url
abstract class BookmarkButtonPlus extends BookmarkButtonSquare {
    constructor(bar: GeneralBookmarkBar) {
        super(bar);
        this.element.classList.add('plus');
        this.element.onclick = () => this.onclick();
    }
}

// toggles delete mode inside of bookmark pane
abstract class BookmarkButtonTrash extends BookmarkButtonSquare {
    constructor(bar: SearchBookmarkBar) {
        super(bar);
        this.element.classList.add('trash');
        this.element.onclick = () => this.onclick();
    }
}