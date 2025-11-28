"use strict";
const SettingsData = new StorageHandler('settings');
const BookmarksData = new StorageHandler('bookmarks');
const ManageCSS = new CSSManagement();
// Website Stuff
class BlurredImageBackground {
    element;
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('blurred_bg');
        document.body.appendChild(this.element);
        document.addEventListener('Page Color', ((e) => {
            this.#changeHue(e.detail.data);
        }));
    }
    #changeHue(target_hex) {
        let filter = this.#getFilterString('#0c3365', target_hex);
        this.element.style.filter = filter;
    }
    #getFilterString = (current_hex, target_hex) => {
        const toRGB = (hex) => {
            const h = hex.replace('#', '');
            const big = parseInt(h.padEnd(6, h), 16);
            return [big >> 16, big >> 8 & 255, big & 255];
        };
        const [r1, g1, b1] = toRGB(current_hex);
        const [r2, g2, b2] = toRGB(target_hex);
        const hue = (r, g, b) => {
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const d = max - min;
            if (d === 0)
                return 0;
            let h;
            if (max === r)
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            else if (max === g)
                h = ((b - r) / d + 2) / 6;
            else
                h = ((r - g) / d + 4) / 6;
            return h * 360;
        };
        let hueDiff = hue(r2, g2, b2) - hue(r1, g1, b1);
        hueDiff = ((hueDiff + 180) % 360) - 180;
        const chroma = Math.max(r2, g2, b2) - Math.min(r2, g2, b2);
        const luminance = (r2 * 299 + g2 * 587 + b2 * 114) / 1000;
        if (luminance < 30)
            return `hue-rotate(${hueDiff}deg) brightness(0)`;
        if (luminance > 225 || chroma < 25)
            return `hue-rotate(${hueDiff}deg) contrast(0)`;
        return `hue-rotate(${hueDiff}deg)`;
    };
}
// Parent
class Pane {
    element;
    constructor(parent, css, mobile_css) {
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
    setHidden(status) {
        this.element.classList.toggle('hide', status);
    }
}
let page_index = {};
class Page extends Pane {
    constructor(name, parent) {
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
        let pages = document.querySelectorAll('.page');
        for (var i = 0; i < pages.length; i++) {
            let found_page = pages[i];
            if (found_page == this.element)
                continue;
            found_page.classList.remove('show');
        }
    }
}
class ScrollPane extends Pane {
    constructor(direction, parent, css, mobile_css) {
        super(parent, css, mobile_css);
        let scroll_class = direction == 'x' ? 'scroll_pane_x' : 'scroll_pane_y';
        this.element.classList.add(scroll_class);
    }
}
// Glass Styled
class GlassPane extends Pane {
    constructor(parent, css, mobile_css) {
        super(parent, css, mobile_css);
        this.element.classList.add('glass');
    }
    addStripes() {
        this.element.classList.add('stripes');
    }
}
// Flex Panes
class FlexGlassPane extends GlassPane {
    constructor(parent, css, mobile_css) {
        super(parent, css, mobile_css);
        this.element.classList.add('flex_padding');
        this.element.classList.add('flex_glass');
    }
}
class ProjectHolderGlassPane extends GlassPane {
    constructor(category, parent) {
        super(parent, CSS_FullWidthFitHeight);
        this.element.classList.remove('glass');
        this.element.classList.add('flex_glass', 'project_list');
        if (!category)
            return;
        let project_list = new ProjectList(this.element);
        project_list.createProjectList(Project_Data, category, false);
    }
}
class ScrollGlassPane extends FlexGlassPane {
    constructor(direction, parent, css, mobile_css) {
        super(parent, css, mobile_css);
        this.element.classList.remove('glass');
        let scroll_class = direction == 'x' ? 'scroll_pane_x' : 'scroll_pane_y';
        this.element.classList.add(scroll_class);
    }
}
class ProjectGlassPane extends FlexGlassPane {
    header;
    icon;
    title;
    description;
    footer;
    launch;
    code;
    constructor(parent, css, mobile_css) {
        super(parent, css, mobile_css);
        this.element.classList.remove('glass');
        this.element.classList.add('darkglass');
        this.element.classList.add('project_glass');
        let header_info = this.#createProjectHeader();
        this.header = header_info.header;
        this.icon = header_info.icon;
        this.title = header_info.title;
        this.description = this.#createProjectDescription();
        let footer_info = this.#createProjectFooter();
        this.footer = footer_info.footer;
        this.launch = footer_info.launch;
        this.code = footer_info.code;
    }
    setProjectIcon(icon, size) {
        this.icon.style.backgroundImage = `url('${icon}')`;
        if (size) {
            this.icon.style.backgroundSize = size;
        }
    }
    setProjectTitle(text) {
        this.title.textContent = text;
    }
    setProjectDescription(text) {
        this.description.textContent = text;
    }
    setProjectLink(href) {
        this.launch.setAttribute('href', href);
        this.launch.setAttribute('target', '_blank');
        this.code.onclick = () => {
            Codebase.loadProjectPath(href);
        };
    }
    setProjectVideo(url) {
        let video = this.#createBackgroundVideo();
        let source = this.#getElementSource(video);
        source.src = url;
        source.type = 'video/mp4';
    }
    setProjectBackground(url) {
        let image = this.#createBackgroundImage();
        image.src = url;
    }
    setLayoutOrder(order) {
        if (!order)
            return;
        order = order.toString();
        this.element.style.order = order;
    }
    #getElementSource(parent) {
        let source = parent.querySelector('source');
        if (!source) {
            source = document.createElement('source');
            parent.appendChild(source);
        }
        return source;
    }
    #createProjectHeader() {
        let header = document.createElement('div');
        header.classList.add('project_header');
        this.element.appendChild(header);
        let icon = document.createElement('div');
        icon.classList.add('project_icon');
        icon.classList.add('shadowglass');
        header.appendChild(icon);
        let title = document.createElement('span');
        title.classList.add('project_title');
        header.appendChild(title);
        return {
            header: header,
            icon: icon,
            title: title,
        };
    }
    #createProjectDescription() {
        let description = document.createElement('div');
        description.classList.add('project_description');
        this.element.appendChild(description);
        return description;
    }
    #createProjectFooter() {
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
        };
    }
    #createBackgroundVideo() {
        let video = document.createElement('video');
        video.playsInline = true;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.classList.add('project_background');
        this.element.appendChild(video);
        return video;
    }
    #createBackgroundImage() {
        let image = document.createElement('img');
        image.classList.add('project_background');
        this.element.appendChild(image);
        return image;
    }
}
class PluginGlassPane extends ProjectGlassPane {
    constructor(parent, name, description, icon_info, callback) {
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
    parent;
    constructor(parent) {
        this.parent = parent;
    }
    createProjectFrame(name, data) {
        let this_frame = new ProjectGlassPane(this.parent, {});
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
    createProjectList(data, filter_category, filter_featured) {
        let project_keys = Object.keys(data);
        for (var i = 0; i < project_keys.length; i++) {
            let this_name = project_keys[i];
            let this_data = data[this_name];
            let featured_check = !filter_featured || this_data.featured || false;
            let category_check = !filter_category || this_data.category == filter_category;
            if (featured_check && category_check) {
                this.createProjectFrame(this_name, this_data);
            }
        }
    }
}
// Text
class TextEntry {
    element;
    constructor(parent, size, text) {
        this.element = document.createElement('span');
        this.element.classList.add('text_entry');
        this.element.textContent = text;
        this.element.style.fontSize = size;
        parent.appendChild(this.element);
    }
}
class TextHeader extends TextEntry {
    constructor(parent, text) {
        super(parent, '2em', text);
        this.element.classList.add('text_header');
    }
}
class TextSubheader extends TextEntry {
    constructor(parent, text) {
        super(parent, '1em', text);
        this.element.classList.add('text_subheader');
    }
}
