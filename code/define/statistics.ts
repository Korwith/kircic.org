interface CommitData {
    count: number,
    name: string,
}

// fetches and formats statistics from a github repository via the api
class WebsiteStats {
    owner: string;
    repo: string;
    private api_base: string;

    // sets up the api base url for the given owner and repo
    constructor(owner: string, repo: string) {
        this.owner = owner;
        this.repo = repo;
        this.api_base = `https://api.github.com/repos/${owner}/${repo}`;
    }

    // fetches the total commit count and the latest commit message
    public async fetchLastCommit(): Promise<CommitData> {
        try {
            const response: any = await fetch(`${this.api_base}/commits?per_page=1`);
            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
            const header: string | null = response.headers.get('link');
            if (!header) throw new Error('Failed to fetch commit data!');
            const commits: any = await response.json();
            const latest: any = commits[0];
            const last_link = header.split(',').find((s: string) => s.includes('rel="last'));
            if (!last_link) throw new Error(`Last Page Not Found!`);
            const match: RegExpMatchArray | null = last_link.match(/<(.*?)>/);
            if (!match) throw new Error('Improper link');
            const last_url: URL = new URL(match[1]);
            return {count: Number(last_url.searchParams.get('page')), name: latest.commit.message};
        } catch (error: unknown) {
            throw new Error('Failed to fetch, error ' + error);
        }
    }

    // fetches the repository size and returns it as a formatted string
    public async fetchRepoSize(): Promise<string> {
        try {
            const response: any = await fetch(this.api_base);
            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
            const data: any = await response.json();
            const kb: number = data.size;
            return this.formatSize(kb * 1024);
        } catch (error: unknown) {
            throw new Error('Failed to fetch, error ' + error);
        }
    }

    // converts a byte count to a human-readable size string
    public formatSize(bytes: number): string {
        const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Bytes';
        const i: number = parseInt((Math.floor(Math.log(bytes) / Math.log(1024))).toString(), 10);
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    }
}
