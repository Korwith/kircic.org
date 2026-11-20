/*
 *   Copyright (c) 2026 Thaddeus MW.
 *
 */

interface NotesSaveData {
    categories: NoteCategorySave[];
}

interface NoteCategorySave {
    name: string;
    notes: NoteSave[];
}

interface NoteSave {
    header: string;
    content: string;
}

// page dedicated for note-taking
class NotesPage extends Page {
    bookmark_pane: NoteBookmarkPane;
    segment_holder: NotesSegmentHolder;
    storage: NotesStorage = new NotesStorage();

    constructor(content: PageContent) {
        super(content);
        this.bookmark_pane = new NoteBookmarkPane(this);
        this.segment_holder = new NotesSegmentHolder(this);

        this.element.classList.add('notes');
        this.content.registerPage('notes', this);
        this.segment_holder.display_holder.loadPreviousSave();
    }

    // gathers data from the display holder and puts it in a savable format
    // requests the save from the page manager
    public saveNotesData(): void {
        const data: NotesSaveData = this.segment_holder.display_holder.fetchSaveData();
        this.storage.save(data);
    }

    public getSavedNotesData(): NotesSaveData {
        return this.storage.fetch();
    }

    // sends a page notification
    public notify(type: NotificationType, text: string): void {
        this.content.manager.notifications.sendNotification(type, text);
    }
}

// holds the major two segments
// left half: user input
// right half: finished note display
class NotesSegmentHolder extends PageSegment {
    page: NotesPage;
    input_holder: NoteInputHolder;
    display_holder: NoteDisplayHolder;

    constructor(page: NotesPage) {
        super(page);
        this.page = page;
        this.element.classList.add('segment_holder');
        this.input_holder = new NoteInputHolder(this);
        this.display_holder = new NoteDisplayHolder(this);
    }
}

// user input segment
class NoteInputHolder extends PageElement {
    holder: NotesSegmentHolder;
    viewer: NoteViewer;
    editing: Note | null = null;

    constructor(holder: NotesSegmentHolder) {
        super('div');
        this.holder = holder;
        this.viewer = new NoteViewer(this);
        this.element.classList.add('segment', 'input_holder');

        this.setParent(holder);
    }

    // creates a note from the editor
    // or updates the note currently being edited
    public submit(): void {
        const header: string = this.viewer.getHeader();
        const content: string = this.viewer.getText().trim();
        const display: NoteDisplayHolder = this.holder.display_holder;

        if (!header && !content) {
            this.holder.page.notify('warn', 'Note is empty');
            return;
        }

        if (this.editing) {
            this.editing.setHeader(header);
            this.editing.setContent(content);
        } else display.getSelectedCategory().addNote(header, content);

        this.clear();
        display.requestSave();
    }

    // loads an existing note into the editor
    public edit(note: Note): void {
        this.editing?.element.classList.remove('editing');
        this.editing = note;
        note.element.classList.add('editing');

        this.viewer.setHeader(note.getHeader());
        this.viewer.setText(note.getContent());
        this.viewer.displayEditing(true);
    }

    // empties the editor and leaves edit mode
    public clear(): void {
        this.editing?.element.classList.remove('editing');
        this.editing = null;

        this.viewer.setHeader('');
        this.viewer.setText('');
        this.viewer.displayEditing(false);
    }
}

// note display segment
class NoteDisplayHolder extends PageElement {
    holder: NotesSegmentHolder;
    notice: NoteEmptyNotice;
    category_list: NoteCategory[] = [];
    selected: NoteCategory | null = null;

    constructor(holder: NotesSegmentHolder) {
        super('div');
        this.holder = holder;
        this.notice = new NoteEmptyNotice(this);
        this.element.classList.add('segment', 'display_holder');
        this.setParent(holder);
    }

    public createCategory(name: string): NoteCategory {
        const category: NoteCategory = new NoteCategory(this);
        category.displayCategory(name);
        this.category_list.push(category);
        if (!this.selected) this.selectCategory(category);
        this.updateNotice();
        return category;
    }

    // the notice only shows when there are no categories
    public updateNotice(): void {
        this.notice.toggle(this.category_list.length == 0);
    }

    // finds a category by name (case insensitive)
    public findCategory(name: string): NoteCategory | undefined {
        const search: string = name.toLowerCase();
        return this.category_list.find((category: NoteCategory) => category.getName().toLowerCase() == search);
    }

    // new notes are placed inside of the selected category
    public selectCategory(category: NoteCategory | null): void {
        this.selected?.element.classList.remove('selected');
        this.selected = category;
        category?.element.classList.add('selected');
        this.holder.input_holder.viewer.displayCategory(category);
    }

    // selects the category after the current one (wraps around)
    public selectNextCategory(): void {
        if (this.category_list.length == 0) return;
        const index: number = this.selected ? this.category_list.indexOf(this.selected) : -1;
        this.selectCategory(this.category_list[(index + 1) % this.category_list.length]);
    }

    // returns the selected category.. creates a default one if none exist
    public getSelectedCategory(): NoteCategory {
        return this.selected || this.createCategory('General');
    }

    public deleteCategory(category: NoteCategory): void {
        const found: number = this.category_list.indexOf(category);
        if (found === -1) return;

        // stop editing a note that no longer exists
        const editing: Note | null = this.holder.input_holder.editing;
        if (editing && category.notes.includes(editing)) this.holder.input_holder.clear();

        this.category_list.splice(found, 1);
        category.element.remove();
        if (this.selected == category) this.selectCategory(this.category_list[0] || null);
        this.updateNotice();
        this.requestSave();
    }

    // gathers every category and note for saving
    public fetchSaveData(): NotesSaveData {
        return {
            categories: this.category_list.map((category: NoteCategory) => category.fetchSaveData()),
        };
    }

    // loads data from the previous save
    public loadPreviousSave(): void {
        const save_data: NotesSaveData = this.holder.page.getSavedNotesData();
        if (!save_data) return;

        for (const category_data of save_data.categories) {
            const category: NoteCategory = this.createCategory(category_data.name);
            for (const note of category_data.notes) category.addNote(note.header, note.content);
        }
    }

    // requests that the current notes are saved
    public requestSave(): void {
        this.holder.page.saveNotesData();
    }
}
