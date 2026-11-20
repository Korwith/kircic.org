/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

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
    constructor(sidebar: PageSidebar | SidebarSegment) {
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
    settings: SidebarSegmentSettings;

    constructor(sidebar: PageSidebar) {
        super(sidebar);
        this.element.classList.add('center');
        this.navigation = new SidebarSegmentNavigation(this);
        this.tools = new SidebarSegmentTools(this);
        this.settings = new SidebarSegmentSettings(this);
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
    // planner: SidebarButtonPlanner;
    notes: SidebarButtonNotes;

    constructor(parent: SidebarSegment) {
        super(parent);
        this.search = new SidebarButtonSearch(this);
        //this.planner = new SidebarButtonPlanner(this);
        this.notes = new SidebarButtonNotes(this);

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
        super(segment, { icon: '../icon/stack.svg' });
        this.setText('kircic.org');
        this.setHref('#home');
    }
}

// displays snap.red
class SidebarButtonLinkSnap extends SidebarButtonLink {
    constructor(segment: SidebarSegment) {
        super(segment, { icon: '../icon/image.svg', size: '95%' });
        this.setText('snap.red');
        this.setHref('https://snap.red');
    }
}

// home button
class SidebarButtonHome extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, { icon: '../icon/home.svg', size: '80%' }, 'home');
        this.setText('Home');
    }
}

// project button
class SidebarButtonProject extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, { icon: '../icon/cube.svg', size: '90%' }, 'projects');
        this.setText('Projects');
    }
}

// codebase button
class SidebarButtonCode extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, { icon: '../icon/code.svg', size: '92%' }, 'codebase');
        this.setText('Codebase');
    }
}

// search button
class SidebarButtonSearch extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, { icon: '../icon/search.svg', size: '90%' }, 'search');
        this.setText('Search');
    }
}

// planner button
class SidebarButtonPlanner extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, { icon: '../icon/tasks.svg', size: '80%' }, 'planner');
        this.setText('Planner');
    }
}

// notes button
class SidebarButtonNotes extends SidebarButtonPage {
    constructor(segment: SidebarSegment) {
        super(segment, { icon: '../icon/notes.svg', size: '116%' }, 'notes');
        this.setText('Notes');
    }
}

interface SettingsSaveData {
    page_color: string;
    dark_theme: boolean;
    save_searches: boolean;
    search_new_tab: boolean;
}

// settings panel
class SidebarSegmentSettings extends SidebarSegmentGroup {
    general: SidebarSettingsGeneral;
    search: SidebarSettingsSearch;
    other: SidebarSettingsOther;
    storage: SettingsStorage = new SettingsStorage();

    constructor(parent: SidebarSegmentCenter) {
        super(parent);
        this.element.classList.add('settings');
        this.general = new SidebarSettingsGeneral(this);
        this.search = new SidebarSettingsSearch(this);
        this.other = new SidebarSettingsOther(this);

        this.element.addEventListener('setting', () => this.saveSettingsData());
        this.loadSettingsData();
        this.setParent(parent);
    }

    // applies the previous save to every option
    public loadSettingsData(): void {
        const data: SettingsSaveData = this.storage.fetch();
        if (!data) return;
        this.general.hue.picker.inner.value = data.page_color;
        this.general.theme.slider.toggle(data.dark_theme);
        this.search.search_save.slider.toggle(data.save_searches);
        this.search.search_new_tab.slider.toggle(data.search_new_tab);
    }

    // gathers every option's value and puts them in a savable format
    public saveSettingsData(): void {
        const data: SettingsSaveData = {
            page_color: this.general.hue.picker.inner.value,
            dark_theme: this.general.theme.slider.isOn(),
            save_searches: this.search.search_save.slider.isOn(),
            search_new_tab: this.search.search_new_tab.slider.isOn(),
        };
        this.storage.save(data);
    }
}

// an individual setting
abstract class SettingOption extends PageElement {
    span: HTMLElement;

    constructor(parent: SidebarSegment) {
        super();
        this.span = document.createElement('span');

        this.element.classList.add('option');
        this.element.appendChild(this.span);
        this.setParent(parent);
    }

    public setName(text: string): void {
        this.span.textContent = text;
    }
}

// setting config (eg slider, color picker)
abstract class SettingOptionType extends PageElement {
    option: SettingOption;

    constructor(option: SettingOption, tag: string) {
        super(tag);
        this.option = option;

        this.setParent(option);
    }

    // notifies the settings panel that this option changed
    protected changed(): void {
        this.element.dispatchEvent(new Event('setting', { bubbles: true }));
    }
}

// various settings
abstract class SidebarSettingsButton extends PageElement {
    constructor(parent: SidebarSegment) {
        super('button');
        this.element.classList.add('settings_button', 'glass', 'dark', 'gradient');
        this.setParent(parent);
        this.element.onclick = () => this.onclick();
    }

    protected setText(text: string) {
        this.element.textContent = text;
    }

    protected abstract onclick(): void;
}

// setting config (slider)
class SettingOptionSlider extends SettingOptionType {
    inner: HTMLElement;

    constructor(option: SettingOption) {
        super(option, 'div');
        this.element.classList.add('glass', 'gradient', 'slider');

        this.inner = document.createElement('div');
        this.inner.classList.add('glass', 'gradient', 'inner');

        this.element.onclick = () => {
            this.toggle();
            this.changed();
        };
        this.element.appendChild(this.inner);
    }

    // optional hook run whenever the slider changes state (click or load)
    public onToggle?: (on: boolean) => void;

    public toggle(force?: boolean) {
        this.element.classList.toggle('on', force);
        this.onToggle?.(this.isOn());
    }

    public isOn(): boolean {
        return this.element.classList.contains('on');
    }
}

// setting config (color picker)
class SettingOptionColor extends SettingOptionType {
    inner: HTMLInputElement;

    constructor(option: SettingOption) {
        super(option, 'div');
        this.element.classList.add('glass', 'gradient', 'color');

        this.inner = document.createElement('input');
        this.inner.type = 'color';

        this.element.onclick = () => this.inner.click();
        this.inner.addEventListener('change', () => this.changed());
        this.element.appendChild(this.inner);
    }
}

// general page settings
class SidebarSettingsGeneral extends SidebarSegment {
    hue: OptionPageColor;
    theme: OptionDarkTheme;

    constructor(parent: SidebarSegmentSettings) {
        super(parent);
        this.element.classList.add('general');
        this.addCaption('General');

        this.hue = new OptionPageColor(this);
        this.theme = new OptionDarkTheme(this);
    }
}

// option for page color hue
class OptionPageColor extends SettingOption {
    picker: SettingOptionColor;

    constructor(parent: SidebarSettingsGeneral) {
        super(parent);
        this.picker = new SettingOptionColor(this);

        this.element.classList.add('hue');
        this.setName('Page Color');
    }
}

// switches the page between the dark and light themes
// theme colors live as css variables on :root (see styles/index.scss)
class PageTheme {
    private static initialized: boolean = false;

    public static apply(dark: boolean): void {
        const root: HTMLElement = document.documentElement;

        // applies during startup (default + saved theme) skip the transition
        if (!PageTheme.initialized) {
            root.classList.add('no_theme_transition');
            root.classList.toggle('light', !dark);
            // setTimeout (not requestAnimationFrame) so this still runs in background tabs
            setTimeout(() => {
                void root.offsetHeight;
                root.classList.remove('no_theme_transition');
                PageTheme.initialized = true;
            }, 50);
        } else {
            root.classList.toggle('light', !dark);
        }

        const meta: HTMLMetaElement | null = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = dark ? '#000001' : '#eceef3';
    }
}

// option for dark theme
class OptionDarkTheme extends SettingOption {
    slider: SettingOptionSlider;

    constructor(parent: SidebarSettingsGeneral) {
        super(parent);
        this.slider = new SettingOptionSlider(this);
        this.slider.onToggle = (on: boolean) => PageTheme.apply(on);
        this.slider.toggle(true);

        this.element.classList.add('theme');
        this.setName('Dark Theme');
    }
}

// search page configuration
class SidebarSettingsSearch extends SidebarSegment {
    search_save: OptionSearchSave;
    search_new_tab: OptionSearchNewTab;

    constructor(parent: SidebarSegmentSettings) {
        super(parent);
        this.element.classList.add('search');
        this.addCaption('Search');

        this.search_save = new OptionSearchSave(this);
        this.search_new_tab = new OptionSearchNewTab(this);
        this.setParent(parent);
    }    
}

class OptionSearchSave extends SettingOption {
    slider: SettingOptionSlider;

    constructor(parent: SidebarSettingsSearch) {
        super(parent);
        this.slider = new SettingOptionSlider(this);

        this.element.classList.add('save_searches');
        this.setName('Save Searches');
        this.setParent(parent);
    }
}

class OptionSearchNewTab extends SettingOption {
    slider: SettingOptionSlider;

    constructor(parent: SidebarSettingsSearch) {
        super(parent);
        this.slider = new SettingOptionSlider(this);

        this.element.classList.add('search_new_tab');
        this.setName('Open in New Tab');
        this.setParent(parent);
    }
}

// other settigns (doesnt fit the other categories)
class SidebarSettingsOther extends SidebarSegment {
    reset: SidebarSettingsButtonReset;

    constructor(parent: SidebarSegmentSettings) {
        super(parent);
        this.element.classList.add('other');

        this.reset = new SidebarSettingsButtonReset(this);
        this.addCaption('Other');

        this.setParent(parent);
    }
}

class SidebarSettingsButtonReset extends SidebarSettingsButton {
    constructor(parent: SidebarSettingsOther) {
        super(parent);
        this.setText('Reset Settings');
    }

    protected onclick(): void {
        console.log('settings should be reset')
    }
}