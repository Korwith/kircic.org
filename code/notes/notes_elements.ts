class NoteInputSelector extends PageElement {
    holder: NoteInputHolder;

    constructor(holder: NoteInputHolder) {
        super();
        this.holder = holder;
        this.element.classList.add('glass', 'selector');
        this.setParent(this.holder);
    }
}

class NoteInputButton extends PageElement {

}