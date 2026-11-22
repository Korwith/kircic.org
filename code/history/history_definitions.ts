/*
 *   Copyright (c) 2026 Thaddeus MW.
 *
 */

// various interfaces for dealing with GitHub commit fetching
interface CommitUser {
    name: string;
    email: string;
    date: string;
}

interface CommitAccount {
    login: string;
    avatar_url: string;
    html_url: string;
}

interface CommitFile {
    filename: string;
    previous_filename?: string;
    status: 'added' | 'removed' | 'modified' | 'renamed' | 'copied' | 'changed' | 'unchanged';
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    patch?: string;
}

interface CommitListing {
    sha: string;
    html_url: string;
    commit: {
        message: string;
        author: CommitUser;
        committer: CommitUser;
    };
    author: CommitAccount | null;
    committer: CommitAccount | null;
    parents: { sha: string }[];

    // only present when fetching a single commit
    stats?: { additions: number, deletions: number, total: number };
    files?: CommitFile[];

    // cached display element
    commitElement?: CommitElement;
}

// dealing with the github commits api
class HistoryAPI {
    static readonly PER_PAGE = 30;

    constructor(public page: HistoryPage, public repo: GithubRepo) {}

    // a page of commits, newest first
    public async fetchCommits(page: number): Promise<CommitListing[] | null> {
        const url = `https://api.github.com/repos/${this.repo.owner}/${this.repo.name}/commits?per_page=${HistoryAPI.PER_PAGE}&page=${page}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error: unknown) {
            this.page.pushHistoryNotification('error', `Failed to fetch commit history (page ${page}).`);
            return null;
        }
    }

    // a single commit, including its changed files and stats
    public async fetchCommit(sha: string): Promise<CommitListing | null> {
        const url = `https://api.github.com/repos/${this.repo.owner}/${this.repo.name}/commits/${sha}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error: unknown) {
            this.page.pushHistoryNotification('error', `Failed to fetch commit: ${sha.slice(0, 7)}`);
            return null;
        }
    }

    // first line of a commit message
    public static titleOf(listing: CommitListing): string {
        return listing.commit.message.split('\n')[0];
    }

    // everything after the first line (trimmed)
    public static bodyOf(listing: CommitListing): string {
        return listing.commit.message.split('\n').slice(1).join('\n').trim();
    }

    public static shortSha(listing: CommitListing): string {
        return listing.sha.slice(0, 7);
    }

    // "Nov 21, 2026" - used to group commits by day
    public static dayOf(date: Date): string {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // "3:42 PM"
    public static timeOf(date: Date): string {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    // "2 hours ago", "3 days ago", etc
    public static relativeTime(date: Date): string {
        const format = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
        const seconds: number = (date.getTime() - Date.now()) / 1000;
        const units: [Intl.RelativeTimeFormatUnit, number][] = [
            ['year', 60 * 60 * 24 * 365],
            ['month', 60 * 60 * 24 * 30],
            ['week', 60 * 60 * 24 * 7],
            ['day', 60 * 60 * 24],
            ['hour', 60 * 60],
            ['minute', 60],
        ];

        for (const [unit, size] of units) {
            if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit);
        }
        return 'just now';
    }
}
