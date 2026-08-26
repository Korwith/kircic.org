class NotesPage extends Page {
    constructor(content: PageContent) {
        super(content);
        this.element.classList.add('notes');
        this.content.registerPage('notes', this);
    }
}