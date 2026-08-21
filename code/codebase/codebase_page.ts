class CodebasePage extends Page {
    api: CodebaseAPI;
    cache: Record<string, FileEntryListing> = {};
    root?: FileEntryListing;

    header: CodebaseHeader;
    sidebar: CodebaseSidebar;
    main: CodebaseMain;

    private initialized = false;

    constructor(content: PageContent) {
        super(content);
        this.element.classList.add('codebase');

        this.api = new CodebaseAPI(this, {
            owner: 'Korwith',
            name: 'kircic.org'
        });
        this.header = new CodebaseHeader(this);
        this.sidebar = new CodebaseSidebar(this);
        this.main = new CodebaseMain(this);

        this.initialize();
        this.content.registerPage('codebase', this);
    }

    // gets the cache ready - later indexing updates this
    public async initialize(): Promise<void> {
        if (this.initialized) return;

        const data = await this.api.fetchDirectory([]);
        if (!data) return this.pushCodebaseNotification('error', 'There was an error fetching the GitHub API. Are you connected to the internet?');

        for (const entry of data) {
            this.cache[entry.name] = entry;
        }

        this.initialized = true;

        // (manually) creates the root listing in the sidebar
        const root_listing: FileEntryListing = {
            name: this.api.repo.name,
            path: '',
            type: 'dir',
            sha: 'root',
            size: 0,
            url: '',
            html_url: '',
            git_url: '',
            download_url: null,
            children: this.cache,
        };
        this.root = root_listing;
        const root_button: EntryElementFolder = new EntryElementFolder(this, root_listing, this.sidebar);
        root_button.specifyEntryName(this.api.repo.name);
        root_button.onclick();
    }

    // expands a file entry and indexes children
    // Inside CodebasePage
public async openEntry(path: string[]): Promise<FileEntryListing | null> {
    if (!this.initialized) await this.initialize();
    if (path.length === 0) return null;

    this.main.clearExplorer();
    this.main.toggleLoading(true);

    let current_entry: FileEntryListing | undefined = this.cache[path[0]];
    if (!current_entry) {
        this.main.toggleLoading(false);
        return null;
    }

    // Traverse and fetch missing directory entries sequentially[cite: 1, 3]
    for (let i = 1; i < path.length; i++) {
        const name = path[i];
        if (current_entry.type === 'dir' && !current_entry.children) {
            const sub_path: string[] = path.slice(0, i);
            const children_array = await this.api.fetchDirectory(sub_path);
            if (!children_array) throw new Error(`Failed to load directory: ${sub_path.join('/')}`);

            current_entry.children = {};
            for (const child of children_array) current_entry.children[child.name] = child;
        }

        if (!current_entry.children || !current_entry.children[name]) {
            this.main.toggleLoading(false);
            return null;
        }
        current_entry = current_entry.children[name];
    }

    // Fetch target folder contents if missing[cite: 1, 3]
    if (current_entry.type === 'dir' && !current_entry.children) {
        const children_array = await this.api.fetchDirectory(path);
        if (!children_array) throw new Error(`Failed to load directory: ${path.join('/')}`);

        current_entry.children = {};
        for (const child of children_array) current_entry.children[child.name] = child;
    }

    // Update header after cache resolution
    this.header.specifyPath(path);
    this.main.toggleLoading(false);
    return current_entry;
}

    // CodebasePage (in codebase page class)
    public resolvePath(path: string[]): FileEntryListing | null {
        if (path.length == 0) return this.root || null;

        let current: FileEntryListing | undefined = this.cache[path[0]];
        if (!current) return null;

        for (let i = 1; i < path.length; i++) {
            const segment = path[i];
            if (!current.children || !current.children[segment]) {
                return null;
            }
            current = current.children[segment];
        }

        return current;
    }

    // alerts to the user notifications regarding codebase page
    // usually an error (if they have no internet or something of the sort)
    public pushCodebaseNotification(type: 'info' | 'warn' | 'error', error: string) {
        this.content.manager.notifications.sendNotification(type, error);
    }
}

// displayed at the top of the codebase page
// displays the current file path
class CodebaseHeader extends GlassPageSegment {
    page: CodebasePage;
    entries: CodebaseHeaderEntry[] = [];

    constructor(codebase: CodebasePage) {
        super(codebase);
        this.element.classList.add('codebase_header');
        this.page = codebase;

        this.setParent(this.page);
    }

    // creates the current file path at the top of the codebase page
    public specifyPath(path: string[]): void {
        this.clearPath();
        this.entries.push(new CodebaseHeaderEntry(this, []));
        for (let i = 0; i < path.length; i++) {
            this.entries.push(new CodebaseHeaderEntry(this, path.slice(0, i + 1)));
        }
    }

    // resets the previous path, creates new
    public clearPath(): void {
        for (const entry of this.entries) entry.remove();
        this.entries = [];
    }
}

class CodebaseHeaderEntry extends PageElement {
    header: CodebaseHeader;
    entry: FileEntryListing | null;

    constructor(header: CodebaseHeader, subpath: string[]) {
        super('button');
        this.header = header;
        this.entry = header.page.resolvePath(subpath);
        
        this.element.classList.add('glass', 'gradient', 'hoverchange');
        this.element.textContent = this.entry ? this.entry.name : (subpath[subpath.length - 1] || header.page.api.repo.name);
        if (subpath.length === 0) this.element.classList.add('root');

        this.element.onclick = () => {
            if (this.entry?.entryElement instanceof EntryElementFolder) {
                const folder = this.entry.entryElement;
                folder.closeSubfolders();
                folder.open();
                this.header.page.main.clearExplorer();
                folder.showMainElement();
                this.header.specifyPath(subpath);
            } else if (this.entry?.path) {
                this.header.page.openEntry(this.entry.path.split('/'));
            }
        };
        this.setParent(header);
    }

    // deletes the element
    public remove(): void {
        this.element.remove();
    }
}

// abstract class which any file explorer builds off of
abstract class FileExplorer extends GlassPageSegment {
    codebase: CodebasePage;

    constructor(codebase: CodebasePage) {
        super(codebase);
        this.element.classList.add('file_explorer');
        this.codebase = codebase;

        this.setParent(this.codebase);
    }

    public async loadDirectory(path: string[]): Promise<void> {
    }
}

// vertical file explorer to the left of the codebase page
class CodebaseSidebar extends FileExplorer {
    constructor(codebase: CodebasePage) {
        super(codebase);
        this.element.classList.add('codebase_sidebar');
    }
}

// large icons displayed on the codebase page
class CodebaseMain extends FileExplorer {
    entries: EntryElement[] = [];

    constructor(codebase: CodebasePage) {
        super(codebase);
        this.element.classList.add('codebase_main');
    }

    public reflectEntry(entry: EntryElement): HTMLElement {
        this.entries.push(entry);

        const label: HTMLElement = document.createElement('div');
        label.setAttribute('name', entry.listing.name);
        label.setAttribute('type', entry.listing.type);
        label.classList.add('entry', 'glass', 'darker');
        label.classList.add(entry.listing.type === 'dir' ? 'folder' : 'file');
        label.onclick = () => entry.onclick();

        if (entry.listing.type !== 'dir') {
            const class_name: string | null = FileIcons.getClassWithColor(entry.listing.name);
            const add_classes: string[] = class_name != null ? ['has_icon', ...class_name.split(' ')] : ['none'];
            label.classList.add('icon', ...add_classes);
        }

        entry.main_entry = label;
        this.element.appendChild(label);

        return label;
    }

    // deletes a singular entry and removes it from the cache
    public deleteEntry(entry: EntryElement): void {
        const index: number = this.entries.indexOf(entry);
        if (index === -1) return;

        this.entries.splice(index, 1);
        entry.main_entry?.remove();
        delete entry.main_entry;
    }

    // resets the main file explorer
    public clearExplorer(): void {
        while (this.entries.length > 0) {
            this.deleteEntry(this.entries[0]);
        }
    }

    // handles the loading class which depicts text
    public toggleLoading(force: boolean): void {
        this.element.classList.toggle('loading', force);
    }
}