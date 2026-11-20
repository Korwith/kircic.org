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
    background_size: number;
    background_blur: number;
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
        // older saves stored the untouched picker (#000000) or nothing, so fall back to the blue
        this.general.hue.picker.set(data.page_color && data.page_color !== '#000000' ? data.page_color : PageColor.default);
        this.general.theme.toggle.toggle(data.dark_theme);
        if (typeof data.background_size === 'number') this.general.background_size.slider.set(data.background_size);
        if (typeof data.background_blur === 'number') this.general.background_blur.slider.set(data.background_blur);
        this.search.search_save.toggle.toggle(data.save_searches);
        this.search.search_new_tab.toggle.toggle(data.search_new_tab);
    }

    // gathers every option's value and puts them in a savable format
    public saveSettingsData(): void {
        const data: SettingsSaveData = {
            page_color: this.general.hue.picker.inner.value,
            dark_theme: this.general.theme.toggle.isOn(),
            background_size: this.general.background_size.slider.value,
            background_blur: this.general.background_blur.slider.value,
            save_searches: this.search.search_save.toggle.isOn(),
            search_new_tab: this.search.search_new_tab.toggle.isOn(),
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

// setting config (eg toggle, step slider, color picker)
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

// setting config (on/off toggle switch)
class SettingOptionToggle extends SettingOptionType {
    inner: HTMLElement;

    constructor(option: SettingOption) {
        super(option, 'div');
        this.element.classList.add('glass', 'gradient', 'toggle');
        this.element.tabIndex = 0;
        this.element.setAttribute('role', 'switch');

        this.inner = document.createElement('div');
        this.inner.classList.add('glass', 'gradient', 'inner');

        this.element.onclick = () => {
            this.toggle();
            this.changed();
        };
        this.element.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key !== ' ' && e.key !== 'Enter') return;
            e.preventDefault();
            this.element.click();
        });
        this.element.appendChild(this.inner);
    }

    // optional hook run whenever the toggle changes state (click or load)
    public onToggle?: (on: boolean) => void;

    public toggle(force?: boolean) {
        this.element.classList.toggle('on', force);
        this.element.setAttribute('aria-checked', String(this.isOn()));
        this.onToggle?.(this.isOn());
    }

    public isOn(): boolean {
        return this.element.classList.contains('on');
    }
}

// setting config (multi-step slider)
// a glass rail with a fill and a draggable glass knob, snapping to fixed steps between min and max
// subclasses decide how the stored value is shown inside the knob
abstract class SettingOptionStepSlider extends SettingOptionType {
    label: HTMLElement;
    track: HTMLElement;
    rail: HTMLElement;
    fill: HTMLElement;
    thumb: HTMLElement;
    min: number;
    max: number;
    step: number;
    value: number;

    constructor(option: SettingOption, min: number, max: number, step: number) {
        super(option, 'div');
        this.min = min;
        this.max = max;
        this.step = step;
        this.value = min;
        this.element.classList.add('step_slider');

        this.label = document.createElement('span');
        this.label.classList.add('value');

        // track is the (invisible) hit area, the rail is what's drawn
        this.track = document.createElement('div');
        this.track.classList.add('track');
        this.track.tabIndex = 0;
        this.track.setAttribute('role', 'slider');
        this.track.setAttribute('aria-valuemin', String(min));
        this.track.setAttribute('aria-valuemax', String(max));

        this.rail = document.createElement('div');
        this.rail.classList.add('glass', 'gradient', 'rail');

        this.fill = document.createElement('div');
        this.fill.classList.add('fill');

        this.thumb = document.createElement('div');
        this.thumb.classList.add('glass', 'gradient', 'thumb');

        // the value sits inside the knob
        this.thumb.appendChild(this.label);
        this.rail.appendChild(this.fill);
        this.track.appendChild(this.rail);
        this.track.appendChild(this.thumb);
        this.element.appendChild(this.track);

        this.track.addEventListener('pointerdown', (e: PointerEvent) => this.dragStart(e));
        this.track.addEventListener('keydown', (e: KeyboardEvent) => this.keydown(e));
    }

    // optional hook run whenever the value changes (dragging or load)
    public onChange?: (value: number) => void;

    // how the stored value is presented inside the knob
    protected abstract format(value: number): string;

    public set(value: number): void {
        const stepped: number = Math.round((value - this.min) / this.step) * this.step + this.min;
        this.value = Math.min(this.max, Math.max(this.min, Number(stepped.toFixed(4))));

        const fraction: number = (this.value - this.min) / (this.max - this.min);
        this.track.style.setProperty('--step-fraction', String(fraction));
        this.label.textContent = this.format(this.value);
        this.track.setAttribute('aria-valuenow', String(this.value));
        this.track.setAttribute('aria-valuetext', this.label.textContent);
        this.onChange?.(this.value);
    }

    // maps a pointer position on the track to a value
    private fromPointer(e: PointerEvent): void {
        const rect: DOMRect = this.track.getBoundingClientRect();
        const knob: number = this.thumb.offsetWidth;
        const fraction: number = (e.clientX - rect.left - knob / 2) / Math.max(1, rect.width - knob);
        this.set(this.min + Math.min(1, Math.max(0, fraction)) * (this.max - this.min));
    }

    private dragStart(e: PointerEvent): void {
        const start: number = this.value;
        this.track.setPointerCapture(e.pointerId);
        this.element.classList.add('dragging');
        this.fromPointer(e);

        const move = (ev: PointerEvent) => this.fromPointer(ev);
        const end = () => {
            this.track.removeEventListener('pointermove', move);
            this.track.removeEventListener('pointerup', end);
            this.track.removeEventListener('pointercancel', end);
            this.element.classList.remove('dragging');
            if (this.value !== start) this.changed();
        };
        this.track.addEventListener('pointermove', move);
        this.track.addEventListener('pointerup', end);
        this.track.addEventListener('pointercancel', end);
    }

    private keydown(e: KeyboardEvent): void {
        const keys: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        const start: number = this.value;
        this.set(this.value + keys[e.key] * this.step);
        if (this.value !== start) this.changed();
    }
}

// step slider shown as a percentage relative to a baseline
// eg a baseline of 120 shows a stored 120 as 100%
class SettingOptionPercentSlider extends SettingOptionStepSlider {
    baseline: number;

    constructor(option: SettingOption, min: number, max: number, step: number, baseline: number = 100) {
        super(option, min, max, step);
        this.baseline = baseline;
    }

    protected format(value: number): string {
        return `${Math.round(value / this.baseline * 100)}%`;
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

        this.inner.addEventListener('input', () => this.onChange?.(this.inner.value));
        this.inner.addEventListener('change', () => this.changed());
        this.element.appendChild(this.inner);
    }

    // optional hook run whenever the color changes (picking or load)
    public onChange?: (hex: string) => void;

    public set(hex: string): void {
        this.inner.value = hex;
        this.onChange?.(hex);
    }
}

// general page settings
class SidebarSettingsGeneral extends SidebarSegment {
    hue: OptionPageColor;
    theme: OptionDarkTheme;
    background_size: OptionBackgroundSize;
    background_blur: OptionBackgroundBlur;

    constructor(parent: SidebarSegmentSettings) {
        super(parent);
        this.element.classList.add('general');
        this.addCaption('General');

        this.hue = new OptionPageColor(this);
        this.theme = new OptionDarkTheme(this);
        this.background_size = new OptionBackgroundSize(this);
        this.background_blur = new OptionBackgroundBlur(this);
    }
}

// option for page color hue
class OptionPageColor extends SettingOption {
    picker: SettingOptionColor;

    constructor(parent: SidebarSettingsGeneral) {
        super(parent);
        this.picker = new SettingOptionColor(this);
        this.picker.onChange = (hex: string) => PageColor.apply(hex);
        this.picker.set(PageColor.default);

        this.element.classList.add('hue');
        this.setName('Page Color');
    }
}

// recolors the blue backdrop (icon/blurred.svg) to the page color
// an svg color matrix swaps every pixel's rgb for the picked color and keeps its alpha,
// so the result is exact (css hue-rotate/sepia chains only approximate it)
class PageColor {
    public static readonly default: string = '#1f80ff';
    private static matrix: SVGFEColorMatrixElement;

    public static apply(hex: string): void {
        if (!PageColor.matrix) {
            document.body.insertAdjacentHTML('beforeend', '<svg width="0" height="0" style="position: absolute"><filter id="page_color" color-interpolation-filters="sRGB"><feColorMatrix type="matrix"/></filter></svg>');
            PageColor.matrix = document.querySelector('#page_color feColorMatrix')!;
        }

        const [r, g, b]: number[] = [1, 3, 5].map((i: number) => parseInt(hex.slice(i, i + 2), 16) / 255);
        PageColor.matrix.setAttribute('values', `0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 1 0`);
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
    toggle: SettingOptionToggle;

    constructor(parent: SidebarSettingsGeneral) {
        super(parent);
        this.toggle = new SettingOptionToggle(this);
        this.toggle.onToggle = (on: boolean) => PageTheme.apply(on);
        this.toggle.toggle(true);

        this.element.classList.add('theme');
        this.setName('Dark Theme');
    }
}

// scales and blurs the backdrop behind the page (body::before in styles/index.scss)
class PageBackdrop {
    // real background-size in %, presented to the user as 100%
    public static readonly default_size: number = 120;

    // icon/blurred.svg is already blurred (stdDeviation 175 on a 2439px wide image)
    // so blur is measured as a % of the image width, starting at that built in amount
    public static readonly inherent_blur: number = 175 / 2439 * 100;
    public static readonly default_blur: number = Math.round(PageBackdrop.inherent_blur);

    private static size: number = PageBackdrop.default_size;
    private static blur: number = PageBackdrop.default_blur;
    private static listening: boolean = false;

    public static setSize(percent: number): void {
        PageBackdrop.size = percent;
        document.documentElement.style.setProperty('--backdrop-size', `${percent}%`);
        PageBackdrop.applyBlur();
    }

    public static setBlur(percent: number): void {
        PageBackdrop.blur = percent;
        PageBackdrop.applyBlur();
    }

    // gaussian blurs stack as sqrt(a² + b²), so add only what's missing to reach the target
    // the image's on screen width depends on the viewport, so this reruns on resize
    private static applyBlur(): void {
        if (!PageBackdrop.listening) {
            window.addEventListener('resize', () => PageBackdrop.applyBlur());
            PageBackdrop.listening = true;
        }

        // read the rendered size since phones scale it differently (see styles/index.scss)
        const rendered: number = parseFloat(getComputedStyle(document.body, '::before').backgroundSize) || PageBackdrop.size;
        const width: number = window.innerWidth * rendered / 100;
        const target: number = PageBackdrop.blur / 100 * width;
        const inherent: number = PageBackdrop.inherent_blur / 100 * width;
        const extra: number = Math.sqrt(Math.max(0, target * target - inherent * inherent));
        document.documentElement.style.setProperty('--backdrop-blur', `${extra.toFixed(1)}px`);
    }
}

// option for the backdrop size
// stored as the real css percentage, shown relative to the default
class OptionBackgroundSize extends SettingOption {
    slider: SettingOptionPercentSlider;

    constructor(parent: SidebarSettingsGeneral) {
        super(parent);
        const base: number = PageBackdrop.default_size;
        this.slider = new SettingOptionPercentSlider(this, base * 0.5, base * 2, base * 0.05, base);
        this.slider.onChange = (value: number) => PageBackdrop.setSize(value);
        this.slider.set(base);

        this.element.classList.add('background_size');
        this.setName('Background Size');
    }
}

// option for the backdrop blur
// stored as % of the image width, can't go below the image's own blur
class OptionBackgroundBlur extends SettingOption {
    slider: SettingOptionPercentSlider;

    constructor(parent: SidebarSettingsGeneral) {
        super(parent);
        const base: number = PageBackdrop.default_blur;
        this.slider = new SettingOptionPercentSlider(this, base, 25, 1);
        this.slider.onChange = (value: number) => PageBackdrop.setBlur(value);
        this.slider.set(base);

        this.element.classList.add('background_blur');
        this.setName('Background Blur');
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
    toggle: SettingOptionToggle;

    constructor(parent: SidebarSettingsSearch) {
        super(parent);
        this.toggle = new SettingOptionToggle(this);

        this.element.classList.add('save_searches');
        this.setName('Save Searches');
        this.setParent(parent);
    }
}

class OptionSearchNewTab extends SettingOption {
    toggle: SettingOptionToggle;

    constructor(parent: SidebarSettingsSearch) {
        super(parent);
        this.toggle = new SettingOptionToggle(this);

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