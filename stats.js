const owner = 'Korwith';
const repo = 'kircic.org';

async function fetchCommitCount(owner, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`);
        if (!response.ok) {
            throw new Error(`HTTP error, status:${response.status}`);
        };

        const linkHeader = response.headers.get('link');
        if (!linkHeader) { // only one page
            const commits = await response.json();
            return commits.length;
        }

        const lastPageLink = linkHeader.split(',').find(s => s.includes('rel="last"'));
        if (!lastPageLink) {
            throw new Error('No "last" link found in link header');
        }

        const lastPageUrl = lastPageLink.match(/<(.*?)>/)[1];
        const url = new URL(lastPageUrl);
        return Number(url.searchParams.get('page'));
    } catch (error) {
        console.error('Error fetching commit count:', error);
        return 0;
    }
}

async function fetchRepoSize(owner, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        }

        const repoData = await response.json();
        const sizeInKB = repoData.size; 
        return sizeInKB;
    } catch (error) {
        console.error('Error fetching size', error);
        return 0;
    }
}

async function displayCommitCount() {    
    const commitCount = await fetchCommitCount(owner, repo);
    commit_stat.innerHTML = `${commitCount} commits`;
}

function formatSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

async function displayRepoSize() {
    const repoSize = await fetchRepoSize(owner, repo);
    // *1024 to convert KB to B.
    const formattedSize = formatSize(repoSize*1024);
    size_stat.innerHTML = formattedSize;
}

async function fetchLatestCommitHash() {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`);
        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        }

        const commits = await response.json();
        const latestCommitName = commits[0].commit.message;
        const latestCommitHash = commits[0].sha;
        const latestCommitDate = commits[0].commit.committer.date;
        displayLatestCommitName(latestCommitName);
        displayLatestCommitHash(latestCommitHash);
        displayLatestDate(latestCommitDate);
    } catch (error) {
        console.error('Error fetching latest commit hash:', error);
        return 'Error fetching commit hash';
    }
}

async function displayLatestCommitName(name) {
    let commit_name = document.querySelector('.settings_stat.commit_name');
    commit_name.textContent = name;
}

async function displayLatestCommitHash(hash) {
    let commit_hash = document.querySelector('.settings_stat.commit_hash');
    commit_hash.textContent = 'Build '+ hash.slice(0, 7);
}

async function displayLatestDate(time_data) {
    let time_element = document.querySelector('.settings_stat.commit_date');
    let seperate = time_data.split('T');
    let date_split = seperate[0].split('-');
    let time_replace = seperate[1].replace('Z', '');
    let formatted_date = `${date_split[1]}/${date_split[2]}/${date_split[0]}`;
    
    time_element.textContent = `${formatted_date} ${time_replace}`;
}
displayCommitCount();
displayRepoSize();
fetchLatestCommitHash();