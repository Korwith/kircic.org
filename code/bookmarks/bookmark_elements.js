"use strict";
class GeneralBookmarkBar extends PageSegment {
    page;
    buttons = [];
    constructor(page) {
        super(page);
        this.page = page;
        this.element.classList.add('bookmarks', 'no_padding');
        // this.loadPreviousSave();
        this.setParent(page);
    }
}
// general input box for varying bookmark things
class BookmarkInputBox extends PageElement {
    bookmarks;
    constructor(bar) {
        super('strong');
        this.bookmarks = bar;
        this.element.classList.add('glass', 'empty');
        this.element.setAttribute('contenteditable', 'true');
        this.element.setAttribute('placeholder', 'Add Page...');
        this.setParent(bar);
    }
    // called to get textcontent
    getText() {
        return this.element.textContent.trim();
    }
    // clears previous text
    reset() {
        this.element.textContent = null;
        this.element.classList.add('empty');
    }
}
// general class for buttons found in bookmark segment
class BookmarkButton extends PageElement {
    bookmarks;
    constructor(bar, tag) {
        super(tag || 'button');
        this.bookmarks = bar;
        this.element.classList.add('bookmark_button', 'glass');
        this.setParent(bar);
    }
}
// same as above.. except square
class BookmarkButtonSquare extends BookmarkButton {
    constructor(bar, tag) {
        super(bar, tag);
        this.element.classList.add('square');
    }
}
// user clicks this to add web url
class BookmarkButtonPlus extends BookmarkButtonSquare {
    constructor(bar) {
        super(bar);
        this.element.classList.add('plus');
        this.element.onclick = () => this.onclick();
    }
}
// toggles delete mode inside of bookmark pane
class BookmarkButtonTrash extends BookmarkButtonSquare {
    constructor(bar) {
        super(bar);
        this.element.classList.add('trash');
        this.element.onclick = () => this.onclick();
    }
}
