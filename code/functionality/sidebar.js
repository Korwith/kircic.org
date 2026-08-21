"use strict";
class PageSidebar extends GlassPane {
    manager;
    header;
    center;
    footer;
    constructor(manager) {
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
class SidebarSegment extends PageElement {
    sidebar;
    parent;
    constructor(parent) {
        super();
        this.element.classList.add('segment');
        this.sidebar = parent instanceof PageSidebar ? parent : parent.sidebar;
        this.parent = parent;
        this.setParent(this.parent);
    }
    // adds a caption inside of the segment
    addCaption(text) {
        const caption = document.createElement('span');
        caption.classList.add('caption');
        caption.textContent = text;
        this.element.appendChild(caption);
    }
}
// groups for segments
class SidebarSegmentGroup extends SidebarSegment {
    constructor(sidebar) {
        super(sidebar);
        this.element.classList.remove('segment');
        this.element.classList.add('group');
    }
}
// top of the sidebar
// contains traffic buttons
// contains website links
class SidebarSegmentHeader extends SidebarSegmentGroup {
    traffic;
    links;
    constructor(sidebar) {
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
    navigation;
    tools;
    constructor(sidebar) {
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
    stats;
    commits;
    size;
    constructor(sidebar) {
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
    async loadCommitData() {
        const commit_data = this.stats.fetchLastCommit();
        commit_data.then(async () => {
            this.commits.textContent = `${(await commit_data).count} commits`;
        });
        const commit_size = this.stats.fetchRepoSize();
        commit_size.then(async () => {
            this.size.textContent = await commit_size;
        });
    }
}
// displays page control buttons (mac traffic buttons)
class SidebarSegmentTraffic extends SidebarSegment {
    red;
    yellow;
    green;
    constructor(parent) {
        super(parent);
        this.red = new TrafficButtonRed(this);
        this.yellow = new TrafficButtonYellow(this);
        this.green = new TrafficButtonGreen(this);
        this.element.classList.add('traffic');
    }
}
// abstract class for the various colors
class TrafficButton extends PageElement {
    segment;
    constructor(segment) {
        super('button');
        this.segment = segment;
        this.setParent(this.segment);
    }
}
// fullscreen button
class TrafficButtonGreen extends TrafficButton {
    constructor(segment) {
        super(segment);
        this.element.classList.add('green');
        this.element.onclick = () => this.onclick();
    }
    onclick() {
        if (!document.fullscreenElement)
            document.documentElement.requestFullscreen();
        else
            document.exitFullscreen();
    }
}
// minimize sidebar button
class TrafficButtonYellow extends TrafficButton {
    constructor(segment) {
        super(segment);
        this.element.classList.add('yellow');
        this.element.onclick = () => this.onclick();
    }
    onclick() {
        this.segment.sidebar.manager.shiftView();
    }
}
// close page button
class TrafficButtonRed extends TrafficButton {
    constructor(segment) {
        super(segment);
        this.element.classList.add('red');
        this.element.onclick = () => this.onclick();
    }
    onclick() {
        window.location.href = 'https://google.com';
    }
}
// displays links at the top of the sidebar
class SidebarSegmentWebsites extends SidebarSegment {
    kircic;
    snap;
    constructor(parent) {
        super(parent);
        this.element.classList.add('websites');
        this.kircic = new SidebarButtonLinkKircic(this);
        this.snap = new SidebarButtonLinkSnap(this);
    }
}
// main page navigation
class SidebarSegmentNavigation extends SidebarSegment {
    home;
    projects;
    codebase;
    constructor(parent) {
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
    search;
    //checklist: SidebarButtonChecklist;
    constructor(parent) {
        super(parent);
        this.search = new SidebarButtonSearch(this);
        //this.checklist = new SidebarButtonChecklist(this);
        this.element.classList.add('tools');
        this.addCaption('Tools');
    }
}
// abstract base for sidebar buttons
class SidebarButton extends PageElement {
    segment;
    constructor(segment, icon, tag) {
        super(tag || 'button');
        this.segment = segment;
        this.element.classList.add('sidebar_button', 'glass', 'gradient');
        this.element.style.setProperty('--icon-url', `url('${icon.icon}')`);
        this.element.style.setProperty('--icon-size', icon.size || null);
        this.setParent(segment);
    }
    setText(text) {
        this.element.textContent = text;
    }
}
// handles page opening
class SidebarButtonPage extends SidebarButton {
    key;
    constructor(segment, icon, key) {
        super(segment, icon, 'button');
        this.key = key;
        this.element.onclick = (e) => this.onclick(e);
    }
    onclick(e) {
        this.segment.sidebar.manager.content.showPage(this.key);
    }
}
// link elements
class SidebarButtonLink extends SidebarButton {
    constructor(segment, icon) {
        super(segment, icon, 'a');
    }
    setHref(href) {
        this.element.setAttribute('href', href);
    }
}
// displays the current website
class SidebarButtonLinkKircic extends SidebarButtonLink {
    constructor(segment) {
        super(segment, { icon: '../icon/stack.svg' });
        this.setText('kircic.org');
        this.setHref('#home');
    }
}
// displays snap.red
class SidebarButtonLinkSnap extends SidebarButtonLink {
    constructor(segment) {
        super(segment, { icon: '../icon/image.svg', size: '95%' });
        this.setText('snap.red');
        this.setHref('https://snap.red');
    }
}
// home button
class SidebarButtonHome extends SidebarButtonPage {
    constructor(segment) {
        super(segment, { icon: '../icon/home.svg', size: '80%' }, 'home');
        this.setText('Home');
    }
}
// project button
class SidebarButtonProject extends SidebarButtonPage {
    constructor(segment) {
        super(segment, { icon: '../icon/cube.svg', size: '90%' }, 'projects');
        this.setText('Projects');
    }
}
// codebase button
class SidebarButtonCode extends SidebarButtonPage {
    constructor(segment) {
        super(segment, { icon: '../icon/code.svg', size: '92%' }, 'codebase');
        this.setText('Codebase');
    }
}
// search button
class SidebarButtonSearch extends SidebarButtonPage {
    constructor(segment) {
        super(segment, { icon: '../icon/search.svg', size: '90%' }, 'search');
        this.setText('Search');
    }
}
// checklist button
class SidebarButtonChecklist extends SidebarButtonPage {
    constructor(segment) {
        super(segment, { icon: '../icon/checklist.svg', size: '74%' }, 'checklist');
        this.setText('Checklist');
    }
}
