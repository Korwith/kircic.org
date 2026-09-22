/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

class NoteBookmarkPane extends GeneralBookmarkBar {
    input: NoteBookmarkInput;
    category: NoteBookmarkCategory;

    constructor(page: NotesPage) {
        super(page);
        this.input = new NoteBookmarkInput(this);
        this.category = new NoteBookmarkCategory(this);

        this.setParent(page);
    }

    protected handleButtonOverflow(): void {
        
    }

    public fetchSaveData() {
        
    }

    protected loadPreviousSave(): void {
        
    }

    protected requestSave(): void {
        
    }
}

class NoteBookmarkInput extends BookmarkInputBox {
    plus: NoteBookmarkInputPlus;

    constructor(bar: NoteBookmarkPane) {
        super(bar);
        this.plus = new NoteBookmarkInputPlus(bar);
        this.element.setAttribute('placeholder', 'Quick Note...');
    }

    protected handleInputComplete(): void {
        
    }
}

class NoteBookmarkInputPlus extends BookmarkButtonPlus {
    constructor(bar: NoteBookmarkPane) {
        super(bar);
    }

    onclick() {};
    toggleDeletionMode(deletion: boolean): void {};
}

class NoteBookmarkCategory extends BookmarkInputBox {
    plus: NoteBookmarkCategoryPlus;

    constructor(bar: NoteBookmarkPane) {
        super(bar);
        this.plus = new NoteBookmarkInputPlus(bar);
        this.element.setAttribute('placeholder', 'Add Category...');
    }

    protected handleInputComplete(): void {
        
    }
}

class NoteBookmarkCategoryPlus extends BookmarkButtonPlus {
    constructor(bar: NoteBookmarkPane) {
        super(bar);
    }

    onclick() {};
    toggleDeletionMode(deletion: boolean): void {};
}

// the list of buttons under the input holder
class NoteOptionList extends GlassPane {
    holder: NoteInputHolder;
    category: NoteOptionCategory;

    constructor(holder: NoteInputHolder) {
        super('div');
        this.holder = holder;
        this.category = new NoteOptionCategory(this);

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
        this.element.addEventListener('keyup', (e: KeyboardEvent) => this.handleInput(e))

        this.setParent(this.editor);
    }

    protected handleInput(input: KeyboardEvent) {
        const characters: RegExpMatchArray | null = this.element.textContent.match(/[a-z0-9]/gi);
        const length: number = characters?.length ?? 0;
        this.element.classList.toggle('empty', length == 0);
    }
}

class NoteEditorHeader extends NoteEditorInput {
    constructor(editor: NoteEditor) {
        super(editor, 'span');
        this.element.classList.add('header');
    }
}

class NoteEditorContent extends NoteEditorInput {
    constructor(editor: NoteEditor) {
        super(editor, 'p');
        this.element.classList.add('content');
    }
}

// abstract class for note choices
abstract class NoteOptionButton extends PageElement {
    list: NoteOptionList;

    constructor(list: NoteOptionList) {
        super('button');
        this.element.classList.add('glass', 'gradient', 'hoverchange');
        this.list = list;
        this.setParent(this.list);
    }
}

class NoteOptionCategory extends NoteOptionButton {
    constructor(list: NoteOptionList) {
        super(list);
        this.element.classList.add('category');
        this.element.textContent = 'Create';
    }
}


// specifically for displaying notes
class NoteCategory extends GlassPane {
    name: HTMLElement;

    constructor(holder: NoteDisplayHolder) {
        super('div');
        this.name = document.createElement('span');

        this.element.classList.add('category');
        this.name.classList.add('name');
        
        this.element.appendChild(this.name);
        this.setParent(holder);
    }

    public displayCategory(text: string): void {
        this.name.textContent = text;
    }
}

class Note extends PageElement {
    category: NoteCategory;
    header: HTMLElement;
    content: HTMLElement;

    constructor(category: NoteCategory) {
        super('div');
        this.category = category;
        this.header = document.createElement('span');
        this.content = document.createElement('span');

        this.element.classList.add('note');
        this.header.classList.add('note_header');
        this.content.classList.add('note_content');

        this.element.appendChild(this.header);
        this.element.appendChild(this.content);
        this.setParent(this.category);
    }

    public setHeader(text: string) {
        this.header.textContent = text;
    }

    public setContent(text: string) {
        this.content.textContent = text;
    }
}