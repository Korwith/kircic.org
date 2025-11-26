"use strict";
const search_info = [
    {
        name: 'Google',
        base_url: 'https://google.com',
        search_url: 'https://google.com/search?q=',
        image: { icon: '../icon/google.svg', size: '75%' },
    },
    {
        name: 'DuckDuckGo',
        base_url: 'https://duck.com',
        search_url: 'https://duckduckgo.com/search?q=',
        image: { icon: '../icon/duckduckgo.svg', size: '75%' },
    },
    {
        name: 'Brave',
        base_url: 'https://brave.com',
        search_url: 'https://search.brave.com?q=',
        image: { icon: '../icon/brave.svg', size: '75%' },
    },
    {
        name: 'Bing',
        base_url: 'https://bing.com',
        search_url: 'https://bing.com/search?q=',
        image: { icon: '../icon/bing.svg', size: '75%' },
    },
    {
        name: 'Ecosia',
        base_url: 'https://ecosia.com',
        search_url: 'https://ecosia.com/search?q=',
        image: { icon: '../icon/ecosia.svg', size: '75%' },
    },
    {
        name: 'Yandex',
        base_url: 'https://yandex.com',
        search_url: 'https://yandex.com/search?text=',
        image: { icon: '../icon/yandex.svg', size: '75%' },
    },
    {
        name: 'Google Scholar',
        base_url: 'https://scholar.google.com',
        search_url: 'https://scholar.google.com/scholar?q=',
        image: { icon: '../icon/googlescholar.svg', size: '75%' },
    },
    {
        name: 'Wikipedia',
        base_url: 'https://wikipedia.com',
        search_url: 'https://en.wikipedia.org/w/index.php?search=',
        image: { icon: '../icon/wikipedia.svg', size: '75%' }
    },
    {
        name: 'GitHub',
        base_url: 'https://github.com',
        search_url: 'https://github.com/search?q=',
        image: { icon: '../icon/github.svg', size: '75%' },
    },
    {
        name: 'MDN Web Docs',
        base_url: 'https://developer.mozilla.com',
        search_url: 'https://developer.mozilla.org/en-US/search?q=',
        image: { icon: '../icon/mdnwebdocs.svg', size: '75%' },
    },
    {
        name: 'Stack Overflow',
        base_url: 'https://stackoverflow.com',
        search_url: 'https://stackoverflow.com/search?q=',
        image: { icon: '../icon/stackoverflow.svg', size: '75%' },
    },
    {
        name: 'YouTube',
        base_url: 'https://youtube.com',
        search_url: 'https://www.youtube.com/results?search_query=',
        image: { icon: '../icon/youtube.svg', size: '75%' },
    },
    {
        name: 'Twitch',
        base_url: 'https://twitch.tv',
        search_url: 'https://www.twitch.tv/search?term=',
        image: { icon: '../icon/twitch.svg', size: '75%' },
    },
    {
        name: 'Reddit',
        base_url: 'https://reddit.com',
        search_url: 'https://reddit.com/search?q=',
        image: { icon: '../icon/reddit.svg', size: '75%' },
    },
    {
        name: 'Twitter',
        base_url: 'https://x.com',
        search_url: 'https://x.com/search?q=',
        image: { icon: '../icon/twitter.svg', size: '75%' },
    },
    {
        name: 'Internet Archive',
        base_url: 'https://archive.org',
        search_url: 'https://archive.org/search?query=',
        image: { icon: '../icon/archive.svg', size: '75%' },
    },
    {
        name: 'Urban Dictionary',
        base_url: 'https://urbandictionary.com/',
        search_url: 'https://www.urbandictionary.com/define.php?term=',
        image: { icon: '../icon/urbandictionary.svg', size: '75%' },
    }
];
