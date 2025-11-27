"use strict";
class WebsiteStats {
    owner;
    repo;
    api_base;
    constructor(owner, repo) {
        this.owner = owner;
        this.repo = repo;
        this.api_base = `https://api.github.com/repos/${owner}/${repo}`;
    }
    async fetchLastCommit() {
        const pre_time = Date.now();
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
            const post_time = Date.now();
            MainNotificationHolder.notify(`Commit count fetched! (${post_time - pre_time}ms)`, 'info');
            return { count: Number(last_url.searchParams.get('page')), name: latest.commit.message };
        }
        catch (error) {
            MainNotificationHolder.notify('Failed to fetch commit count!', 'error');
            throw new Error('Failed to fetch, error ' + error);
        }
    }
    async fetchRepoSize() {
        const pre_time = Date.now();
        try {
            const response = await fetch(this.api_base);
            if (!response.ok)
                throw new Error(`HTTP Error ${response.status}`);
            const data = await response.json();
            const kb = data.size;
            const post_time = Date.now();
            MainNotificationHolder.notify(`Repo size fetched! (${post_time - pre_time}ms)`, 'info');
            return this.#formatSize(kb * 1024);
        }
        catch (error) {
            MainNotificationHolder.notify('Failed to fetch repo size!', 'error');
            throw new Error('Failed to fetch, error ' + error);
        }
    }
    #formatSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0)
            return '0 Bytes';
        const i = parseInt((Math.floor(Math.log(bytes) / Math.log(1024))).toString(), 10);
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    }
}
const StatisticsManager = new WebsiteStats('Korwith', 'kircic.org');
