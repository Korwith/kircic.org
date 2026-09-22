/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

// page dedicated for note-taking
class NotesPage extends Page {
    bookmark_pane: NoteBookmarkPane;
    segment_holder: NotesSegmentHolder;

    constructor(content: PageContent) {
        super(content);
        this.bookmark_pane = new NoteBookmarkPane(this);
        this.segment_holder = new NotesSegmentHolder(this);

        this.element.classList.add('notes');
        this.content.registerPage('notes', this);
    }
}

// holds the major two segments
// left half: user input
// right half: finished note display
class NotesSegmentHolder extends PageSegment {
    input_holder: NoteInputHolder;
    display_holder: NoteDisplayHolder;

    constructor(page: NotesPage) {
        super(page);
        this.element.classList.add('segment_holder');
        this.input_holder = new NoteInputHolder(this);
        this.display_holder = new NoteDisplayHolder(this);
    }
}

// user input segment
class NoteInputHolder extends PageElement {
    editor: NoteEditor;
    option_list: NoteOptionList;

    constructor(holder: NotesSegmentHolder) {
        super('div');
        this.editor = new NoteEditor(this);
        this.option_list = new NoteOptionList(this);
        this.element.classList.add('segment', 'input_holder');
        
        this.setParent(holder);
    }
}

// note display segment
class NoteDisplayHolder extends PageElement {
    category_list: NoteCategory[] = [];

    constructor(holder: NotesSegmentHolder) {
        super('div');
        this.element.classList.add('segment', 'display_holder');
        this.setParent(holder);

        const test: NoteCategory = this.createCategory('display test');
        const note: Note = new Note(test);
        note.setHeader('test header');
        note.setContent('test description');
    }

    public createCategory(name: string): NoteCategory {
        const category: NoteCategory = new NoteCategory(this);
        category.displayCategory(name);
        this.category_list.push(category);
        return category;
    }
}