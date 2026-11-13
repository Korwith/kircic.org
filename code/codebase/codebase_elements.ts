/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

// various file and folder displays
abstract class EntryElement extends PageElement {
    page: CodebasePage;
    listing: FileEntryListing;
    parent_entry: EntryElement | FileExplorer;
    button: HTMLElement;

    main_entry?: HTMLElement;

    constructor(page: CodebasePage, listing: FileEntryListing, parent: EntryElement | FileExplorer) {
        super();
        this.page = page;
        this.listing = listing;
        this.parent_entry = parent;
        this.button = document.createElement('button');
        this.button.classList.add('glass', 'gradient');

        this.element.appendChild(this.button);
        this.element.classList.add('entry');

        this.listing.entryElement = this;

        this.button.onclick = () => this.onclick();
        this.setParent(parent);
    }

    public specifyEntryName(text: string): void {
        this.button.textContent = text;
    }

    public showMainElement(): void {
        for (const key in this.listing.children) {
            const child: FileEntryListing = this.listing.children[key];
            if (!child.entryElement) continue;
            this.page.main.reflectEntry(child.entryElement);
        }
        // this.main_entry = this.page.main.reflectEntry(this);
    }

    // deletes the reflected element in the main page
    public deleteMainElement(): void {
        this.page.main.deleteEntry(this);
    }

    abstract onclick(): void;
}

class EntryElementFile extends EntryElement {
    // a file (non-folder) would never be in the root
    constructor(page: CodebasePage, listing: FileEntryListing, parent: EntryElement) {
        super(page, listing, parent);
        this.element.classList.add('file');
    }

    onclick(): void {
        this.page.openFile(this.listing);
    }
}

// displays the text of a file with syntax highlighting
class CodebaseFileViewer extends TextViewer {
    page: CodebasePage;
    listing: FileEntryListing;

    // files which can't be shown as text
    static readonly IMAGE_TYPES = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'ico', 'svg'];
    static readonly BINARY_TYPES = ['pdf', 'glb', 'mp4', 'otf', 'ttf', 'woff', 'woff2', 'exe', 'node', 'uv'];

    constructor(page: CodebasePage, listing: FileEntryListing) {
        super();
        this.page = page;
        this.listing = listing;
        this.element.classList.add('file_viewer');
        this.setName(this.listing.name, FileIcons.getClassWithColor(this.listing.name));
        this.setLanguage(CodebaseFileViewer.extensionOf(this.listing.name));
    }

    public static extensionOf(name: string): string {
        const index: number = name.lastIndexOf('.');
        return index === -1 ? '' : name.slice(index + 1).toLowerCase();
    }

    public static isTextFile(name: string): boolean {
        const extension: string = CodebaseFileViewer.extensionOf(name);
        return !CodebaseFileViewer.IMAGE_TYPES.includes(extension) && !CodebaseFileViewer.BINARY_TYPES.includes(extension);
    }

    // copy (text only), github and close buttons
    private addFileActions(text?: string): void {
        if (text !== undefined) {
            this.addAction('Copy', async () => {
                try {
                    await navigator.clipboard.writeText(text);
                    this.page.pushCodebaseNotification('info', `Copied ${this.listing.name} to clipboard.`);
                } catch (error: unknown) {
                    this.page.pushCodebaseNotification('error', 'Unable to copy to clipboard.');
                }
            }, '../icon/clipboard.svg');
        }
        this.addLinkAction('GitHub', this.listing.html_url);

        // closes the viewer and returns to the containing folder
        this.addCloseAction();
    }

    // highlights and displays text alongside line numbers
    public displayText(text: string): void {
        super.displayText(text);
        this.setInfo(`${this.getLineCount()} lines · ${CodebaseFileViewer.formatSize(this.listing.size)}`);
        this.addFileActions(text);
    }

    // images are shown directly, other binaries just get a message
    public displayMedia(): void {
        this.setInfo(CodebaseFileViewer.formatSize(this.listing.size));
        this.addFileActions();
        this.body.classList.add('media');

        const extension: string = CodebaseFileViewer.extensionOf(this.listing.name);
        if (CodebaseFileViewer.IMAGE_TYPES.includes(extension) && this.listing.download_url) {
            const image: HTMLImageElement = document.createElement('img');
            image.src = this.listing.download_url;
            image.alt = this.listing.name;
            this.body.appendChild(image);
        } else {
            this.body.classList.add('unsupported');
        }
    }

    public close(): void {
        const parent_path: string[] = this.listing.path.split('/').slice(0, -1);
        const parent: FileEntryListing | null = this.page.resolvePath(parent_path);

        this.page.main.clearExplorer();
        this.page.header.specifyPath(parent_path);
        if (parent?.entryElement instanceof EntryElementFolder) {
            parent.entryElement.open();
            parent.entryElement.showMainElement();
        }
    }

    public static formatSize(bytes: number): string {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
}

class EntryElementFolder extends EntryElement {
    children: HTMLElement;
    child_entries: EntryElement[] = [];
    populated: boolean = false;

    constructor(page: CodebasePage, listing: FileEntryListing, parent: EntryElement | FileExplorer) {
        super(page, listing, parent);
        this.element.classList.add('folder');

        this.children = document.createElement('div');
        this.children.classList.add('children');
        this.element.appendChild(this.children);
    }

    public populateChildren(): void {
        if (this.listing.children && !this.populated) {
            for (const name in this.listing.children) {
                const childListing = this.listing.children[name];
                const ElementClass = childListing.type === 'dir' ? EntryElementFolder : EntryElementFile;

                const childEntry = new ElementClass(this.page, childListing, this);
                childEntry.specifyEntryName(childListing.name);
                this.child_entries.push(childEntry);
                this.children.appendChild(childEntry.element);
            }
            this.populated = true;
        }
    }

    public open(): void {
        this.populateChildren();
        this.children.classList.remove('hidden');
    }

    public close(): void {
        this.children.classList.add('hidden');
    }

    public closeSubfolders(): void {
        for (const child of this.child_entries) {
            if (child instanceof EntryElementFolder) {
                child.close();
                child.closeSubfolders();
            }
        }
    }

    async onclick(): Promise<void> {
        const pathArr = this.listing.path ? this.listing.path.split('/') : [];

        if (!this.listing.children && this.listing.path) {
            await this.page.openEntry(pathArr);
        } else {
            this.page.header.specifyPath(pathArr);
        }

        this.page.main.clearExplorer();

        if (!this.populated) {
            this.populateChildren();
            this.children.classList.remove('hidden');
        } else {
            this.children.classList.toggle('hidden');
        }

        if (!this.children.classList.contains('hidden')) {
            this.showMainElement();
        }
    }
}