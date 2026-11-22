/*
 *   Copyright (c) 2026 Thaddeus MW.
 *
 */

// version control subpage of the codebase (#codebase/history)
// lists the commit history of the repository
class HistoryPage extends Page {
    static readonly KEY = 'codebase/history';

    codebase: CodebasePage;
    api: HistoryAPI;
    days: Record<string, CommitDayElement> = {};
    commits: CommitListing[] = [];

    header: HistoryHeader;
    sidebar: HistorySidebar;
    main: HistoryMain;

    private next_page: number = 1;
    private exhausted: boolean = false;
    private fetching: boolean = false;

    constructor(content: PageContent, codebase: CodebasePage) {
        super(content);
        this.element.classList.add('codebase', 'history');
        this.codebase = codebase;

        this.api = new HistoryAPI(this, codebase.api.repo);
        this.header = new HistoryHeader(this);
        this.sidebar = new HistorySidebar(this);
        this.main = new HistoryMain(this);

        this.content.registerPage(HistoryPage.KEY, this);
    }

    // commits are only fetched once the page is opened (the api is rate limited)
    public toggle(force?: boolean): void {
        super.toggle(force);
        if (this.element.classList.contains('show') && this.next_page === 1) this.loadMore();
    }

    // fetches the next page of commits and appends them
    public async loadMore(): Promise<void> {
        if (this.fetching || this.exhausted) return;
        this.fetching = true;
        this.main.toggleLoading(true);

        const data: CommitListing[] | null = await this.api.fetchCommits(this.next_page);

        this.fetching = false;
        this.main.toggleLoading(false);
        if (!data) return this.pushHistoryNotification('error', 'There was an error fetching the GitHub API. Are you connected to the internet?');

        this.next_page++;
        if (data.length < HistoryAPI.PER_PAGE) this.exhausted = true;

        for (const listing of data) this.addCommit(listing);
        this.main.updateMoreButton(this.exhausted);
        this.header.setCount(this.commits.length, this.exhausted);
    }

    // places a commit into its day group (creating the group if needed)
    private addCommit(listing: CommitListing): void {
        this.commits.push(listing);
        const commit: CommitElement = new CommitElement(this, listing);
        const day: string = HistoryAPI.dayOf(commit.date);

        if (!this.days[day]) {
            this.days[day] = new CommitDayElement(this, day);
            this.main.addDay(this.days[day]);
        }
        this.days[day].addCommit(commit);
    }

    public pushHistoryNotification(type: 'info' | 'warn' | 'error', error: string) {
        this.content.manager.notifications.sendNotification(type, error);
    }
}

// displayed at the top of the history page
// shares its look with the codebase header
class HistoryHeader extends GlassPageSegment {
    page: HistoryPage;
    count: HTMLElement;

    constructor(page: HistoryPage) {
        super(page);
        this.element.classList.add('codebase_header', 'history_header');
        this.page = page;

        // repo name, goes back to the file explorer
        const root: HTMLButtonElement = document.createElement('button');
        root.classList.add('glass', 'gradient', 'hoverchange', 'root');
        root.textContent = page.api.repo.name;
        root.onclick = () => page.content.showPage('codebase');

        const crumb: HTMLButtonElement = document.createElement('button');
        crumb.classList.add('glass', 'gradient', 'hoverchange');
        crumb.textContent = 'History';
        crumb.onclick = () => page.main.closeViewer();

        this.count = document.createElement('span');
        this.count.classList.add('count');

        this.element.append(root, crumb, this.count);
        new CodebaseSwitchButton(this, 'Files', '../icon/folder.svg', 'codebase');
    }

    public setCount(count: number, all: boolean): void {
        this.count.textContent = `${count}${all ? '' : '+'} commits`;
    }
}

// switches between the file explorer and the history (right side of the header)
class CodebaseSwitchButton extends PageElement {
    constructor(header: GlassPageSegment & { page: Page }, text: string, icon: string, key: string) {
        super('button');
        this.element.classList.add('switch', 'glass', 'gradient', 'hoverchange');
        this.element.style.setProperty('--icon-url', `url('${icon}')`);
        this.element.textContent = text;
        this.element.onclick = () => header.page.content.showPage(key);
        this.setParent(header);
    }
}

// vertical list of days to the left of the history page
class HistorySidebar extends GlassPageSegment {
    page: HistoryPage;

    constructor(page: HistoryPage) {
        super(page);
        this.element.classList.add('history_sidebar');
        this.page = page;
    }
}

// list of commits, replaced by a diff viewer when a file is opened
class HistoryMain extends GlassPageSegment {
    page: HistoryPage;
    list: HTMLElement;
    more: HTMLButtonElement;
    viewer?: CommitDiffViewer;

    private scroll_position: number = 0;

    constructor(page: HistoryPage) {
        super(page);
        this.element.classList.add('history_main');
        this.page = page;

        this.list = document.createElement('div');
        this.list.classList.add('history_list');

        this.more = document.createElement('button');
        this.more.classList.add('more', 'glass', 'gradient', 'hoverchange', 'hidden');
        this.more.textContent = 'Load more commits';
        this.more.onclick = () => this.page.loadMore();

        this.element.append(this.list, this.more);
    }

    public addDay(day: CommitDayElement): void {
        this.list.appendChild(day.element);
    }

    public updateMoreButton(exhausted: boolean): void {
        this.more.classList.toggle('hidden', exhausted);
    }

    // hides the list (keeping its state) and shows the patch of a file
    public displayDiff(listing: CommitListing, file: CommitFile): void {
        this.closeViewer();
        this.scroll_position = this.element.scrollTop;
        this.viewer = new CommitDiffViewer(this.page, listing, file);
        this.element.classList.add('viewing');
        this.viewer.setParent(this);
    }

    // returns to the commit list where it was left
    public closeViewer(): void {
        if (!this.viewer) return;
        this.viewer.element.remove();
        delete this.viewer;
        this.element.classList.remove('viewing');
        this.element.scrollTop = this.scroll_position;
    }

    public toggleLoading(force: boolean): void {
        this.element.classList.toggle('loading', force);
    }
}
