"use strict";
class ProjectPage extends Page {
    apps;
    games;
    constructor(content) {
        super(content);
        this.apps = new ProjectHolderApps(this);
        this.games = new ProjectHolderGames(this);
        this.element.classList.add('projects');
        content.registerPage('projects', this);
    }
}
class ProjectHolderApps extends ProjectHolder {
    page;
    constructor(project_page) {
        super('y');
        this.page = project_page;
        this.addHeader('Apps');
        this.loadProjects(undefined, 'app');
        this.setParent(project_page);
    }
}
class ProjectHolderGames extends ProjectHolder {
    page;
    constructor(project_page) {
        super('y');
        this.addHeader('Games');
        this.page = project_page;
        this.loadProjects(undefined, 'game');
        this.setParent(project_page);
    }
}
