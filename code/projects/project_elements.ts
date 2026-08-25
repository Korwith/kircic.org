abstract class ProjectHolder extends PageElementScroll {
    frames: ProjectFrame[] = [];

    constructor(direction: 'x' | 'y') {
        super(direction);
        this.element.classList.add('project_holder', 'glass');
    }

    // adds header, most likely the category name
    public addHeader(text: string): void {
        const header: HTMLElement = document.createElement('h1');
        header.textContent = text;
        this.element.appendChild(header);
    }

    // handles global Project_Data
    protected fetchProjectData(featured?: boolean, category?: 'app' | 'game'): ProjectEntryList {
        const category_projects: ProjectEntryList = {};
        const featured_projects: ProjectEntryList = {};
        const non_featured_projects: ProjectEntryList = {};

        for (const name in Project_Data) {
            const data: ProjectEntry = Project_Data[name];
            if (category && data.category != category) continue;
            category_projects[name] = data;

            if (data.featured) featured_projects[name] = data;
            else non_featured_projects[name] = data;
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
    protected loadProjects(featured?: boolean, category?: 'app' | 'game'): void {
        const list: ProjectEntryList = this.fetchProjectData(featured, category);

        for (const name in list) {
            const frame: ProjectFrame = new ProjectFrame(this, name);
            this.frames.push(frame);
        }
    }
}

class ProjectRow extends ProjectHolder {
    constructor(segment: ProjectsSegment) {
        super('x');
        this.element.classList.add('row');
        this.element.classList.remove('glass');
        this.loadProjects(true);
        this.setParent(segment);
    }
}

class ProjectFrame extends DarkGlassPane {
    name: string;
    data: ProjectEntry;

    background?: HTMLImageElement | HTMLVideoElement;
    header: ProjectHeader;
    description: ProjectDescription;
    footer: ProjectFooter;

    constructor(holder: ProjectHolder, name: string) {
        super('figure');
        this.name = name;
        this.data = Project_Data[name];
        if (!this.data) throw new Error('The specified project does not exist');

        const background_src: string | undefined = this.data.video || this.data.background;
        if (background_src) {
            const background_type: 'video' | 'img' = this.data.video ? 'video' : 'img';
            
            this.background = document.createElement(background_type);
            this.background.setAttribute('src', background_src);
            this.element.appendChild(this.background);

            if (background_type == 'video') {
                const video_background: HTMLVideoElement = this.background as HTMLVideoElement;
                video_background.setAttribute('muted', 'true');
                video_background.setAttribute('playsinline', 'true');
                video_background.setAttribute('loop', 'true');
                video_background.setAttribute('width', '400');
                video_background.setAttribute('height', '300');
                this.element.addEventListener('mouseenter', () => video_background.play());
                this.element.addEventListener('mouseleave', () => video_background.pause());
            }
        }

        this.header = new ProjectHeader(this);
        this.description = new ProjectDescription(this);
        this.footer = new ProjectFooter(this);
        this.loadFrame();
        this.setParent(holder);
    }

    protected loadFrame(): void {
        this.header.loadProjectHeader();
        this.description.loadProjectDescription();
        this.footer.loadProjectFooter();
    }
}

class ProjectHeader extends PageElement {
    project: ProjectFrame;
    logo: HTMLElement;
    title: HTMLElement;

    constructor(project: ProjectFrame) {
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
    public loadProjectHeader(): void {
        this.logo.style.setProperty('--icon-url', `url(../icon/${this.project.data.image.icon})`);
        this.logo.style.setProperty('--icon-size', this.project.data.image.size || null);
        this.title.textContent = this.project.name;
    }
}

class ProjectDescription extends PageElement {
    project: ProjectFrame;
    span: HTMLElement;

    constructor(project: ProjectFrame) {
        super();
        this.project = project;
        this.span = document.createElement('span');
        this.element.classList.add('center');

        this.element.appendChild(this.span);
        this.setParent(project);
    }

    // propogates frame
    public loadProjectDescription(): void {
        this.span.textContent = this.project.data.description;
    }
}

class ProjectFooter extends PageElement {
    project: ProjectFrame;
    button: HTMLElement;

    constructor(project: ProjectFrame) {
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
    public loadProjectFooter(): void {
        this.button.setAttribute('href', this.project.data.href);
    }
}