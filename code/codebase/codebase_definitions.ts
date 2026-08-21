// various imported libraries for handling file display
declare const FileIcons: {
    getClassWithColor(filename: string): string,
    getClass(filename: string): string,
    getColor(filename: string): string
}

declare const hljs: {
    highlightElement(element: HTMLElement): void,
}

// various interfaces for dealing with GitHub fetching
interface GithubRepo {
    owner: string,
    name: string,
}

interface FileEntryListing {
    download_url: string | null;
    git_url: string;
    html_url: string;
    name: string;
    path: string;
    sha: string;
    size: number;
    type: 'file' | 'dir';
    url: string;
    content?: string;
    encoding?: string;

    // Cache structure mapping child names to entries
    children?: Record<string, FileEntryListing>;
    entryElement?: EntryElement;
}

// dealing with github api
class CodebaseAPI {
    constructor(public page: CodebasePage, public repo: GithubRepo) {}

    public decodeBase64(text: string): string | null {
        try {
            // Sanitize whitespace/newlines from GitHub base64 and handle UTF-8
            const sanitized = text.replace(/\s/g, '');
            return decodeURIComponent(
                Array.from(atob(sanitized))
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
        } catch (error: unknown) {
            this.page.content.manager.notifications.sendNotification(
                'error',
                'Error decoding base64 in GitHub response.'
            );
            return null;
        }
    }

    public async fetchDirectory(path: string[]): Promise<FileEntryListing[] | null> {
        const pathStr = path.join('/');
        const url = `https://api.github.com/repos/${this.repo.owner}/${this.repo.name}/contents/${pathStr}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error: unknown) {
            this.page.content.manager.notifications.sendNotification(
                'error',
                `Failed to fetch path: /${pathStr}`
            );
            return null;
        }
    }
}