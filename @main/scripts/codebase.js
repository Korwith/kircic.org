"use strict";
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
        this.name = name || path.split('/').pop() || '(root)';
        this.parent = parent;
        this.explorer = explorer;
        this.sidebarEntry = document.createElement('div');
        this.explorerEntry = document.createElement('div');
        this.explorerEntry.className = 'file-item';
        this.explorerEntry.textContent = this.name;
    }
}
class FileNode extends Entry {
    type = 'file';
    constructor(repo, path, parent, explorer, file) {
        super(repo, path, parent, explorer, file.name);
        this.sidebarEntry.className = 'file-item';
        this.sidebarEntry.textContent = this.name;
        this.explorerEntry.className = 'file-item file';
        this.explorerEntry.onclick = () => this.click();
        this.sidebarEntry.onclick = () => this.click();
        let file_icon = FileIcons.getClassWithColor(this.name);
        if (file_icon) {
            let add_classes = ['has-icon', ...file_icon.split(' ')];
            this.sidebarEntry.classList.add(...add_classes);
            this.explorerEntry.classList.add(...add_classes);
        }
        if (!this.name.includes('.'))
            return;
        let format = this.name.split('.')[1].toLowerCase();
        let images = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'avif', 'svg', 'ico'];
        if (!images.includes(format))
            return;
        let img = new Image();
        img.onload = () => {
            //img.style.aspectRatio = `${img.width}/${img.height}`;
        };
        img.onerror = () => {
            img.src = '../icon/globe.svg';
        };
        img.src = `https://raw.githubusercontent.com/${this.repo.owner}/${this.repo.name}/main/${this.path}`;
        this.explorerEntry.appendChild(img);
    }
    render() {
        this.parent?.sidebarContents.appendChild(this.sidebarEntry);
        this.explorer.explorer.appendChild(this.explorerEntry);
    }
    click() {
        this.loadFileText();
    }
    async loadFileText() {
        const text_extensions = [
            '.txt', '.md', '.markdown', '.js', '.ts', '.jsx', '.tsx',
            '.html', '.htm', '.css', '.scss', '.json', '.yaml', '.yml',
            '.xml', '.csv', '.svg', '.py', '.java', '.c', '.cpp', '.h',
            '.sh', '.bash', '.bat', '.ps1', '.php', '.rb', '.go', '.rs',
            '.swift', '.kt', '.kts', '.dart', '.lua', '.sql', '.log', '.ini', '.toml',
            '.gitignore'
        ];
        if (!text_extensions.includes('.' + this.name.split('.').pop()))
            return this.explorer.closeTextViewer();
        this.explorer.resetTextViewer();
        const pre_time = Date.now();
        MainNotificationHolder.notify('Attempting to load file...', 'stock');
        const url = `https://api.github.com/repos/${this.repo.owner}/${this.repo.name}/contents/${this.path}`;
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('API fetch unsuccessful!');
            }
            const data = await res.json();
            if (!data.content) {
                throw new Error('API fetch had no content!');
            }
            if (data.encoding !== 'base64') {
                throw new Error('This file is not a text file!');
            }
            this.explorer.explorer.parentElement?.classList.add('view_text');
            const decoded = atob(data.content);
            this.explorer.text_viewer.textContent = decoded;
            hljs.highlightElement(this.explorer.text_viewer);
            this.explorer.path.innerHTML = '';
            if (this.parent) {
                this.explorer.showPath(this.parent);
            }
            let file_entry = document.createElement('div');
            file_entry.classList.add('file-item');
            file_entry.textContent = this.name;
            this.explorer.path.appendChild(file_entry);
            const post_time = Date.now();
            MainNotificationHolder.notify(`Text file loaded! (${post_time - pre_time}ms)`, 'success');
        }
        catch (error) {
            this.explorer.closeTextViewer();
            MainNotificationHolder.notify('The API request failed! ' + error, 'error');
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
    constructor(repo, path, parent, explorer, name) {
        super(repo, path, parent, explorer, name);
        this.sidebarEntry.className = 'folder';
        this.explorerEntry.className = 'folder-label';
        this.explorerEntry.textContent = this.name;
        this.explorerEntry.onclick = (e) => { e.stopPropagation(); this.open(); };
        const label = document.createElement('div');
        label.className = 'folder-label';
        label.textContent = this.name;
        label.onclick = (e) => { e.stopPropagation(); this.toggle(); };
        this.sidebarEntry.appendChild(label);
        this.sidebarContents = document.createElement('div');
        this.sidebarContents.className = 'folder-contents';
        this.sidebarContents.style.display = 'none';
        this.sidebarEntry.appendChild(this.sidebarContents);
    }
    async load() {
        if (this.loaded) {
            MainNotificationHolder.notify('Folder cached!', 'info');
            return;
        }
        const url = `https://api.github.com/repos/${this.repo.owner}/${this.repo.name}/contents/${this.path}`;
        const pre_time = Date.now();
        MainNotificationHolder.notify('Attempting to load folder...', 'stock');
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(res.status.toString());
            }
            const files = await res.json();
            for (const f of files) {
                const child = f.type === 'dir'
                    ? new Folder(this.repo, f.path, this, this.explorer, f.name)
                    : new FileNode(this.repo, f.path, this, this.explorer, f);
                this.children.push(child);
                child.render();
            }
            this.loaded = true;
            const post_time = Date.now();
            MainNotificationHolder.notify(`Folder loaded successfully (${post_time - pre_time}ms)`, 'success');
        }
        catch (error) {
            MainNotificationHolder.notify(`GitHub API Error! ${error.toString()}`, 'error');
        }
        this.loaded = true;
    }
    async toggle() {
        if (this.expanded) {
            this.expanded = false;
            this.sidebarContents.style.display = 'none';
        }
        else {
            await this.open();
        }
    }
    async open() {
        this.explorer.current_directory = this;
        this.explorer.closeTextViewer();
        this.explorer.clear();
        this.explorer.showPath(this);
        this.sidebarContents.style.display = 'flex';
        await this.load();
        this.explorer.showChildren(this);
        this.expanded = true;
    }
    async findChild(name) {
        if (!this.expanded) {
            await this.load();
        }
        for (var i = 0; i < this.children.length; i++) {
            let entry = this.children[i];
            if (entry.name != name)
                continue;
            return entry;
        }
        return null;
    }
    render() {
        if (this.parent)
            this.parent.sidebarContents.appendChild(this.sidebarEntry);
        else
            this.explorer.sidebar.appendChild(this.sidebarEntry);
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
        const root = new Folder(repo, '', null, this, repo.name);
        this.roots.push(root);
        root.render();
        root.open();
        MainNotificationHolder.notify('Fetching codebase...', 'success');
        return root;
    }
    clear() {
        this.explorer.innerHTML = '';
        this.path.innerHTML = '';
    }
    async loadProjectPath(url) {
        const pre_time = Date.now();
        let domain_array = window.location.href.split('/');
        let domain = domain_array[2];
        if (domain == '127.0.0.1:5500') {
            domain = 'https://www.kircic.org/';
        }
        if (url.startsWith('http') && !url.includes(domain)) {
            MainNotificationHolder.notify('Selected project is not hosted here', 'error');
            return;
        }
        if (!url.endsWith('index.html')) {
            if (!url.endsWith('/')) {
                url = url + '/';
            }
            url = url + 'index.html';
        }
        if (url.includes(domain) || url.includes('www.' + domain)) {
            url = url.split(domain)[1];
        }
        let subpage_array = url.split('/');
        let origin_folder = this.roots[0];
        let target_file = null;
        for (var i = 0; i < subpage_array.length; i++) {
            let folder_name = subpage_array[i];
            if (folder_name.length == 0)
                continue;
            let folder_entry = await origin_folder.findChild(folder_name);
            if (folder_entry instanceof Folder) {
                origin_folder = folder_entry;
                origin_folder.open();
                MainNotificationHolder.notify('Subfolder indexed...', 'info');
                continue;
            }
            if (folder_entry instanceof FileNode) {
                target_file = folder_entry;
                MainNotificationHolder.notify('Target file found!', 'success');
                break;
            }
            if (i == subpage_array.length - 1) {
                MainNotificationHolder.notify('Path not found!', 'error');
            }
        }
        if (target_file) {
            //await target_file.loadFileText();
            this.sidebar.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
            const post_time = Date.now();
            MainNotificationHolder.notify(`Operation completed! (${post_time - pre_time}ms)`, 'info');
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
            el.onclick = () => {
                if (f !== this.current_directory) {
                    f.open();
                }
            };
            this.path.appendChild(el);
        }
    }
    showChildren(folder) {
        for (const child of folder.children) {
            if (child instanceof FileNode) {
                this.explorer.appendChild(child.explorerEntry);
            }
            else if (child instanceof Folder) {
                this.explorer.appendChild(child.explorerEntry);
            }
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
    constructor(name, parent, repo) {
        super(name, parent);
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
        if (!this.loaded) {
            let main_folder = this.explorer.addRoot(this.main_repo);
            for (var i = 0; i < this.repo_queue.length; i++) {
                let this_repo = this.repo_queue[i];
                this.explorer.addRoot(this_repo);
            }
            this.explorer.loadProjectPath(main_folder.path);
            this.explorer.showPath(main_folder);
            this.loaded = true;
        }
    }
    addRepo(repo) {
        if (!this.loaded) {
            this.repo_queue.push(repo);
            return;
        }
        this.explorer.addRoot(repo);
    }
    loadProjectPath(url) {
        this.hideOtherPages();
        this.showPage();
        this.explorer.loadProjectPath(url);
    }
}
const Codebase = new CodebasePage('code', Content.element, { owner: 'Korwith', name: 'kircic.org' });
Codebase.addRepo({ owner: 'Korwith', name: 'snap.red' });
Codebase.addRepo({ owner: 'Korwith', name: 'file-manager' });
Codebase.addRepo({ owner: 'Korwith', name: 'stock-watch' });
