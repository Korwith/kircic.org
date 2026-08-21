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
        console.log('element clicked');
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