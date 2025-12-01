interface LinkEntry {
    name: string;
    link?: string;
}

class SidebarPane extends GlassPane {
    constructor(parent: HTMLElement) {
        super(parent, { width: '280px', height: 'calc(100vh - 20px)', top: '10px', left: '10px', transition: 'transform 0.5s, left 0.5s' });
        ManageCSS.addDesktopEntry(this.element, { left: '-300px' }, 'body.shift');
        ManageCSS.addMobileEntry(this.element, { width: 'calc(100dvw - 20px)', height: 'calc(100dvh - 90px)', top: '80px', transform: 'translateX(calc(-100% - 10px))' }, 'body');
        ManageCSS.addMobileEntry(this.element, { transform: 'translateX(0)', left: '10px !important' }, 'body.shift');

        this.element.classList.add('glass', 'sidebar');
        this.setAbsolute();
    }
}

class SidebarInnerPane extends Pane {
    constructor(parent: HTMLElement) {
        super(parent, { width: 'calc(100% + 10px)', height: 'fit-content' });
        this.element.classList.add('sidebar_pane');
    }
}

class ScrollingSidebarInnerPane extends SidebarInnerPane {
    constructor(parent: HTMLElement) {
        super(parent);
        ManageCSS.addDesktopEntry(this.element, {overflowX: 'hidden', overflowY: 'auto'} );
    }
}

class SidebarButton {
    element: HTMLElement;
    link_info: LinkEntry;

    constructor(parent: HTMLElement, link_info: LinkEntry, icon_info: IconEntry) {
        this.link_info = link_info;
        this.element = document.createElement('a');
        this.element.classList.add('sidebar_button');
        this.element.setAttribute('href', link_info.link || '');
        this.element.onclick = () => this.#buttonClicked();

        let icon = document.createElement('icon');
        icon.classList.add('icon');
        icon.style.backgroundSize = icon_info.size || '100%';
        icon.style.backgroundImage = `url(${icon_info.icon})`;
        this.element.appendChild(icon);

        let text = document.createElement('span');
        text.classList.add('text');
        text.textContent = link_info.name;

        this.element.appendChild(text);
        parent.appendChild(this.element);
    }

    #buttonClicked() {
        let inner_page = this.link_info.link && this.link_info.link.includes('#');
        if (!inner_page) return;
        if (!this.link_info.link) return;
        ManagePages.showPage(this.link_info.link.replace('#', '') as PageName);
        if (window.innerWidth < 767 && document.body.classList.contains('shift'))
            document.body.classList.remove('shift');
    }
}

class SidebarBreak {
    element: HTMLElement;

    constructor(parent: HTMLElement) {
        this.element = document.createElement('hr');
        this.element.classList.add('sidebar_break');
        parent.appendChild(this.element);
    }
}

class SidebarFooter {
    element: HTMLElement;

    constructor(parent: HTMLElement) {
        this.element = document.createElement('div');
        this.element.classList.add('sidebar_footer');
        parent.appendChild(this.element);
    }
}

class SidebarFooterEntry {
    element: HTMLElement;

    constructor(parent: HTMLElement, value?: string, type?: 'div'|'button') {
        this.element = document.createElement(type || 'div');
        this.element.classList.add('darkglass', 'footer_entry');
        if (value) this.setText(value);
        parent.appendChild(this.element);
    }

    setText(value: string) {
        this.element.textContent = value;
    }
}

class PreFooterEntry extends SidebarFooterEntry {
    constructor(parent: HTMLElement, value?: string, type?: 'div'|'button') {
        super(parent, value, type);
        ManageCSS.addDesktopEntry(this.element, {padding: '3px', 'padding-left': '8px', 'padding-right': '8px', 'font-weight': '700'});
    }
}

class LastCommitEntry extends PreFooterEntry {
    constructor(parent: HTMLElement) {
        super(parent);
        ManageCSS.addDesktopEntry(this.element, {'font-family': 'monospace'});
    }
}

// Misc
class MacDots {
    element: HTMLElement;

    constructor(parent: HTMLElement) {
        this.element = document.createElement('div');
        this.element.classList.add('mac_button_row');
        parent.appendChild(this.element);

        let buttons: string[] = ['red', 'yellow', 'green'];
        for (var i = 0; i < buttons.length; i++) {
            let color: string = buttons[i];
            let button: HTMLElement = document.createElement('div');
            button.classList.add('mac_button');
            button.classList.add(color);
            this.element.appendChild(button);
        }
    }
}

const Sidebar: SidebarPane = new SidebarPane(document.body);
Sidebar.setAbsolute();

const PageControlButtons: MacDots = new MacDots(Sidebar.element);
const ExternalPagePane: SidebarInnerPane = new SidebarInnerPane(Sidebar.element);
const CurrentLink: SidebarButton = new SidebarButton(ExternalPagePane.element, { name: 'kircic.org' }, { icon: '@main/icon/stack.svg' });
CurrentLink.element.classList.add('active');

const SnapshotLink: SidebarButton = new SidebarButton(ExternalPagePane.element, { name: 'snap.red', link: 'https://snap.red' }, { icon: '@main/icon/image.svg', size: '95%' });
new SidebarBreak(Sidebar.element);

const InternalPageHolder: ScrollingSidebarInnerPane = new ScrollingSidebarInnerPane(Sidebar.element);

const InternalPagePane: SidebarInnerPane = new SidebarInnerPane(InternalPageHolder.element);

new TextSubheader(InternalPagePane.element, 'Navigation');
const HomeLink: SidebarButton = new SidebarButton(InternalPagePane.element, { name: 'Home', link: '#home' }, { icon: '@main/icon/home.svg', size: '80%' });
const ProjectsLink: SidebarButton = new SidebarButton(InternalPagePane.element, { name: 'Projects', link: '#projects' }, { icon: '@main/icon/cube.svg', size: '90%' });
const CodeLink: SidebarButton = new SidebarButton(InternalPagePane.element, { name: 'Codebase', link: '#codebase' }, { icon: '@main/icon/code.svg', size: '92%' });
const SearchLink: SidebarButton = new SidebarButton(InternalPagePane.element, { name: 'Search', link: '#search' }, { icon: '@main/icon/search.svg', size: '90%' });
new SidebarBreak(InternalPageHolder.element);

const SettingsPane = new SidebarInnerPane(InternalPageHolder.element);
new TextSubheader(SettingsPane.element, 'Customization');
const PageColor = new SettingsEntry(SettingsPane.element, 'Page Color', 'color');

new SidebarBreak(SettingsPane.element);
new TextSubheader(SettingsPane.element, 'Search');
const HideBookmarks = new SettingsEntry(SettingsPane.element, 'Hide Bookmarks', 'switch');
const SaveLastSearch = new SettingsEntry(SettingsPane.element, 'Save Last Search', 'switch');
const MoreSavedSearches = new SettingsEntry(SettingsPane.element, 'More Saved Searches', 'switch');
const OpenNewTab = new SettingsEntry(SettingsPane.element, 'Open New Tab', 'switch');

const CommitChange: LastCommitEntry = new LastCommitEntry(SettingsPane.element);
const SideFooter: SidebarFooter = new SidebarFooter(Sidebar.element);
const CommitCountEntry: SidebarFooterEntry = new SidebarFooterEntry(SideFooter.element, 'commits');
const SizeEntry = new SidebarFooterEntry(SideFooter.element, 'KB');

StatisticsManager.fetchLastCommit()
    .then((data: CommitData) => {
        CommitCountEntry.setText(`${data.count} commits`);
        CommitChange.setText(data.name);
    });
StatisticsManager.fetchRepoSize()
    .then((e: string) => {
        SizeEntry.setText(e);
    })