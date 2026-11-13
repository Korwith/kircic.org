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

// code editor style note editing
// title in the bar, markdown text in the body
class NoteViewer extends TextViewer {
    holder: NoteInputHolder;
    title: HTMLElement;
    category: HTMLButtonElement;
    save: HTMLButtonElement;

    constructor(holder: NoteInputHolder) {
        super();
        this.holder = holder;
        this.element.classList.add('note_viewer');
        this.setLanguage('markdown');

        // the editable span only holds text, the icon stays on the name
        // keeps the cursor from landing on the icon or placeholder
        this.title = document.createElement('span');
        this.title.classList.add('title', 'empty');
        this.title.setAttribute('contenteditable', 'true');
        this.title.setAttribute('placeholder', 'Note title...');
        this.title.setAttribute('spellcheck', 'false');
        this.title.addEventListener('keydown', (e: KeyboardEvent) => this.handleHeaderKeydown(e));
        this.title.addEventListener('input', () => this.updateEmptyHeader());
        this.title.addEventListener('paste', (e: ClipboardEvent) => this.handleHeaderPaste(e));
        this.name.appendChild(this.title);

        this.category = this.addAction('General', () => this.holder.holder.display_holder.selectNextCategory(), '../icon/folder.svg');
        this.category.classList.add('category');
        this.addAction('Copy', () => this.copy(), '../icon/clipboard.svg');
        this.save = this.addAction('Create', () => this.holder.submit(), '../icon/plus.svg');

        this.displayEditor('');
        this.input?.setAttribute('placeholder', 'Write some text...');
        this.handleInput();
        this.setParent(this.holder);
    }

    public getHeader(): string {
        return (this.title.textContent ?? '').trim();
    }

    public setHeader(text: string): void {
        this.title.textContent = text;
        this.updateEmptyHeader();
    }

    // handles if the placeholder text is visible or not
    // a leftover <br> would otherwise keep the span from being empty
    protected updateEmptyHeader(): void {
        const empty: boolean = (this.title.textContent ?? '').length == 0;
        if (empty) this.title.replaceChildren();
        this.title.classList.toggle('empty', empty);
    }

    // pastes as plain text on a single line
    protected handleHeaderPaste(e: ClipboardEvent): void {
        e.preventDefault();
        const text: string = (e.clipboardData?.getData('text/plain') ?? '').replace(/\s*\n\s*/g, ' ');
        const selection: Selection | null = window.getSelection();
        if (!selection || selection.rangeCount == 0) return;

        const range: Range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
        range.collapse(false);
        this.title.normalize();
        this.updateEmptyHeader();
    }

    public setText(text: string): void {
        super.setText(text);
        this.handleInput();
    }

    // rejects newlines, enter moves to the text box
    protected handleHeaderKeydown(e: KeyboardEvent): void {
        if (e.key != 'Enter') return;
        e.preventDefault();
        this.input?.focus();
    }

    // ctrl + enter or ctrl + s saves the note
    protected handleKeydown(e: KeyboardEvent): void {
        if (e.ctrlKey && (e.key == 'Enter' || e.key == 's')) {
            e.preventDefault();
            this.holder.submit();
            return;
        }
        super.handleKeydown(e);
    }

    // keeps the line count up to date
    protected handleInput(): void {
        const lines: number = this.getLineCount();
        const characters: number = this.getText().length;
        this.setInfo(`${lines} ${lines == 1 ? 'line' : 'lines'} · ${characters} ${characters == 1 ? 'character' : 'characters'}`);
    }

    public displayCategory(category: NoteCategory | null): void {
        this.category.textContent = category?.getName() ?? 'General';
    }

    // plus when creating, check when updating
    public displayEditing(editing: boolean): void {
        this.save.textContent = editing ? 'Update' : 'Create';
        this.save.style.setProperty('--icon-url', `url('../icon/${editing ? 'check' : 'plus'}.svg')`);
    }

    private async copy(): Promise<void> {
        const header: string = this.getHeader();
        const text: string = header ? `${header}\n\n${this.getText()}` : this.getText();
        try {
            await navigator.clipboard.writeText(text);
            this.holder.holder.page.notify('info', 'Copied note to clipboard.');
        } catch (error: unknown) {
            this.holder.holder.page.notify('error', 'Unable to copy to clipboard.');
        }
    }

    // empties the editor
    public close(): void {
        this.holder.clear();
    }
}

// shown in place of the categories when there are none
class NoteEmptyNotice extends ShadowGlassPane {
    holder: NoteDisplayHolder;
    text: HTMLElement;
    create: HTMLButtonElement;

    constructor(holder: NoteDisplayHolder) {
        super('div');
        this.holder = holder;
        this.text = document.createElement('span');
        this.create = document.createElement('button');

        this.element.classList.add('empty_notice');
        this.text.classList.add('notice_text');
        this.create.classList.add('glass', 'gradient', 'hoverchange');

        this.text.textContent = 'You have no categories yet.';
        this.create.textContent = 'Create Category';
        this.create.onclick = () => this.onclick();

        this.element.append(this.text, this.create);
        this.setParent(holder);
    }

    public toggle(show: boolean): void {
        this.element.classList.toggle('hide', !show);
    }

    // uses the name typed in the category box, otherwise General
    protected onclick(): void {
        const bookmarks: NoteBookmarkPane = this.holder.holder.page.bookmark_pane;
        if (bookmarks.category.getText()) {
            bookmarks.addCategory();
            return;
        }
        this.holder.selectCategory(this.holder.createCategory('General'));
        this.holder.requestSave();
    }
}

// specifically for displaying notes
// top bar: name, note count and delete
class NoteCategory extends ShadowGlassPane {
    holder: NoteDisplayHolder;
    bar: HTMLElement;
    name: HTMLElement;
    count: HTMLElement;
    trash: HTMLElement;
    notes: Note[] = [];

    constructor(holder: NoteDisplayHolder) {
        super('div');
        this.holder = holder;
        this.bar = document.createElement('div');
        this.name = document.createElement('span');
        this.count = document.createElement('span');
        this.trash = document.createElement('button');

        this.element.classList.add('category');
        this.bar.classList.add('category_bar');
        this.name.classList.add('name');
        this.count.classList.add('count');
        this.trash.classList.add('glass', 'gradient', 'hoverchange', 'trash');
        this.trash.title = 'Delete category';

        this.bar.onclick = () => this.holder.selectCategory(this);
        this.trash.onclick = (e: PointerEvent) => {
            e.stopPropagation();
            this.delete();
        };

        this.bar.append(this.name, this.count, this.trash);
        this.element.appendChild(this.bar);
        this.updateCount();
        this.setParent(holder);
    }

    public updateCount(): void {
        this.count.textContent = `${this.notes.length} ${this.notes.length == 1 ? 'note' : 'notes'}`;
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
        this.updateCount();
        return note;
    }

    public deleteNote(note: Note): void {
        const found: number = this.notes.indexOf(note);
        if (found === -1) return;
        if (this.holder.holder.input_holder.editing == note) this.holder.holder.input_holder.clear();
        this.notes.splice(found, 1);
        note.element.remove();
        this.updateCount();
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

        this.element.classList.add('note');
        this.header.classList.add('note_header');
        this.content.classList.add('note_content');
        this.trash.classList.add('glass', 'gradient', 'hoverchange', 'trash');
        this.trash.title = 'Delete note';


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
