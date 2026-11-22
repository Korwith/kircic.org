/*
 *   Copyright (c) 2026 Thaddeus MW.
 *
 */

// a group of commits which happened on the same day
class CommitDayElement extends PageElement {
    page: HistoryPage;
    day: string;
    label: HTMLElement;
    commits: HTMLElement;
    sidebar_entry: HistoryDayEntry;
    count: number = 0;

    constructor(page: HistoryPage, day: string) {
        super();
        this.page = page;
        this.day = day;
        this.element.classList.add('day');

        this.label = document.createElement('div');
        this.label.classList.add('day_label');
        this.label.textContent = `Commits on ${day}`;

        this.commits = document.createElement('div');
        this.commits.classList.add('day_commits');

        this.element.append(this.label, this.commits);
        this.sidebar_entry = new HistoryDayEntry(this);
    }

    public addCommit(commit: CommitElement): void {
        this.commits.appendChild(commit.element);
        this.count++;
        this.sidebar_entry.setCount(this.count);
    }

    public scrollTo(): void {
        this.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// a singular commit, expands to show its changed files
class CommitElement extends PageElement {
    page: HistoryPage;
    listing: CommitListing;
    summary: HTMLElement;
    details: HTMLElement;
    date: Date;

    private loaded: boolean = false;

    constructor(page: HistoryPage, listing: CommitListing) {
        super();
        this.page = page;
        this.listing = listing;
        this.listing.commitElement = this;
        this.date = new Date(listing.commit.author.date);
        this.element.classList.add('commit', 'glass', 'darker');

        this.summary = document.createElement('div');
        this.summary.classList.add('commit_summary');
        this.summary.onclick = () => this.toggle();

        this.details = document.createElement('div');
        this.details.classList.add('commit_details', 'hidden');

        this.summary.append(this.createAvatar(), this.createText(), this.createActions());
        this.element.append(this.summary, this.details);
    }

    // github avatar, or the first letter of the name when there's no account
    private createAvatar(): HTMLElement {
        const account: CommitAccount | null = this.listing.author;
        if (account) {
            const image: HTMLImageElement = document.createElement('img');
            image.classList.add('avatar');
            image.src = `${account.avatar_url}&s=64`;
            image.alt = account.login;
            image.loading = 'lazy';
            return image;
        }

        const fallback: HTMLElement = document.createElement('div');
        fallback.classList.add('avatar', 'none');
        fallback.textContent = this.listing.commit.author.name.charAt(0).toUpperCase();
        return fallback;
    }

    // title and author / time
    private createText(): HTMLElement {
        const text: HTMLElement = document.createElement('div');
        const title: HTMLElement = document.createElement('span');
        const meta: HTMLElement = document.createElement('span');
        const time: HTMLTimeElement = document.createElement('time');

        text.classList.add('commit_text');
        title.classList.add('commit_title');
        meta.classList.add('commit_meta');

        title.textContent = HistoryAPI.titleOf(this.listing);
        title.title = this.listing.commit.message;

        time.dateTime = this.listing.commit.author.date;
        time.title = this.date.toLocaleString('en-US');
        time.textContent = `${HistoryAPI.relativeTime(this.date)} · ${HistoryAPI.timeOf(this.date)}`;

        const name: string = this.listing.author?.login ?? this.listing.commit.author.name;
        meta.append(`${name} committed `, time);

        text.append(title, meta);
        return text;
    }

    // sha (copies) and github link
    private createActions(): HTMLElement {
        const actions: HTMLElement = document.createElement('div');
        const sha: HTMLButtonElement = document.createElement('button');
        const link: HTMLAnchorElement = document.createElement('a');

        actions.classList.add('commit_actions');
        sha.classList.add('sha', 'glass', 'gradient', 'hoverchange');
        link.classList.add('link', 'glass', 'gradient', 'hoverchange');

        sha.textContent = HistoryAPI.shortSha(this.listing);
        sha.title = 'Copy full SHA';
        sha.onclick = async (e: MouseEvent) => {
            e.stopPropagation();
            try {
                await navigator.clipboard.writeText(this.listing.sha);
                this.page.pushHistoryNotification('info', `Copied ${HistoryAPI.shortSha(this.listing)} to clipboard.`);
            } catch (error: unknown) {
                this.page.pushHistoryNotification('error', 'Unable to copy to clipboard.');
            }
        };

        link.textContent = 'GitHub';
        link.href = this.listing.html_url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.onclick = (e: MouseEvent) => e.stopPropagation();

        actions.append(sha, link);
        return actions;
    }

    // expands / collapses, fetching the changed files the first time
    public async toggle(): Promise<void> {
        const open: boolean = this.details.classList.toggle('hidden') === false;
        this.element.classList.toggle('open', open);
        if (!open || this.loaded) return;

        this.loaded = true;
        this.details.classList.add('loading');
        const full: CommitListing | null = await this.page.api.fetchCommit(this.listing.sha);
        this.details.classList.remove('loading');

        if (!full) {
            this.loaded = false;
            this.details.classList.add('hidden');
            this.element.classList.remove('open');
            return;
        }

        this.listing.stats = full.stats;
        this.listing.files = full.files;
        this.populateDetails();
    }

    // message body, stats and file list
    private populateDetails(): void {
        const body: string = HistoryAPI.bodyOf(this.listing);
        if (body) {
            const pre: HTMLElement = document.createElement('pre');
            pre.classList.add('commit_body');
            pre.textContent = body;
            this.details.appendChild(pre);
        }

        const files: CommitFile[] = this.listing.files ?? [];
        const stats: HTMLElement = document.createElement('div');
        const additions: HTMLElement = document.createElement('span');
        const deletions: HTMLElement = document.createElement('span');
        const count: HTMLElement = document.createElement('span');

        stats.classList.add('commit_stats');
        additions.classList.add('additions');
        deletions.classList.add('deletions');
        count.classList.add('count');

        additions.textContent = `+${this.listing.stats?.additions ?? 0}`;
        deletions.textContent = `−${this.listing.stats?.deletions ?? 0}`;
        count.textContent = `${files.length} ${files.length === 1 ? 'file' : 'files'} changed`;
        if (this.listing.parents.length > 1) count.textContent += ' · merge';

        stats.append(count, additions, deletions);
        this.details.appendChild(stats);

        const list: HTMLElement = document.createElement('div');
        list.classList.add('commit_files');
        for (const file of files) new CommitFileElement(this, file).setParent(list);
        this.details.appendChild(list);
    }
}

// a changed file inside of an expanded commit
class CommitFileElement extends PageElement {
    commit: CommitElement;
    file: CommitFile;

    static readonly STATUS_LETTERS: Record<string, string> = {
        added: 'A',
        removed: 'D',
        modified: 'M',
        renamed: 'R',
        copied: 'C',
        changed: 'M',
        unchanged: '·',
    };

    constructor(commit: CommitElement, file: CommitFile) {
        super('button');
        this.commit = commit;
        this.file = file;
        this.element.classList.add('commit_file', 'glass', 'gradient', 'hoverchange');
        this.element.onclick = () => this.commit.page.main.displayDiff(this.commit.listing, this.file);

        const status: HTMLElement = document.createElement('span');
        status.classList.add('status', file.status);
        status.textContent = CommitFileElement.STATUS_LETTERS[file.status] ?? 'M';
        status.title = file.status;

        // the icon sits in its own span since ::before is taken by the glass gradient
        const icon: HTMLElement = document.createElement('span');
        const icon_class: string | null = FileIcons.getClassWithColor(file.filename);
        icon.classList.add('file_icon', ...(icon_class ? ['icon', ...icon_class.split(' ')] : ['none']));

        const name: HTMLElement = document.createElement('span');
        name.classList.add('name');
        name.textContent = file.previous_filename ? `${file.previous_filename} → ${file.filename}` : file.filename;

        const additions: HTMLElement = document.createElement('span');
        const deletions: HTMLElement = document.createElement('span');
        additions.classList.add('additions');
        deletions.classList.add('deletions');
        additions.textContent = `+${file.additions}`;
        deletions.textContent = `−${file.deletions}`;

        this.element.append(status, icon, name, additions, deletions);
    }
}

// shows the patch of a changed file
class CommitDiffViewer extends TextViewer {
    page: HistoryPage;
    listing: CommitListing;
    file: CommitFile;

    constructor(page: HistoryPage, listing: CommitListing, file: CommitFile) {
        super();
        this.page = page;
        this.listing = listing;
        this.file = file;
        this.element.classList.add('diff_viewer');
        this.setName(file.filename, FileIcons.getClassWithColor(file.filename));
        this.setLanguage('diff');
        this.setInfo(`+${file.additions} −${file.deletions} · ${file.status} in ${HistoryAPI.shortSha(listing)}`);

        if (file.patch !== undefined) {
            this.addAction('Copy', async () => {
                try {
                    await navigator.clipboard.writeText(file.patch ?? '');
                    this.page.pushHistoryNotification('info', `Copied patch of ${file.filename} to clipboard.`);
                } catch (error: unknown) {
                    this.page.pushHistoryNotification('error', 'Unable to copy to clipboard.');
                }
            }, '../icon/clipboard.svg');
        }
        this.addLinkAction('GitHub', file.blob_url);
        this.addCloseAction();

        // binary or very large files have no patch
        if (file.patch !== undefined) this.displayText(file.patch);
        else this.body.classList.add('unsupported');
    }

    public close(): void {
        this.page.main.closeViewer();
    }
}

// day shortcut inside of the history sidebar
class HistoryDayEntry extends PageElement {
    day: CommitDayElement;
    count: HTMLElement;

    constructor(day: CommitDayElement) {
        super('button');
        this.day = day;
        this.element.classList.add('day_entry', 'glass', 'gradient');
        this.element.textContent = day.day;

        this.count = document.createElement('span');
        this.count.classList.add('count');
        this.element.appendChild(this.count);

        this.element.onclick = () => {
            this.day.page.main.closeViewer();
            this.day.scrollTo();
        };
        this.setParent(day.page.sidebar);
    }

    public setCount(count: number): void {
        this.count.textContent = `${count}`;
    }
}
