/*
 *   Copyright (c) 2026 Thaddeus MW.
 *
 */

// abstract class for viewing and editing text (code editor style)
// top bar: name, info and actions
// body: line numbers alongside highlighted text
abstract class TextViewer extends PageElement {
    bar: HTMLElement;
    name: HTMLElement;
    info: HTMLElement;
    actions: HTMLElement;
    body: HTMLElement;
    gutter: HTMLElement;
    code: HTMLElement;
    input?: HTMLTextAreaElement;
    language: string = 'plaintext';

    // text which shouldn't be highlighted (too slow)
    static readonly MAX_HIGHLIGHT_SIZE = 200_000;

    constructor() {
        super();
        this.element.classList.add('text_viewer', 'glass', 'darker');

        this.bar = document.createElement('div');
        this.name = document.createElement('div');
        this.info = document.createElement('div');
        this.actions = document.createElement('div');
        this.body = document.createElement('div');
        this.gutter = document.createElement('pre');
        this.code = document.createElement('code');

        this.bar.classList.add('viewer_bar');
        this.name.classList.add('viewer_name');
        this.info.classList.add('viewer_info');
        this.actions.classList.add('viewer_actions');
        this.body.classList.add('viewer_body');
        this.gutter.classList.add('viewer_gutter');
        this.code.classList.add('hljs');

        this.bar.append(this.name, this.info, this.actions);
        this.element.append(this.bar, this.body);
    }

    // file icon classes are optional
    public setName(text: string, icon_class?: string | null): void {
        this.name.textContent = text;
        if (icon_class) this.name.classList.add('has_icon', 'icon', ...icon_class.split(' '));
    }

    public setInfo(text: string): void {
        this.info.textContent = text;
    }

    // adds a button to the right side of the bar
    // icon is optional, it is sized to the text
    public addAction(text: string, onclick: () => void, icon?: string): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.classList.add('glass', 'gradient', 'hoverchange');
        button.onclick = () => onclick();
        if (icon) {
            button.classList.add('has_icon');
            button.style.setProperty('--icon-url', `url('${icon}')`);
        }
        TextViewer.setActionText(button, text);
        this.actions.appendChild(button);
        return button;
    }

    // the text sits in its own span so it can be hidden
    public static setActionText(button: HTMLElement, text: string): void {
        if (!text) return;
        const label: HTMLElement = button.querySelector('span.label') ?? document.createElement('span');
        label.classList.add('label');
        label.textContent = text;
        button.title = text;
        if (!label.parentElement) button.appendChild(label);
    }

    // adds a link which opens in a new tab
    public addLinkAction(text: string, href: string): HTMLAnchorElement {
        const link: HTMLAnchorElement = document.createElement('a');
        link.classList.add('glass', 'gradient', 'hoverchange');
        link.textContent = text;
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener';
        this.actions.appendChild(link);
        return link;
    }

    // adds the x button which calls close()
    public addCloseAction(): HTMLButtonElement {
        const close: HTMLButtonElement = this.addAction('', () => this.close());
        close.classList.add('close');
        close.title = 'Close';
        close.setAttribute('aria-label', 'Close');
        return close;
    }

    // falls back to plain text when the language is unknown
    public setLanguage(language: string): void {
        const known: boolean = typeof hljs !== 'undefined' && hljs.getLanguage(language) !== undefined;
        this.language = known ? language : 'plaintext';
    }

    // read only text
    public displayText(text: string): void {
        const pre: HTMLElement = document.createElement('pre');
        pre.appendChild(this.code);
        this.body.append(this.gutter, pre);
        this.renderText(text.replace(/\n$/, ''));
    }

    // editable text, a transparent textarea sits over the highlighted text
    public displayEditor(text: string): void {
        const holder: HTMLElement = document.createElement('div');
        const pre: HTMLElement = document.createElement('pre');
        this.input = document.createElement('textarea');

        holder.classList.add('viewer_editor');
        this.input.setAttribute('wrap', 'off');
        this.input.setAttribute('spellcheck', 'false');
        this.input.value = text;
        this.input.addEventListener('input', () => {
            this.renderText(this.getText());
            this.handleInput();
        });
        this.input.addEventListener('keydown', (e: KeyboardEvent) => this.handleKeydown(e));

        pre.appendChild(this.code);
        holder.append(pre, this.input);
        this.body.append(this.gutter, holder);
        this.renderText(text);
    }

    public getText(): string {
        return this.input ? this.input.value : this.code.textContent;
    }

    // replaces the text inside of the editor
    public setText(text: string): void {
        if (this.input) this.input.value = text;
        this.renderText(text);
    }

    public getLineCount(): number {
        return this.getText().split('\n').length;
    }

    // updates the line numbers and highlighting
    protected renderText(text: string): void {
        const lines: number = text.split('\n').length;
        this.gutter.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');

        if (this.language !== 'plaintext' && text.length <= TextViewer.MAX_HIGHLIGHT_SIZE) {
            this.code.innerHTML = hljs.highlight(text, { language: this.language }).value;
        } else {
            this.code.textContent = text;
        }

        // a trailing newline would otherwise collapse in the editor
        if (this.input && text.endsWith('\n')) this.code.append(' ');
    }

    // tab inserts a tab rather than leaving the editor
    protected handleKeydown(e: KeyboardEvent): void {
        if (e.key != 'Tab' || !this.input) return;
        e.preventDefault();
        this.input.setRangeText('\t', this.input.selectionStart, this.input.selectionEnd, 'end');
        this.input.dispatchEvent(new Event('input'));
    }

    // called after the editor text changes
    protected handleInput(): void { }

    abstract close(): void;
}
