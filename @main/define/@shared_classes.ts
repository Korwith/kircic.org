const SettingsData: StorageHandler = new StorageHandler('settings');
const BookmarksData: StorageHandler = new StorageHandler('bookmarks');
const ManageCSS: CSSManagement = new CSSManagement();

// Website Stuff
class BlurredImageBackground {
    element: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('blurred_bg');
        document.body.appendChild(this.element);

        document.addEventListener('Page Color', ((e: CustomEvent<SettingsEventData>) => {
            this.#changeHue(e.detail.data as string);
        }) as EventListener);
    }

    #changeHue(target_hex: string): void {
        let filter: string = this.#getFilterString('#0c3365', target_hex);
        this.element.style.filter = filter;

    }

    #getFilterString = (current_hex: string, target_hex: string): string => {
        const toRGB = (hex: string): [number, number, number] => {
            const h: string = hex.replace('#', '');
            const big: number = parseInt(h.padEnd(6, h), 16);
            return [big >> 16, big >> 8 & 255, big & 255];
        };
        const [r1, g1, b1]: [number, number, number] = toRGB(current_hex);
        const [r2, g2, b2]: [number, number, number] = toRGB(target_hex);
        const hue = (r: number, g: number, b: number): number => {
            const max: number = Math.max(r, g, b);
            const min: number = Math.min(r, g, b);
            const d: number = max - min;
            if (d === 0) return 0;
            let h: number;
            if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            else if (max === g) h = ((b - r) / d + 2) / 6;
            else h = ((r - g) / d + 4) / 6;
            return h * 360;
        };
        let hueDiff: number = hue(r2, g2, b2) - hue(r1, g1, b1);
        hueDiff = ((hueDiff + 180) % 360) - 180;
        const chroma: number = Math.max(r2, g2, b2) - Math.min(r2, g2, b2);
        const luminance: number = (r2 * 299 + g2 * 587 + b2 * 114) / 1000;
        if (luminance < 30) return `hue-rotate(${hueDiff}deg) brightness(0)`;
        if (luminance > 225 || chroma < 25) return `hue-rotate(${hueDiff}deg) contrast(0)`;
        return `hue-rotate(${hueDiff}deg)`;
    };
}

// Parent
class Pane {
    element: HTMLElement;

    constructor(parent: HTMLElement, css: CSS, mobile_css?: CSS) {
        this.element = document.createElement('div');
        ManageCSS.addDesktopEntry(this.element, css);
        if (mobile_css) {
            ManageCSS.addMobileEntry(this.element, mobile_css);
        }

        this.element.classList.add('inline_pane');
        parent.appendChild(this.element);
    }

    setAbsolute() {
        this.element.classList.remove('inline_pane');
        this.element.classList.add('absolute');
    }

    setHidden(status: boolean) {
        this.element.classList.toggle('hide', status);
    }
}

interface PageDictionary {
    [key: string]: Page;
}

let page_index: PageDictionary = {};
class Page extends Pane {
    constructor(name: string, parent: HTMLElement) {
        super(parent, CSS_FullSize);
        this.element.classList.add('page');
        this.element.setAttribute('page', name);
        page_index[name] = this;
    }

    showPage() {
        this.element.classList.add('show');
    }

    hidePage() {
        this.element.classList.remove('show');
    }

    hideOtherPages() {
        let pages: NodeListOf<HTMLElement> = document.querySelectorAll('.page');
        for (var i = 0; i < pages.length; i++) {
            let found_page: HTMLElement = pages[i];
            if (found_page == this.element) continue;
            found_page.classList.remove('show');
        }
    }
}

class ScrollPane extends Pane {
    constructor(direction: string, parent: HTMLElement, css: CSS, mobile_css?: CSS) {
        super(parent, css, mobile_css);
        let scroll_class: string = direction == 'x' ? 'scroll_pane_x' : 'scroll_pane_y';
        this.element.classList.add(scroll_class);
    }
}

// Glass Styled
class GlassPane extends Pane {
    constructor(parent: HTMLElement, css: CSS, mobile_css?: CSS) {
        super(parent, css, mobile_css);
        this.element.classList.add('glass');
    }

    addStripes() {
        this.element.classList.add('stripes');
    }
}

// Flex Panes
class FlexGlassPane extends GlassPane {
    constructor(parent: HTMLElement, css: CSS, mobile_css?: CSS) {
        super(parent, css, mobile_css);
        this.element.classList.add('flex_padding');
        this.element.classList.add('flex_glass');
    }
}

class ProjectHolderGlassPane extends GlassPane {
    constructor(category: string | null, parent: HTMLElement) {
        super(parent, CSS_FullWidthFitHeight);
        this.element.classList.remove('glass');
        this.element.classList.add('flex_glass', 'project_list');

        if (!category) return;
        let project_list = new ProjectList(this.element);
        project_list.createProjectList(Project_Data, category, false);
    }
}

class ScrollGlassPane extends FlexGlassPane {
    constructor(direction: string, parent: HTMLElement, css: CSS, mobile_css?: CSS) {
        super(parent, css, mobile_css);
        this.element.classList.remove('glass');
        let scroll_class: string = direction == 'x' ? 'scroll_pane_x' : 'scroll_pane_y';
        this.element.classList.add(scroll_class);
    }
}

// Project Panes
interface ProjectHeaderElements {
    header: HTMLElement,
    icon: HTMLElement,
    title: HTMLElement,
}

interface ProjectFooterElements {
    footer: HTMLElement;
    launch: HTMLElement;
    code: HTMLElement;
}

class ProjectGlassPane extends FlexGlassPane {
    header: HTMLElement;
    icon: HTMLElement;
    title: HTMLElement;
    description: HTMLElement;
    footer: HTMLElement;
    launch: HTMLElement;
    code: HTMLElement;

    constructor(parent: HTMLElement, css: CSS, mobile_css?: CSS) {
        super(parent, css, mobile_css);
        this.element.classList.remove('glass');
        this.element.classList.add('darkglass');
        this.element.classList.add('project_glass');

        let header_info: ProjectHeaderElements = this.#createProjectHeader();
        this.header = header_info.header;
        this.icon = header_info.icon;
        this.title = header_info.title;

        this.description = this.#createProjectDescription();

        let footer_info: ProjectFooterElements = this.#createProjectFooter();
        this.footer = footer_info.footer;
        this.launch = footer_info.launch;
        this.code = footer_info.code;
    }

    setProjectIcon(icon: string, size?: string) {
        this.icon.style.backgroundImage = `url('${icon}')`;
        if (size) {
            this.icon.style.backgroundSize = size;
        }
    }

    setProjectTitle(text: string) {
        this.title.textContent = text;
    }

    setProjectDescription(text: string) {
        this.description.textContent = text;
    }

    setProjectLink(href: string) {
        this.launch.setAttribute('href', href);
        this.launch.setAttribute('target', '_blank');
        this.code.onclick = () => {
            Codebase.loadProjectPath(href);
        }
    }

    setProjectVideo(url: string) {
        let video: HTMLVideoElement = this.#createBackgroundVideo();
        let source: HTMLSourceElement = this.#getElementSource(video);
        source.src = url;
        source.type = 'video/mp4';
    }

    setProjectBackground(url: string) {
        let image: HTMLImageElement = this.#createBackgroundImage();
        image.src = url;
    }

    setLayoutOrder(order?: string | number | null) {
        if (!order) return;
        order = order.toString();
        this.element.style.order = order;
    }

    #getElementSource(parent: HTMLElement): HTMLSourceElement {
        let source = parent.querySelector('source');
        if (!source) {
            source = document.createElement('source');
            parent.appendChild(source);
        }
        return source;
    }

    #createProjectHeader(): ProjectHeaderElements {
        let header: HTMLElement = document.createElement('div');
        header.classList.add('project_header');
        this.element.appendChild(header);

        let icon: HTMLElement = document.createElement('div');
        icon.classList.add('project_icon');
        icon.classList.add('shadowglass');
        header.appendChild(icon);

        let title: HTMLElement = document.createElement('span');
        title.classList.add('project_title');
        header.appendChild(title);

        return {
            header: header,
            icon: icon,
            title: title,
        }
    }

    #createProjectDescription(): HTMLElement {
        let description = document.createElement('div');
        description.classList.add('project_description');
        this.element.appendChild(description);

        return description;
    }

    #createProjectFooter(): ProjectFooterElements {
        let footer = document.createElement('div');
        footer.classList.add('project_footer');
        this.element.appendChild(footer);

        let launch_button = document.createElement('a');
        launch_button.classList.add('shadowglass');
        launch_button.classList.add('launch');
        launch_button.textContent = 'Launch';
        footer.appendChild(launch_button);

        let peek_button = document.createElement('button');
        peek_button.classList.add('shadowglass');
        peek_button.classList.add('peek');
        footer.appendChild(peek_button);

        return {
            footer: footer,
            launch: launch_button,
            code: peek_button,
        }
    }

    #createBackgroundVideo(): HTMLVideoElement {
        let video = document.createElement('video');
        video.playsInline = true;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.classList.add('project_background');
        this.element.appendChild(video);
        return video;
    }

    #createBackgroundImage(): HTMLImageElement {
        let image = document.createElement('img');
        image.classList.add('project_background');
        this.element.appendChild(image);
        return image;
    }
}

class PluginGlassPane extends ProjectGlassPane {
    constructor(parent: HTMLElement, name: string, description: string, icon_info: IconEntry | null, callback: () => void) {
        super(parent, CSS_FullSize);
        this.setProjectTitle(name);
        this.setProjectDescription(description);
        this.setProjectIcon(icon_info ? icon_info.icon : '../icon/plugin.svg', icon_info ? icon_info.size : '75%');
        this.element.classList.add('plugin');
        this.launch.textContent = 'Run';

        this.launch.addEventListener('click', callback);
    }
}

class ProjectList {
    parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    createProjectFrame(name: string, data: ProjectEntry) {
        let this_frame: ProjectGlassPane = new ProjectGlassPane(this.parent, {});
        this_frame.setLayoutOrder(data.featured);
        this_frame.setProjectTitle(name);
        this_frame.setProjectDescription(data.description);
        this_frame.setProjectLink(data.href);
        this_frame.setProjectIcon(data.image.icon, data.image.size);
        if (data.video) {
            this_frame.setProjectVideo(data.video);
        }
        if (data.background) {
            this_frame.setProjectBackground(data.background);
        }
    }

    createProjectList(data: ProjectEntryList, filter_category: string | null, filter_featured: boolean) {
        let project_keys: string[] = Object.keys(data);
        for (var i = 0; i < project_keys.length; i++) {
            let this_name: string = project_keys[i];
            let this_data: ProjectEntry = data[this_name];
            let featured_check: number | boolean = !filter_featured || this_data.featured || false;
            let category_check: number | boolean = !filter_category || this_data.category == filter_category;
            if (featured_check && category_check) {
                this.createProjectFrame(this_name, this_data);
            }
        }
    }
}

// Text
class TextEntry {
    element: HTMLElement;

    constructor(parent: HTMLElement, size: string, text: string) {
        this.element = document.createElement('span');
        this.element.classList.add('text_entry');
        this.element.textContent = text;
        this.element.style.fontSize = size;
        parent.appendChild(this.element);
    }
}

class TextHeader extends TextEntry {
    constructor(parent: HTMLElement, text: string) {
        super(parent, '2em', text);
        this.element.classList.add('text_header');
    }
}

class TextSubheader extends TextEntry {
    constructor(parent: HTMLElement, text: string) {
        super(parent, '1em', text);
        this.element.classList.add('text_subheader');
    }
}