"use strict";
// fetches and formats statistics from a github repository via the api
class WebsiteStats {
    owner;
    repo;
    api_base;
    // sets up the api base url for the given owner and repo
    constructor(owner, repo) {
        this.owner = owner;
        this.repo = repo;
        this.api_base = `https://api.github.com/repos/${owner}/${repo}`;
    }
    // fetches the total commit count and the latest commit message
    async fetchLastCommit() {
        try {
            const response = await fetch(`${this.api_base}/commits?per_page=1`);
            if (!response.ok)
                throw new Error(`HTTP Error ${response.status}`);
            const header = response.headers.get('link');
            if (!header)
                throw new Error('Failed to fetch commit data!');
            const commits = await response.json();
            const latest = commits[0];
            const last_link = header.split(',').find((s) => s.includes('rel="last'));
            if (!last_link)
                throw new Error(`Last Page Not Found!`);
            const match = last_link.match(/<(.*?)>/);
            if (!match)
                throw new Error('Improper link');
            const last_url = new URL(match[1]);
            return { count: Number(last_url.searchParams.get('page')), name: latest.commit.message };
        }
        catch (error) {
            throw new Error('Failed to fetch, error ' + error);
        }
    }
    // fetches the repository size and returns it as a formatted string
    async fetchRepoSize() {
        try {
            const response = await fetch(this.api_base);
            if (!response.ok)
                throw new Error(`HTTP Error ${response.status}`);
            const data = await response.json();
            const kb = data.size;
            return this.formatSize(kb * 1024);
        }
        catch (error) {
            throw new Error('Failed to fetch, error ' + error);
        }
    }
    // converts a byte count to a human-readable size string
    formatSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0)
            return '0 Bytes';
        const i = parseInt((Math.floor(Math.log(bytes) / Math.log(1024))).toString(), 10);
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    }
}
