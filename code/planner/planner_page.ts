class PlannerPage extends Page {
    bookmarks: PlannerBookmarks;
    tasks: PlannerTasksList;
    calender: PlannerCalenderGrid;

    constructor(content: PageContent) {
        super(content);
        this.element.classList.add('planner');
        this.bookmarks = new PlannerBookmarks(this);
        this.tasks = new PlannerTasksList(this);
        this.calender = new PlannerCalenderGrid(this);

        this.content.registerPage('planner', this);

        // test test test
        this.tasks.addTask('test element');
    }
}

class PlannerBookmarks extends GeneralBookmarkBar {
    page: PlannerPage;
    input: PlannerInputBox;
    plus: PlannerPlusButton;

    constructor(page: PlannerPage) {
        super(page);
        this.page = page;
        this.input = new PlannerInputBox(this);
        this.plus = new PlannerPlusButton(this);
    }

    protected handleButtonOverflow(): void {};
    public fetchSaveData() {};
    protected loadPreviousSave(): void {};
    protected requestSave(): void {};
}

class PlannerInputBox extends BookmarkInputBox {
    bar: PlannerBookmarks;

    constructor(bar: PlannerBookmarks) {
        super(bar);
        this.bar = bar;
        this.element.setAttribute('placeholder', 'Add task...');

        this.element.onkeydown = (e: KeyboardEvent) => this.changed(e);
        this.element.onkeyup = (e: KeyboardEvent) => this.changed(e);
    }

    protected handleInputComplete(): void {
        console.log('input complete');
    }
}

class PlannerPlusButton extends BookmarkButtonPlus {
    bar: PlannerBookmarks;

    constructor(bar: PlannerBookmarks) {
        super(bar);
        this.bar = bar;
    }

    public onclick(): void {};
    public toggleDeletionMode(deletion: boolean): void {}
}

class PlannerTasksList extends GlassPageSegment {
    overdue: PlannerTaskGroup;

    constructor(page: PlannerPage) {
        super(page);
        this.element.classList.add('tasks');

        this.overdue = new PlannerTaskGroup(this, 'Overdue');
    }

    public addTask(text: string): void {
        const task: PlannerTask = new PlannerTask(this.overdue, text);
    }
}

class PlannerTaskGroup extends PageElement {
    list: PlannerTasksList;

    constructor(list: PlannerTasksList, label: string) {
        super('div');
        this.list = list;
        this.element.classList.add('group');
        this.setLabel(label);
        this.setParent(list);
    }

    public setLabel(text: string): void {
        this.element.setAttribute('label', text);
    }
}

class PlannerTask extends PageElement {
    resolve: HTMLElement;

    constructor(list: PlannerTaskGroup, text: string) {
        super('div');
        this.element.classList.add('glass', 'dark', 'task');
        this.element.textContent = text;

        this.resolve = document.createElement('button');
        this.resolve.classList.add('glass', 'darker', 'resolve_button');
        this.resolve.onclick = () => this.resolveTask();

        this.element.appendChild(this.resolve);
        this.setParent(list);
    }

    private resolveTask(): void {
        this.element.classList.add('resolve');
        setTimeout(() => this.element.remove(), 500);
    }
}

class PlannerCalenderGrid extends GlassPageSegment {
    constructor(page: PlannerPage) {
        super(page);
        this.element.classList.add('calender');
    }
}