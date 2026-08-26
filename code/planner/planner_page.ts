// this is coming along somewhat well actually
// but i figured the notes page would be more needed

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

