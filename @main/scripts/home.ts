class IconRow {
    element: HTMLElement;

    constructor(parent: HTMLElement, height: string, icon_array: IconEntry[]) {
        let row: HTMLElement = document.createElement('div');
        row.classList.add('icon_row');
        for (var i = 0; i < icon_array.length; i++) {
            let icon_data: IconEntry = icon_array[i];
            let icon = document.createElement('div');
            icon.style.width = height;
            icon.style.height = height;
            icon.style.backgroundImage = `url(${icon_data.icon})`;
            icon.style.backgroundSize = icon_data.size || '100%';
            row.appendChild(icon);
        }
        parent.appendChild(row);
        this.element = row;
    }

    removeBorderStyle() {
        this.element.classList.add('no_border');
    }

    applyInline() {
        this.element.classList.add('inline');
    }
}

class SocialIcon {
    element: HTMLElement;

    constructor(parent: HTMLElement, data: SocialEntry) {
        this.element = document.createElement('a');
        this.#setIconGradient(data.gradient);
        this.#setIconImage(data.image);
        this.element.setAttribute('href', data.link);
        this.element.setAttribute('target', '_blank');
        parent.appendChild(this.element);
    }

    #setIconGradient(info: GradientEntry) {
        this.element.style.setProperty('--gradient', `linear-gradient(${info.direction}, ${info.colors.join(', ')})`);
    }

    #setIconImage(info: IconEntry) {
        this.element.style.setProperty('--icon-url', `url(${info.icon})`);
        this.element.style.setProperty('--icon-size', info.size || '100%');
    }
}

class SocialRow {
    element: HTMLElement;

    constructor(parent: HTMLElement, social_array: SocialEntryList) {
        this.element = new Pane(parent, { width: '100%', height: '40px' }).element;
        this.element.classList.add('social_holder');

        let names: string[] = Object.keys(social_array);
        for (var i = 0; i < names.length; i++) {
            let service_name: string = names[i];
            let service_data: SocialEntry = social_array[service_name];
            new SocialIcon(this.element, service_data);
        }
    }
}

class HeaderButton {
    element: HTMLElement;

    constructor(parent: HTMLElement, name: string) {
        this.element = document.createElement('button');
        this.element.classList.add('header_button', name);
        parent.appendChild(this.element);
    }
}

class HeaderSidebarButton extends HeaderButton {
    constructor(parent: HTMLElement) {
        super(parent, 'sidebar_toggle');
        this.element.onclick = (e) => this.#handleButtonClick(e);
    }

    #handleButtonClick(e: PointerEvent) {
        document.body.classList.toggle('shift');
    }
}

class Clock {
    element: HTMLElement;
    date_holder: HTMLElement;
    time_holder: HTMLElement

    constructor(parent: HTMLElement, side: 'left' | 'right') {
        this.element = document.createElement('div');
        this.element.classList.add('clock', side);
        parent.appendChild(this.element);

        this.date_holder = document.createElement('div');
        this.date_holder.classList.add('clock_entry', 'date');
        this.element.appendChild(this.date_holder);

        this.time_holder = document.createElement('div');
        this.time_holder.classList.add('clock_entry', 'time');
        this.element.appendChild(this.time_holder);

        this.#updateInfo();
    }

    #updateInfo() {
        let month_array: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let day_array: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let date: Date = new Date();
        let hours: number = date.getHours() % 12;

        let minutes: string = date.getMinutes().toString().padStart(2, '0');
        let seconds: string = date.getSeconds().toString().padStart(2, '0');
        let year: number = date.getFullYear();

        let weekday: string = day_array[date.getDay()];
        let month: string = month_array[date.getMonth()];
        let suffix: string = hours >= 12 ? 'AM' : 'PM';
        hours = hours == 0 ? 12 : hours;

        this.date_holder.textContent = `${weekday}, ${month} ${date.getDate()}, ${year}`;
        this.time_holder.textContent = `${hours}:${minutes}:${seconds} ${suffix}`;

        setTimeout(() => this.#updateInfo(), 1000);
    }
}

// Specific Needs
class HeaderPane extends GlassPane {
    constructor() {
        super(document.body, { width: 'calc(100vw - 310px)', height: '60px', left: '300px', top: '10px', transition: 'width 0.5s, left 0.5s'});
        ManageCSS.addDesktopEntry(this.element, {width: 'calc(100dvw - 20px)', left: '10px'}, 'body.shift');
        ManageCSS.addMobileEntry(this.element, {width: 'calc(100dvw - 20px)', left: '10px'}, 'body');
        ManageCSS.addMobileEntry(this.element, {width: 'calc(100dvw - 20px)', left: '10px'});

        new HeaderSidebarButton(this.element);
        new Clock(this.element, 'right');

        this.setAbsolute();
        this.element.classList.add('header');
    }
}

class ContentPane extends ScrollPane {
    constructor() {
        super('y', document.body, { width: 'calc(100dvw - 310px)', height: 'calc(100dvh - 80px)', top: '80px', left: '300px', transition: 'width 0.5s, left 0.5s, transform 0.5s'});
        ManageCSS.addDesktopEntry(this.element, {width: 'calc(100dvw - 20px)', left: '10px'}, 'body.shift');
        ManageCSS.addMobileEntry(this.element, {width: 'calc(100dvw - 20px)', left: '10px'}, 'body')
        ManageCSS.addMobileEntry(this.element, {transform: 'translateX(calc(100% + 10px))'}, 'body.shift')

        this.element.classList.add('content');
        this.setAbsolute();
    }
}

class HomePage extends Page {
    constructor(parent: HTMLElement) {
        super('home', parent);
    }
}

// Main UI
const Background = new BlurredImageBackground();

const Header = new HeaderPane();
const Content = new ContentPane();

// Inner Content
const Home = new HomePage(Content.element);

// About Pane
const About = new FlexGlassPane(Home.element, CSS_FullWidthFitHeight);
About.addStripes();

new TextHeader(About.element, 'About');
new IconRow(About.element, '60px', Language_Icons);
new TextSubheader(About.element, 'Thaddeus MW');
new TextSubheader(About.element, 'Fluent in JavaScript, TypeScript, Java, Lua, HTML, CSS');
const OS_Subheader = new TextSubheader(About.element, 'Linux');
const Linux_Icons = new IconRow(OS_Subheader.element, '20px', OS_Icons);
Linux_Icons.removeBorderStyle();
Linux_Icons.applyInline();

// Inner Socials Row
const Socials = new SocialRow(Home.element, Social_Icons);

// Featured Projects Pane
const FeaturedProjects = new FlexGlassPane(Home.element, CSS_FullWidthFitHeight);
new TextHeader(FeaturedProjects.element, 'Featured Projects');
const Featured_Scroll = new ScrollGlassPane('x', FeaturedProjects.element, {width: '100%', height: '260px'});
const Featured_List = new ProjectList(Featured_Scroll.element);
Featured_List.createProjectList(Project_Data, null, true);

// Copyrights
const CopyrightPane = new GlassPane(Home.element, CSS_FullWidthFitHeight);
CopyrightPane.element.classList.add('nopadding');
new TextSubheader(CopyrightPane.element, '© Copyright (2022 - 2025)');
Home.showPage();