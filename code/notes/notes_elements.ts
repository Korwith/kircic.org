/*
 *   Copyright (c) 2026 Thaddeus MW.
 *
 */

class NoteBookmarkPane extends GeneralBookmarkBar {
    page: NotesPage;
    input: NoteBookmarkInput;
    category: NoteBookmarkCategory;

    constructor(page: NotesPage) {
        super(page);
        this.page = page;
        this.input = new NoteBookmarkInput(this);
        this.category = new NoteBookmarkCategory(this);

        this.setParent(page);
    }

    // creates a note with only a header inside of the selected category
    public addQuickNote(): void {
        const text: string = this.input.getText();
        if (!text) return;

        const display: NoteDisplayHolder = this.page.segment_holder.display_holder;
        display.getSelectedCategory().addNote(text, '');
        this.input.reset();
        this.requestSave();
    }

    // creates and selects a new category
    public addCategory(): void {
        const text: string = this.category.getText();
        if (!text) return;

        const display: NoteDisplayHolder = this.page.segment_holder.display_holder;
        if (display.findCategory(text)) {
            this.page.notify('warn', 'Category already exists');
            return;
        }

        display.selectCategory(display.createCategory(text));
        this.category.reset();
        this.requestSave();
    }

    // not needed, there are no bookmark buttons
    protected handleButtonOverflow(): void { }

    public fetchSaveData(): NotesSaveData {
        return this.page.segment_holder.display_holder.fetchSaveData();
    }

    // handled by the display holder
    protected loadPreviousSave(): void { }

    protected requestSave(): void {
        this.page.saveNotesData();
    }
}

class NoteBookmarkInput extends BookmarkInputBox {
    bookmarks: NoteBookmarkPane;
    plus: NoteBookmarkInputPlus;

    constructor(bar: NoteBookmarkPane) {
        super(bar);
        this.bookmarks = bar;
        this.plus = new NoteBookmarkInputPlus(bar);
        this.element.setAttribute('placeholder', 'Quick Note...');
        this.element.onkeydown = (e: KeyboardEvent) => this.changed(e);
        this.element.onkeyup = (e: KeyboardEvent) => this.changed(e);
    }

    protected handleInputComplete(): void {
        this.bookmarks.addQuickNote();
    }
}

class NoteBookmarkInputPlus extends BookmarkButtonPlus {
    bookmarks: NoteBookmarkPane;

    constructor(bar: NoteBookmarkPane) {
        super(bar);
        this.bookmarks = bar;
    }

    onclick() {
        this.bookmarks.addQuickNote();
    };

    toggleDeletionMode(deletion: boolean): void {};
}

class NoteBookmarkCategory extends BookmarkInputBox {
    bookmarks: NoteBookmarkPane;
    plus: NoteBookmarkCategoryPlus;

    constructor(bar: NoteBookmarkPane) {
        super(bar);
        this.bookmarks = bar;
        this.plus = new NoteBookmarkCategoryPlus(bar);
        this.element.setAttribute('placeholder', 'Add Category...');
        this.element.onkeydown = (e: KeyboardEvent) => this.changed(e);
        this.element.onkeyup = (e: KeyboardEvent) => this.changed(e);
    }

    protected handleInputComplete(): void {
        this.bookmarks.addCategory();
    }
}

class NoteBookmarkCategoryPlus extends BookmarkButtonPlus {
    bookmarks: NoteBookmarkPane;

    constructor(bar: NoteBookmarkPane) {
        super(bar);
        this.bookmarks = bar;
    }

    onclick() {
        this.bookmarks.addCategory();
    };

    toggleDeletionMode(deletion: boolean): void {};
}

// the list of buttons under the input holder
class NoteOptionList extends GlassPane {
    holder: NoteInputHolder;
    category: NoteOptionCategory;
    create: NoteOptionCreate;
    clear: NoteOptionClear;

    constructor(holder: NoteInputHolder) {
        super('div');
        this.holder = holder;
        this.category = new NoteOptionCategory(this);
        this.create = new NoteOptionCreate(this);
        this.clear = new NoteOptionClear(this);

        this.element.classList.add('option_list');

        this.setParent(this.holder);;
    }
}

class NoteEditor extends GlassPane {
    holder: NoteInputHolder;
    header: NoteEditorHeader;
    content: NoteEditorContent;

    constructor(holder: NoteInputHolder) {
        super('div');
        this.holder = holder;
        this.header = new NoteEditorHeader(this);
        this.content = new NoteEditorContent(this);
        this.element.classList.add('editor');
        this.setParent(this.holder);
    }
}

abstract class NoteEditorInput extends PageElement {
    editor: NoteEditor;

    constructor(editor: NoteEditor, tag?: 'span' | 'p') {
        super(tag);
        this.editor = editor;
        this.element.classList.add('glass', 'dark', 'empty');
        this.element.setAttribute('contenteditable', 'true');
        this.element.addEventListener('keydown', (e: KeyboardEvent) => this.handleInput(e));
        // fires right after any change
        this.element.addEventListener('input', () => this.updateEmpty());

        this.setParent(this.editor);
    }

    protected handleInput(input: KeyboardEvent) {}

    // handles if the placeholder text is visible or not
    protected updateEmpty(): void {
        const text: string = this.element.innerText.replace(/\n$/, '');
        this.element.classList.toggle('empty', text.length == 0);
    }

    // innerText keeps line breaks
    public getText(): string {
        return this.element.innerText.trim();
    }

    public setText(text: string): void {
        this.element.innerText = text;
        this.updateEmpty();
    }
}

class NoteEditorHeader extends NoteEditorInput {
    constructor(editor: NoteEditor) {
        super(editor, 'span');
        this.element.classList.add('header');
    }

    // rejects newlines, enter moves to the content box
    protected handleInput(input: KeyboardEvent) {
        if (input.key == 'Enter') {
            input.preventDefault();
            if (input.type == 'keydown') this.editor.content.element.focus();
        }
        super.handleInput(input);
    }
}

class NoteEditorContent extends NoteEditorInput {
    constructor(editor: NoteEditor) {
        super(editor, 'p');
        this.element.classList.add('content');
    }

    // ctrl + enter submits the note
    protected handleInput(input: KeyboardEvent) {
        if (input.key == 'Enter' && input.ctrlKey) {
            input.preventDefault();
            if (input.type == 'keydown') this.editor.holder.submit();
        }
        super.handleInput(input);
    }
}

// abstract class for note choices
abstract class NoteOptionButton extends PageElement {
    list: NoteOptionList;

    constructor(list: NoteOptionList) {
        super('button');
        this.element.classList.add('glass', 'gradient', 'hoverchange');
        this.list = list;
        this.element.onclick = () => this.onclick();
        this.setParent(this.list);
    }

    protected abstract onclick(): void;
}

// displays the selected category, cycles through categories on click
class NoteOptionCategory extends NoteOptionButton {
    constructor(list: NoteOptionList) {
        super(list);
        this.element.classList.add('category');
        this.displayCategory(null);
    }

    public displayCategory(category: NoteCategory | null): void {
        this.element.textContent = `Category: ${category?.getName() ?? 'General'}`;
    }

    protected onclick(): void {
        this.list.holder.holder.display_holder.selectNextCategory();
    }
}

// creates or updates the note in the editor
class NoteOptionCreate extends NoteOptionButton {
    constructor(list: NoteOptionList) {
        super(list);
        this.element.classList.add('create');
        this.displayEditing(false);
    }

    public displayEditing(editing: boolean): void {
        this.element.textContent = editing ? 'Update' : 'Create';
    }

    protected onclick(): void {
        this.list.holder.submit();
    }
}

// empties the editor
class NoteOptionClear extends NoteOptionButton {
    constructor(list: NoteOptionList) {
        super(list);
        this.element.classList.add('clear');
        this.element.textContent = 'Clear';
    }

    protected onclick(): void {
        this.list.holder.clear();
    }
}


// specifically for displaying notes
class NoteCategory extends GlassPane {
    holder: NoteDisplayHolder;
    name: HTMLElement;
    trash: HTMLElement;
    notes: Note[] = [];

    constructor(holder: NoteDisplayHolder) {
        super('div');
        this.holder = holder;
        this.name = document.createElement('span');
        this.trash = document.createElement('button');

        this.element.classList.add('category');
        this.name.classList.add('name');
        this.trash.classList.add('glass', 'darker', 'trash');

        this.name.onclick = () => this.holder.selectCategory(this);
        this.trash.onclick = () => this.delete();

        this.element.appendChild(this.name);
        this.element.appendChild(this.trash);
        this.setParent(holder);
    }

    public displayCategory(text: string): void {
        this.name.textContent = text;
    }

    public getName(): string {
        return this.name.textContent;
    }

    public addNote(header: string, content: string): Note {
        const note: Note = new Note(this);
        note.setHeader(header);
        note.setContent(content);
        this.notes.push(note);
        return note;
    }

    public deleteNote(note: Note): void {
        const found: number = this.notes.indexOf(note);
        if (found === -1) return;
        if (this.holder.holder.input_holder.editing == note) this.holder.holder.input_holder.clear();
        this.notes.splice(found, 1);
        note.element.remove();
        this.holder.requestSave();
    }

    // asks before deleting a category that still has notes
    public delete(): void {
        if (this.notes.length > 0 && !window.confirm(`Delete "${this.getName()}" and its ${this.notes.length} note(s)?`)) return;
        this.holder.deleteCategory(this);
    }

    public fetchSaveData(): NoteCategorySave {
        return {
            name: this.getName(),
            notes: this.notes.map((note: Note) => note.fetchSaveData()),
        };
    }
}

class Note extends PageElement {
    category: NoteCategory;
    header: HTMLElement;
    content: HTMLElement;
    trash: HTMLElement;

    constructor(category: NoteCategory) {
        super('div');
        this.category = category;
        this.header = document.createElement('span');
        this.content = document.createElement('span');
        this.trash = document.createElement('button');

        this.element.classList.add('glass', 'dark', 'note');
        this.header.classList.add('note_header');
        this.content.classList.add('note_content');
        this.trash.classList.add('glass', 'darker', 'trash');

        // clicking a note loads it into the editor
        this.element.onclick = () => this.category.holder.holder.input_holder.edit(this);
        this.trash.onclick = (e: PointerEvent) => {
            e.stopPropagation();
            this.category.deleteNote(this);
        };

        this.element.appendChild(this.header);
        this.element.appendChild(this.content);
        this.element.appendChild(this.trash);
        this.setParent(this.category);
    }

    public setHeader(text: string) {
        this.header.textContent = text;
    }

    public setContent(text: string) {
        this.content.textContent = text;
    }

    public getHeader(): string {
        return this.header.textContent;
    }

    public getContent(): string {
        return this.content.textContent;
    }

    public fetchSaveData(): NoteSave {
        return {
            header: this.getHeader(),
            content: this.getContent(),
        };
    }
}
