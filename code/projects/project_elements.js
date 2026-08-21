"use strict";
class ProjectHolder extends PageElementScroll {
    frames = [];
    constructor(direction) {
        super(direction);
        this.element.classList.add('project_holder', 'glass');
    }
    // adds header, most likely the category name
    addHeader(text) {
        const header = document.createElement('h1');
        header.textContent = text;
        this.element.appendChild(header);
    }
    // handles global Project_Data
    fetchProjectData(featured, category) {
        const category_projects = {};
        const featured_projects = {};
        const non_featured_projects = {};
        for (const name in Project_Data) {
            const data = Project_Data[name];
            if (category && data.category != category)
                continue;
            category_projects[name] = data;
            if (data.featured)
                featured_projects[name] = data;
            else
                non_featured_projects[name] = data;
        }
        switch (featured) {
            case true:
                return featured_projects;
            case false:
                return non_featured_projects;
            case undefined:
                return category_projects;
        }
    }
    // propogates project frames in the holder
    loadProjects(featured, category) {
        const list = this.fetchProjectData(featured, category);
        for (const name in list) {
            const frame = new ProjectFrame(this, name);
            this.frames.push(frame);
        }
    }
}
class ProjectRow extends ProjectHolder {
    constructor(segment) {
        super('x');
        this.element.classList.add('row');
        this.element.classList.remove('glass');
        this.loadProjects(true);
        this.setParent(segment);
    }
}
class ProjectFrame extends DarkGlassPane {
    name;
    data;
    header;
    description;
    footer;
    constructor(holder, name) {
        super('figure');
        this.name = name;
        this.data = Project_Data[name];
        if (!this.data)
            throw new Error('The specified project does not exist');
        this.header = new ProjectHeader(this);
        this.description = new ProjectDescription(this);
        this.footer = new ProjectFooter(this);
        this.loadFrame();
        this.setParent(holder);
    }
    loadFrame() {
        this.header.loadProjectHeader();
        this.description.loadProjectDescription();
        this.footer.loadProjectFooter();
    }
}
class ProjectHeader extends PageElement {
    project;
    logo;
    title;
    constructor(project) {
        super();
        this.project = project;
        this.logo = document.createElement('i');
        this.title = document.createElement('span');
        this.element.classList.add('top');
        this.logo.classList.add('logo', 'glass', 'darker');
        this.title.classList.add('title');
        this.element.appendChild(this.logo);
        this.element.appendChild(this.title);
        this.setParent(project);
    }
    // propogates frame
    loadProjectHeader() {
        this.logo.style.setProperty('--icon-url', `url(../icon/${this.project.data.image.icon})`);
        this.logo.style.setProperty('--icon-size', this.project.data.image.size || null);
        this.title.textContent = this.project.name;
    }
}
class ProjectDescription extends PageElement {
    project;
    span;
    constructor(project) {
        super();
        this.project = project;
        this.span = document.createElement('span');
        this.element.classList.add('center');
        this.element.appendChild(this.span);
        this.setParent(project);
    }
    // propogates frame
    loadProjectDescription() {
        this.span.textContent = this.project.data.description;
    }
}
class ProjectFooter extends PageElement {
    project;
    button;
    constructor(project) {
        super();
        this.project = project;
        this.button = document.createElement('a');
        this.button.classList.add('glass', 'gradient', 'hoverchange');
        this.element.classList.add('bottom');
        this.button.textContent = 'Launch';
        this.element.appendChild(this.button);
        this.setParent(project);
    }
    // propogates frame
    loadProjectFooter() {
        this.button.setAttribute('href', this.project.data.href);
    }
}
