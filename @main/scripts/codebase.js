"use strict";
const Image_Extensions = new Set(['jpeg', 'jpg', 'png', 'gif', 'webp', 'avif', 'svg', 'ico']);
const Text_Extensions = new Set([
    'txt', 'md', 'markdown', 'js', 'ts', 'jsx', 'tsx', 'html', 'htm', 'css', 'scss',
    'json', 'yaml', 'yml', 'xml', 'csv', 'svg', 'py', 'java', 'c', 'cpp', 'h',
    'sh', 'bash', 'bat', 'ps1', 'php', 'rb', 'go', 'rs', 'swift', 'kt', 'kts',
    'dart', 'lua', 'sql', 'log', 'ini', 'toml', 'gitignore'
]);
class CodebaseAPI {
    api_content;
    constructor(repo, path) {
        this.api_content = `https://api.github.com/repos/${repo.owner}/${repo.name}/contents/${path}`;
    }
    decodeBase64(content) {
        try {
            return (atob(content));
        }
        catch {
            return null;
        }
    }
    async fetchJson() {
        const res = await fetch(this.api_content);
        if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
        return res.json();
    }
}
class Entry {
    repo;
    path;
    name;
    parent;
    explorer;
    sidebarEntry;
    explorerEntry;
    constructor(repo, path, parent, explorer, name) {
        this.repo = repo;
        this.path = path;
        this.name = name ?? path.split('/').pop() ?? '(root)';
        this.parent = parent;
        this.explorer = explorer;
        this.sidebarEntry = document.createElement('div');
        this.explorerEntry = document.createElement('div');
        this.explorerEntry.className = 'file-item';
        this.explorerEntry.textContent = this.name;
    }
    applyFileIcon() {
        const file_icon = FileIcons.getClassWithColor(this.name);
        if (!file_icon)
            return;
        const add_classes = ['has-icon', ...file_icon.split(' ')];
        this.sidebarEntry.classList.add(...add_classes);
        this.explorerEntry.classList.add(...add_classes);
    }
}
class FileNode extends Entry {
    type = 'file';
    constructor(repo, path, parent, explorer, file) {
        super(repo, path, parent, explorer, file.name);
        this.sidebarEntry.className = 'file-item';
        this.sidebarEntry.textContent = this.name;
        this.sidebarEntry.onclick = () => this.loadFileText();
        this.explorerEntry.className = 'file-item file';
        this.explorerEntry.setAttribute('item-name', this.name);
        this.explorerEntry.onclick = () => this.loadFileText();
        this.applyFileIcon();
        const ext = this.ext();
        if (Image_Extensions.has(ext)) {
            const img = new Image();
            img.onerror = () => { img.src = '../icon/globe.svg'; };
            img.src = `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/main/${this.path}`;
            this.explorerEntry.appendChild(img);
        }
    }
    render() {
        if (this.parent)
            this.parent.sidebarContents.appendChild(this.sidebarEntry);
        else
            this.explorer.sidebar.appendChild(this.sidebarEntry);
    }
    ext() {
        const p = this.name.split('.');
        return p.length > 1 ? p[p.length - 1].toLowerCase() : '';
    }
    async loadFileText() {
        const ext = this.ext();
        if (!Text_Extensions.has(ext))
            return this.explorer.closeTextViewer();
        this.explorer.resetTextViewer();
        const pre = Date.now();
        try {
            const file_api = new CodebaseAPI(this.repo, this.path);
            const data = await file_api.fetchJson();
            if (!data.content)
                throw new Error('No content');
            if (data.encoding !== 'base64')
                throw new Error('Not base64 encoded');
            const decoded = file_api.decodeBase64(data.content);
            if (decoded === null)
                throw new Error('Decoding failed');
            this.explorer.explorer.parentElement?.classList.add('view_text');
            this.explorer.text_viewer.textContent = decoded;
            hljs.highlightElement(this.explorer.text_viewer);
            // breadcrumb
            this.explorer.path.innerHTML = '';
            if (this.parent)
                this.explorer.showPath(this.parent);
            const file_entry = document.createElement('div');
            file_entry.className = 'file-item';
            file_entry.textContent = this.name;
            this.explorer.path.appendChild(file_entry);
            MainNotificationHolder.notify(`Text file loaded! (${Date.now() - pre}ms)`, 'success');
        }
        catch (err) {
            this.explorer.closeTextViewer();
            MainNotificationHolder.notify('The API request failed! ' + err, 'error');
            return this.explorer.closeTextViewer();
        }
    }
}
class Folder extends Entry {
    type = 'dir';
    children = [];
    expanded = false;
    loaded = false;
    sidebarContents;
    // quick lookup
    childrenByName = new Map();
    // to avoid duplication
    childrenByPath = new Set();
    constructor(repo, path, parent, explorer, name) {
        super(repo, path, parent, explorer, name);
        this.sidebarEntry.className = 'folder';
        const label = document.createElement('div');
        label.className = 'folder-label';
        label.textContent = this.name;
        label.onclick = (e) => { e.stopPropagation(); this.toggle(); };
        this.sidebarEntry.appendChild(label);
        this.explorerEntry.className = 'folder-label';
        this.explorerEntry.setAttribute('item-name', this.name);
        this.explorerEntry.textContent = this.name;
        this.explorerEntry.onclick = (e) => { e.stopPropagation(); this.open(); };
        this.sidebarContents = document.createElement('div');
        this.sidebarContents.className = 'folder-contents';
        this.sidebarContents.style.display = 'none';
        this.sidebarEntry.appendChild(this.sidebarContents);
    }
    render() {
        if (this.parent)
            this.parent.sidebarContents.appendChild(this.sidebarEntry);
        else
            this.explorer.sidebar.appendChild(this.sidebarEntry);
    }
    async load() {
        if (this.loaded) {
            MainNotificationHolder.notify('Folder cached!', 'info');
            return;
        }
        const folder_api = new CodebaseAPI(this.repo, this.path);
        const pre = Date.now();
        try {
            const files = await folder_api.fetchJson();
            for (const f of files) {
                if (this.childrenByPath.has(f.path))
                    continue;
                let child;
                if (f.type === 'dir')
                    child = new Folder(this.repo, f.path, this, this.explorer, f.name);
                else
                    child = new FileNode(this.repo, f.path, this, this.explorer, f);
                this.children.push(child);
                this.childrenByName.set(child.name, child);
                this.childrenByPath.add(f.path);
            }
            this.loaded = true;
            MainNotificationHolder.notify(`Folder loaded successfully (${Date.now() - pre}ms)`, 'success');
        }
        catch (err) {
            MainNotificationHolder.notify(`GitHub API Error! ${err?.toString?.() ?? err}`, 'error');
            this.loaded = false;
        }
    }
    async toggle() {
        if (this.expanded) {
            this.expanded = false;
            this.sidebarContents.style.display = 'none';
            return;
        }
        await this.open();
    }
    async open() {
        this.explorer.current_directory = this;
        this.explorer.closeTextViewer();
        this.explorer.clear();
        this.explorer.showPath(this);
        this.sidebarContents.style.display = 'flex';
        await this.load();
        for (const child of this.children) {
            if (!child.sidebarEntry.isConnected)
                child.render();
        }
        this.explorer.showChildren(this);
        this.expanded = true;
    }
    // O(1) lookup (awesome sauce)
    async findChild(name) {
        if (!this.loaded)
            await this.load();
        const entry = this.childrenByName.get(name);
        return entry ?? null;
    }
}
class FileExplorer {
    explorer;
    text_viewer;
    text_close;
    sidebar;
    path;
    roots = [];
    current_directory;
    constructor(info) {
        this.explorer = new ScrollGlassPane('y', info.explorer, { width: 'calc(100% - 20px)', height: 'calc(100% - 20px)' }).element;
        this.text_viewer = new ScrollGlassPane('y', info.explorer, { width: 'calc(100% - 20px)', height: '100%' }).element;
        this.sidebar = new ScrollGlassPane('y', info.sidebar, { width: '100%', height: '100% - 20px' }).element;
        this.path = new FlexGlassPane(info.path, CSS_FullSize).element;
        this.text_close = document.createElement('button');
        this.explorer.parentElement?.appendChild(this.text_close);
        this.text_close.onclick = () => this.closeTextViewer();
        this.explorer.classList.add('file_explorer_pane');
        this.text_viewer.className = 'text_viewer_pane scroll_pane_y';
        this.sidebar.classList.add('file_sidebar_pane');
        this.path.classList.add('file_path_pane');
        this.text_close.classList.add('shadowglass', 'close_text');
        this.explorer.classList.remove('glass');
        this.sidebar.classList.remove('glass');
        this.path.classList.remove('glass');
    }
    addRoot(repo) {
        const exists = this.roots.find(r => r.repo.owner === repo.owner && r.repo.name === repo.name);
        if (exists)
            return exists;
        const root = new Folder(repo, '', null, this, repo.name);
        this.roots.push(root);
        root.render();
        // void root.open().catch(() => { console.log('hello') });
        MainNotificationHolder.notify('Fetching codebase...', 'success');
        return root;
    }
    clear() {
        this.explorer.innerHTML = '';
        this.path.innerHTML = '';
    }
    getRootFolder(name) {
        for (var i = 0; i < this.roots.length; i++) {
            let root = this.roots[i];
            if (root.name == name)
                return root;
        }
        return null;
    }
    async loadProjectRoot(name) {
        let root = this.getRootFolder(name);
        if (!root)
            return;
        await root.open();
    }
    async loadProjectPath(url) {
        const pre_time = Date.now();
        const domain_array = window.location.href.split('/');
        let domain = domain_array[2];
        if (domain === '127.0.0.1:5500')
            domain = 'https://www.kircic.org/'; // for live server vscode extension
        if (url.startsWith('http') && !url.includes(domain)) {
            MainNotificationHolder.notify('Selected project is not hosted here', 'error');
            return;
        }
        if (!url.endsWith('index.html')) {
            if (!url.endsWith('/'))
                url = url + '/';
            url = url + 'index.html';
        }
        if (url.includes(domain) || url.includes('www.' + domain)) {
            url = url.split(domain)[1];
        }
        const subpage_array = url.split('/');
        let origin_folder = this.roots[0];
        let target_file = null;
        if (!origin_folder) {
            MainNotificationHolder.notify('No repo root loaded', 'error');
            return;
        }
        for (let i = 0; i < subpage_array.length; i++) {
            const folder_name = subpage_array[i];
            if (!folder_name)
                continue;
            const folder_entry = await origin_folder.findChild(folder_name);
            if (!folder_entry) {
                if (i === subpage_array.length - 1) {
                    MainNotificationHolder.notify('Path not found!', 'error');
                }
                break;
            }
            if (folder_entry instanceof Folder) {
                origin_folder = folder_entry;
                // attempt to open
                await origin_folder.open();
                MainNotificationHolder.notify('Subfolder indexed...', 'info');
                continue;
            }
            if (folder_entry instanceof FileNode) {
                target_file = folder_entry;
                MainNotificationHolder.notify('Target file found!', 'success');
                break;
            }
        }
        if (target_file) {
            this.sidebar.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
            MainNotificationHolder.notify(`Operation completed! (${Date.now() - pre_time}ms)`, 'info');
        }
    }
    showPath(folder) {
        this.path.innerHTML = '';
        const chain = [];
        let cur = folder;
        while (cur !== null) {
            chain.push(cur);
            cur = cur.parent;
        }
        chain.reverse();
        for (const f of chain) {
            const el = document.createElement('div');
            el.className = 'folder-label breadcrumb-item';
            el.textContent = f.name;
            el.onclick = () => { if (f !== this.current_directory)
                void f.open(); };
            this.path.appendChild(el);
        }
    }
    showChildren(folder) {
        this.explorer.innerHTML = '';
        for (const child of folder.children) {
            if (!child.explorerEntry.isConnected)
                this.explorer.appendChild(child.explorerEntry);
        }
    }
    resetTextViewer() {
        this.text_viewer.removeAttribute('data-highlighted');
        this.text_viewer.innerHTML = '';
        this.text_viewer.className = 'text_viewer_pane scroll_pane_y';
    }
    closeTextViewer() {
        if (this.current_directory) {
            this.path.innerHTML = '';
            this.showPath(this.current_directory);
        }
        this.resetTextViewer();
        this.explorer.parentElement?.classList.remove('view_text');
    }
}
class CodebasePage extends Page {
    main_repo;
    repo_queue = [];
    loaded = false;
    sidebar_pane;
    header_pane;
    explorer_pane;
    explorer;
    constructor(parent, repo) {
        super('codebase', parent);
        this.main_repo = repo;
        this.sidebar_pane = new GlassPane(this.element, { width: '280px', height: '100%', overflowY: 'auto' });
        this.header_pane = new GlassPane(this.element, { width: 'calc(100% - 290px)', height: '40px', left: '290px' });
        this.explorer_pane = new GlassPane(this.element, { width: 'calc(100% - 290px)', height: 'calc(100% - 50px)', left: '290px', top: '50px' });
        ManageCSS.addMobileEntry(this.header_pane.element, { left: '0', width: 'calc(100dvw - 20px)' }, 'body');
        ManageCSS.addMobileEntry(this.explorer_pane.element, { left: '0', width: 'calc(100dvw - 20px)', height: 'calc(50dvh - 75px)' }, 'body');
        ManageCSS.addMobileEntry(this.sidebar_pane.element, { left: '0', top: 'calc(50dvh - 15px)', width: 'calc(100dvw - 20px)', height: 'calc(50dvh - 75px)' }, 'body');
        this.sidebar_pane.setAbsolute();
        this.header_pane.setAbsolute();
        this.explorer_pane.setAbsolute();
        this.explorer = new FileExplorer({
            explorer: this.explorer_pane.element,
            sidebar: this.sidebar_pane.element,
            path: this.header_pane.element,
        });
    }
    showPage() {
        this.element.classList.add('show');
        if (this.loaded)
            return;
        const main_folder = this.explorer.addRoot(this.main_repo);
        void main_folder.open().then(() => {
            void this.explorer.loadProjectPath(main_folder.path);
            for (let i = 0; i < this.repo_queue.length; i++) {
                this.explorer.addRoot(this.repo_queue[i]);
            }
        });
        this.loaded = true;
    }
    addRepo(repo) {
        if (!this.loaded) {
            this.repo_queue.push(repo);
            return;
        }
        this.explorer.addRoot(repo);
    }
    loadProjectRoot(name) {
        this.repo_queue = [];
        ManagePages.showPage('codebase');
        this.explorer.loadProjectRoot(name);
    }
    loadProjectPath(url) {
        ManagePages.showPage('codebase');
        this.explorer.loadProjectPath(url);
    }
}
const Codebase = new CodebasePage(Content.element, { owner: 'Korwith', name: 'kircic.org' });
Codebase.addRepo({ owner: 'Korwith', name: 'snap.red' });
Codebase.addRepo({ owner: 'Korwith', name: 'file-manager' });
Codebase.addRepo({ owner: 'Korwith', name: 'stock-watch' });
