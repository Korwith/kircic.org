"use strict";
// dealing with github api
class CodebaseAPI {
    page;
    repo;
    constructor(page, repo) {
        this.page = page;
        this.repo = repo;
    }
    decodeBase64(text) {
        try {
            // Sanitize whitespace/newlines from GitHub base64 and handle UTF-8
            const sanitized = text.replace(/\s/g, '');
            return decodeURIComponent(Array.from(atob(sanitized))
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join(''));
        }
        catch (error) {
            this.page.content.manager.notifications.sendNotification('error', 'Error decoding base64 in GitHub response.');
            return null;
        }
    }
    async fetchDirectory(path) {
        const pathStr = path.join('/');
        const url = `https://api.github.com/repos/${this.repo.owner}/${this.repo.name}/contents/${pathStr}`;
        try {
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            return await response.json();
        }
        catch (error) {
            this.page.content.manager.notifications.sendNotification('error', `Failed to fetch path: /${pathStr}`);
            return null;
        }
    }
}
