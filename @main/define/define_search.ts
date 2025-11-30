interface BookmarkEntry {
    link: string;
}

interface BookmarkEntryIcon {
    icon: string,
    match: string[]
}

interface SearchEntryInfo {
    name: string;
    base_url: string;
    search_url: string;
    image: IconEntry;
}

interface SearchEntrySave {
    search_info: SearchEntryInfo,
    search_term: string,
    search_link: string
}

const AssignedBookmarks: BookmarkEntryIcon[] = [
    {icon: '/@main/icon/bookmark/blackboard.ico', match: ['blackboard.com']},
    {icon: '/@main/icon/bookmark/classroom.png', match: ['classroom.google.com', 'google.com/classroom']},
    {icon: '/@main/icon/bookmark/docs.ico', match: ['docs.google.com', 'google.com/docs']},
    {icon: '/@main/icon/bookmark/drive.png', match: ['drive.google.com', 'google.com/drive']},
    {icon: '/@main/icon/bookmark/earth.ico', match: ['earth.google.com', 'google.com/earth']},
    {icon: '/@main/icon/bookmark/gmail.ico', match: ['mail.google.com', 'google.com/mail', 'gmail.com']},
    {icon: '/@main/icon/bookmark/maps.ico', match: ['maps.google.com', 'google.com/maps']},
    {icon: '/@main/icon/bookmark/meet.png', match: ['meet.google.com', 'google.com/meet']},
    {icon: '/@main/icon/bookmark/remotedesktop.png', match: ['remotedesktop.google.com', 'google.com/remotedesktop']},
    {icon: '/@main/icon/bookmark/sites.ico', match: ['sites.google.com', 'google.com/sites']},
    {icon: '/@main/icon/bookmark/slides.ico', match: ['slides.google.com', 'google.com/slides']},
]

const SearchInfo: SearchEntryInfo[] = [
    {
        name: 'Google',
        base_url: 'https://google.com',
        search_url: 'https://google.com/search?q=',
        image: { icon: '/@main/icon/google.svg', size: '75%' },
    },
    {
        name: 'DuckDuckGo',
        base_url: 'https://duck.com',
        search_url: 'https://duckduckgo.com/search?q=',
        image: { icon: '/@main/icon/duckduckgo.svg', size: '75%' },
    },
    {
        name: 'Brave',
        base_url: 'https://brave.com',
        search_url: 'https://search.brave.com?q=',
        image: { icon: '/@main/icon/brave.svg' , size: '75%' },
    },
    {
        name: 'Bing',
        base_url: 'https://bing.com',
        search_url: 'https://bing.com/search?q=',
        image: { icon: '/@main/icon/bing.svg', size: '75%' },
    },
    {
        name: 'Ecosia',
        base_url: 'https://ecosia.com',
        search_url: 'https://ecosia.com/search?q=',
        image: { icon: '/@main/icon/ecosia.svg', size: '75%' },
    },
    {
        name: 'Yandex',
        base_url: 'https://yandex.com',
        search_url: 'https://yandex.com/search?text=',
        image: { icon: '/@main/icon/yandex.svg', size: '75%' },
    },
    {
        name: 'Google Scholar',
        base_url: 'https://scholar.google.com',
        search_url: 'https://scholar.google.com/scholar?q=',
        image: { icon: '/@main/icon/googlescholar.svg', size: '75%' },
    },
    {
        name: 'Wikipedia',
        base_url: 'https://wikipedia.com',
        search_url: 'https://en.wikipedia.org/w/index.php?search=',
        image: { icon: '/@main/icon/wikipedia.svg', size: '75%' }
    },
    {
        name: 'GitHub',
        base_url: 'https://github.com',
        search_url: 'https://github.com/search?q=',
        image: { icon: '/@main/icon/github.svg', size: '75%' },
    },
    {
        name: 'MDN Web Docs',
        base_url: 'https://developer.mozilla.com',
        search_url: 'https://developer.mozilla.org/en-US/search?q=',
        image: { icon: '/@main/icon/mdnwebdocs.svg', size: '75%'},
    },
    {
        name: 'Stack Overflow',
        base_url: 'https://stackoverflow.com',
        search_url: 'https://stackoverflow.com/search?q=',
        image: { icon: '/@main/icon/stackoverflow.svg', size: '75%' },
    },
    {
        name: 'YouTube',
        base_url: 'https://youtube.com',
        search_url: 'https://www.youtube.com/results?search_query=',
        image: { icon: '/@main/icon/youtube.svg', size: '75%' },
    },
    {
        name: 'Twitch',
        base_url: 'https://twitch.tv',
        search_url: 'https://www.twitch.tv/search?term=',
        image: { icon: '/@main/icon/twitch.svg', size: '75%' },
    },
    {
        name: 'Reddit',
        base_url: 'https://reddit.com',
        search_url: 'https://reddit.com/search?q=',
        image: { icon: '/@main/icon/reddit.svg', size: '75%' },
    },
    {
        name: 'Twitter',
        base_url: 'https://x.com',
        search_url: 'https://x.com/search?q=',
        image: { icon: '/@main/icon/twitter.svg', size: '75%' },
    },
    {
        name: 'Internet Archive',
        base_url: 'https://archive.org',
        search_url: 'https://archive.org/search?query=',
        image: { icon: '/@main/icon/archive.svg', size: '75%' },
    },
    {
        name: 'Urban Dictionary',
        base_url: 'https://urbandictionary.com/',
        search_url: 'https://www.urbandictionary.com/define.php?term=',
        image: { icon: '/@main/icon/urbandictionary.svg', size: '75%' },
    }
]