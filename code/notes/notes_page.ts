class NotesPage extends Page {
    input_holder: NoteInputHolder;
    display_holder: NoteDisplayHolder;

    constructor(content: PageContent) {
        super(content);
        this.input_holder = new NoteInputHolder(this);
        this.display_holder = new NoteDisplayHolder(this);

        this.element.classList.add('notes');
        this.content.registerPage('notes', this);
    }
}

class NoteInputHolder extends PageSegment {
    page: NotesPage;
    selector: NoteInputSelector;

    constructor(page: NotesPage) {
        super(page);
        this.page = page;
        this.selector = new NoteInputSelector(this);
        this.element.classList.add('input_holder');
        this.setParent(page);
    }
}

class NoteDisplayHolder extends GlassPageSegment {
    page: NotesPage;

    constructor(page: NotesPage) {
        super(page);
        this.page = page;
        this.element.classList.add('display_holder');
        this.setParent(page);
    }
}