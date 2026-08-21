class PageSidebar extends GlassPane {
    manager: PageManager;
    header: SidebarSegmentHeader;
    center: SidebarSegmentCenter;
    footer: SidebarSegmentFooter;

    constructor(manager: PageManager) {
        super();
        this.element.classList.add('sidebar');
        this.manager = manager;
        this.header = new SidebarSegmentHeader(this);
        this.center = new SidebarSegmentCenter(this);
        this.footer = new SidebarSegmentFooter(this);
        this.setParent(manager.element);
    }
}

// abstract base for sidebar segments
abstract class SidebarSegment extends PageElement {
    sidebar: PageSidebar;
    parent: PageSidebar | SidebarSegment;

    constructor(parent: PageSidebar | SidebarSegment) {
        super();
        this.element.classList.add('segment');
        this.sidebar = parent instanceof PageSidebar ? parent : parent.sidebar;
        this.parent = parent;
        this.setParent(this.parent);
    }

    // adds a caption inside of the segment
    addCaption(text: string): void {
        const caption: HTMLElement = document.createElement('span');
        caption.classList.add('caption');
        caption.textContent = text;
        this.element.appendChild(caption);
    }
}

// groups for segments
abstract class SidebarSegmentGroup extends SidebarSegment {
    constructor(sidebar: PageSidebar) {
        super(sidebar);
        this.element.classList.remove('segment');
        this.element.classList.add('group');
    }
}

// top of the sidebar
// contains traffic buttons
// contains website links
class SidebarSegmentHeader extends SidebarSegmentGroup {
    traffic: SidebarSegmentTraffic;
    links: SidebarSegmentWebsites;

    constructor(sidebar: PageSidebar) {
        super(sidebar);
        this.element.classList.add('header');
        this.traffic = new SidebarSegmentTraffic(this);
        this.links = new SidebarSegmentWebsites(this);
        this.setParent(this.sidebar);
    }
}

// bulk of the sidebar
// contains page navigaton
// later should contain website customization
class SidebarSegmentCenter extends SidebarSegmentGroup {
    navigation: SidebarSegmentNavigation;
    tools: SidebarSegmentTools;

    constructor(sidebar: PageSidebar) {
        super(sidebar);
        this.element.classList.add('center');
        this.navigation = new SidebarSegmentNavigation(this);
        this.tools = new SidebarSegmentTools(this);
        this.setParent(this.sidebar);
    }
}

// bottom of the sidebar
// displays commit count and website size
class SidebarSegmentFooter extends SidebarSegment {
    stats: WebsiteStats;
    commits: HTMLElement;
    size: HTMLElement;

    constructor(sidebar: PageSidebar) {
        super(sidebar);
        this.stats = new WebsiteStats('Korwith', 'kircic.org');
        this.element.classList.add('footer');

        this.commits = document.createElement('span');
        this.size = document.createElement('span');

        this.commits.classList.add('glass', 'dark', 'gradient');
        this.size.classList.add('glass', 'dark', 'gradient');

        this.element.appendChild(this.commits);
        this.element.appendChild(this.size);

        this.loadCommitData();
    }

    public async loadCommitData(): Promise<void> {
        const commit_data: Promise<CommitData> = this.stats.fetchLastCommit();
        commit_data.then(async () => {
            this.commits.textContent = `${(await commit_data).count} commits`;
        });
        const commit_size: Promise<string> = this.stats.fetchRepoSize();
        commit_size.then(async () => {
            this.size.textContent = await commit_size;
        });
    }
}

// displays page control buttons (mac traffic buttons)
class SidebarSegmentTraffic extends SidebarSegment {
    red: TrafficButtonRed;
    yellow: TrafficButtonYellow;
    green: TrafficButtonGreen;

    constructor(parent: SidebarSegmentHeader) {
        super(parent);
        this.red = new TrafficButtonRed(this);
        this.yellow = new TrafficButtonYellow(this);
        this.green = new TrafficButtonGreen(this);
        this.element.classList.add('traffic');
    }
}

// abstract class for the various colors
abstract class TrafficButton extends PageElement {
    segment: SidebarSegmentTraffic;

    constructor(segment: SidebarSegmentTraffic) {
        super('button');
        this.segment = segment;
        this.setParent(this.segment)
    }

    protected abstract onclick(): void;
}

// fullscreen button
class TrafficButtonGreen extends TrafficButton {
    constructor(segment: SidebarSegmentTraffic) {
        super(segment);
        this.element.classList.add('green');
        this.element.onclick = () => this.onclick();
    }

    protected onclick() {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
    }
}

// minimize sidebar button
class TrafficButtonYellow extends TrafficButton {
    constructor(segment: SidebarSegmentTraffic) {
        super(segment);
        this.element.classList.add('yellow');
        this.element.onclick = () => this.onclick();
    }

    protected onclick() {
        this.segment.sidebar.manager.shiftView();
    }
}

// close page button
class TrafficButtonRed extends TrafficButton {
    constructor(segment: SidebarSegmentTraffic) {
        super(segment);
        this.element.classList.add('red');
        this.element.onclick = () => this.onclick();
    }

    protected onclick() {
        window.location.href = 'https://google.com';
    }
}

// displays links at the top of the sidebar
class SidebarSegmentWebsites extends SidebarSegment {
    kircic: SidebarButtonLinkKircic;
    snap: SidebarButtonLinkSnap;

    constructor(parent: SidebarSegmentHeader) {
        super(parent);
        this.element.classList.add('websites');
        this.kircic = new SidebarButtonLinkKircic(this);
        this.snap = new SidebarButtonLinkSnap(this);
    }
}

// main page navigation
class SidebarSegmentNavigation extends SidebarSegment {
    home: SidebarButtonHome;
    projects: SidebarButtonProject;
    codebase: SidebarButtonCode;

    constructor(parent: SidebarSegment) {
        super(parent);
        this.home = new SidebarButtonHome(this);
        this.projects = new SidebarButtonProject(this);
        this.codebase = new SidebarButtonCode(this);
        
        this.element.classList.add('navigation');
        this.addCaption('Navigation');
    }
}

// tools pannel
class SidebarSegmentTools extends SidebarSegment {
    search: SidebarButtonSearch;
    //checklist: SidebarButtonChecklist;

    constructor(parent: SidebarSegment) {
        super(parent);
        this.search = new SidebarButtonSearch(this);
        //this.checklist = new SidebarButtonChecklist(this);

        this.element.classList.add('tools');
        this.addCaption('Tools');
    }
}

// abstract base for sidebar buttons
abstract class SidebarButton extends PageElement {
    segment: SidebarSegment;

    constructor(segment: SidebarSegment, icon: IconEntry, tag?: string) {
        super(tag || 'button');
        this.segment = segment;
        this.element.classList.add('sidebar_button', 'glass', 'gradient');
        this.element.style.setProperty('--icon-url', `url('${icon.icon}')`);
        this.element.style.setProperty('--icon-size', icon.size || null);
        this.setParent(segment);
    }

    setText(text: string): void {
        this.element.textContent = text;
    }
}

// handles page opening
abstract class SidebarButtonPage extends SidebarButton {
    key: string;

    constructor(segment: SidebarSegment, icon: IconEntry, key: string) {
        super(segment, icon, 'button');
        this.key = key;
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
    }

    onclick(e: PointerEvent): void {
        this.segment.sidebar.manager.content.showPage(this.key);
    }
}

// link elements
abstract class SidebarButtonLink extends SidebarButton {
    constructor(segment: SidebarSegment, icon: IconEntry) {
        super(segment, icon, 'a');
    }

    setHref(href: string): void {
        this.element.setAttribute('href', href);
    }
}

// displays the current website
class SidebarButtonLinkKircic extends SidebarButtonLink {
    constructor(segment: SidebarSegment) {
        super(segment, {icon: '../icon/stack.svg'});
        this.setText('kircic.org');
        this.setHref('#home');
    }
}

// displays snap.red
class SidebarButtonLinkSnap extends SidebarButtonLink {
    constructor(segment: SidebarSegment) {
        super(segment, {icon: '../icon/image.svg', size: '95%'});
        this.setText('snap.red');
        this.setHref('https://snap.red');
    }
}

// home button
class SidebarButtonHome extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, {icon: '../icon/home.svg', size: '80%'}, 'home');
        this.setText('Home');
    }
}

// project button
class SidebarButtonProject extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, {icon: '../icon/cube.svg', size: '90%'}, 'projects');
        this.setText('Projects');
    }
}

// codebase button
class SidebarButtonCode extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, {icon: '../icon/code.svg', size: '92%'}, 'codebase');
        this.setText('Codebase');
    }
}

// search button
class SidebarButtonSearch extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, {icon: '../icon/search.svg', size: '90%'}, 'search');
        this.setText('Search');
    }
}

// checklist button
class SidebarButtonChecklist extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, {icon: '../icon/checklist.svg', size: '74%'}, 'checklist');
        this.setText('Checklist');
    }
}