class ProjectPage extends Page {
    apps: ProjectHolderApps;
    games: ProjectHolderGames;

    constructor(content: PageContent) {
        super(content);
        this.apps = new ProjectHolderApps(this);
        this.games = new ProjectHolderGames(this);
        this.element.classList.add('projects');
        content.registerPage('projects', this);
    }
}

class ProjectHolderApps extends ProjectHolder {
    page: ProjectPage;

    constructor(project_page: ProjectPage) {
        super('y');
        this.page = project_page;
        this.addHeader('Apps');
        this.loadProjects(undefined, 'app');
        this.setParent(project_page);
    }
}

class ProjectHolderGames extends ProjectHolder {
    page: ProjectPage;

    constructor(project_page: ProjectPage) {
        super('y');
        this.addHeader('Games');
        this.page = project_page;
        this.loadProjects(undefined, 'game');
        this.setParent(project_page);
    }
}