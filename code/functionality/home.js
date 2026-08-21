"use strict";
class HomePage extends Page {
    about;
    social;
    photos;
    projects;
    copyright;
    constructor(content) {
        super(content);
        this.about = new AboutSegment(this);
        this.social = new SocialSegment(this);
        this.photos = new PhotosSegment(this);
        this.projects = new ProjectsSegment(this);
        this.copyright = new CopyrightSegment(this);
        content.registerPage('home', this);
        this.toggle(true);
        this.element.classList.add('home');
    }
}
class AboutSegment extends GlassPageSegment {
    constructor(page) {
        super(page);
        this.element.classList.add('stripes', 'about');
        this.addHeader('About Me');
        const language_row = new LargeIconRow(this);
        language_row.addIconList(Language_Icons);
        this.addDescription('Thaddeus MW');
        this.addDescription('Fluent in JavaScript, TypeScript, Java, Lua, HTML, CSS');
        const os_row = new SpanIconRow(this);
        os_row.setText('Linux');
        os_row.addIconList(OS_Icons);
    }
}
class SocialSegment extends PageSegment {
    constructor(page) {
        super(page);
        this.element.classList.add('icon_row', 'social', 'no_padding');
        this.loadFrame();
    }
    // propogate element
    loadFrame() {
        for (const name in Social_Icons) {
            const entry = Social_Icons[name];
            new SocialLinkIcon(this, entry);
        }
    }
}
class PhotosSegment extends GlassPageSegment {
    photo_row;
    constructor(page) {
        super(page);
        this.element.classList.add('photos');
        this.addHeader('Photos');
        this.photo_row = new PhotoRow(this);
        this.addLink('See more on snap.red', 'https://snap.red');
    }
}
class ProjectsSegment extends GlassPageSegment {
    project_row;
    constructor(page) {
        super(page);
        this.addHeader('Projects');
        this.project_row = new ProjectRow(this);
        this.element.classList.add('projects');
    }
}
class CopyrightSegment extends GlassPageSegment {
    constructor(page) {
        super(page);
        this.addDescription(`© kircic.org (2021 - ${new Date().getFullYear()})`);
    }
}
