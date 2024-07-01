const header = document.querySelector('header');
const content = document.querySelector('.content');
const sidebar = document.querySelector('.sidebar');
const sidebar_main = document.querySelector('.sidebar_main');
const sidebarToggle = document.querySelector('.hamburger');
const expandAccounts = document.querySelector('.expand_accounts');
const allVideo = document.querySelectorAll('video');

const sbTopRed = document.querySelector('.sidebar_dots_holder .dot1');
const sbTopYellow = document.querySelector('.sidebar_dots_holder .dot2');
const sbTopGreen = document.querySelector('.sidebar_dots_holder .dot3');

var mobileNow = false;
var selectedPage = 'home_page';

// Handle Sidebar
function moveSidebar() {
    if (sidebar.classList.contains('mobile_closed')) {
        sidebar.classList.remove('mobile_closed');
    }

    if (sidebar.classList.contains('closed')) {
        sidebar_main.focus();
        sidebar.classList.remove('closed');
        content.classList.remove('extend');

        if (!mobileNow) {
            header.classList.remove('extend');
        }
    } else {
        sidebar.classList.add('closed');
        content.classList.add('extend');

        if (!mobileNow) {
            header.classList.add('extend');
        }
    }
}
sidebarToggle.addEventListener('mouseup', moveSidebar);

function fullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function closePage() {
    window.location.href = 'https://www.google.com';
}

sbTopGreen.addEventListener('mouseup', fullscreen);
sbTopYellow.addEventListener('mouseup', moveSidebar);
sbTopRed.addEventListener('mouseup', closePage);

// Sidebar Links
const allButtons = document.querySelectorAll('.button_bar');
var allPages = document.querySelectorAll('.page');
var classToPage = {
    'home_button': 'home_page',
    'project_button': 'project_page',
    'search_button': 'search_page'
}

function loadSidebarLinks() {
    for (var className in classToPage) {
        var buttonElement = document.querySelector('.' + className);
        var pageName = classToPage[className];
        var buttonPage = document.querySelector('.' + pageName);

        (function (buttonElement, buttonPage, pageName) {
            buttonElement.addEventListener('mouseup', function () {
                content.focus();

                for (var i = 0; i < allPages.length; i++) {
                    var foundPage = allPages[i];
                    foundPage.classList.add('disabled');
                }

                for (var i = 0; i < allButtons.length; i++) {
                    var foundButton = allButtons[i];
                    if (!foundButton.classList.contains('keep')) {
                        foundButton.classList.remove('constant_hover');
                    }
                }

                buttonPage.classList.remove('disabled');
                buttonElement.classList.add('constant_hover');

                if (window.location.href.includes('#')) {
                    var beforeHashtag = window.location.href.split('#')[0];
                    history.pushState(null, null, beforeHashtag);
                }
                history.pushState(null, null, '#' + pageName.split('_')[0]);

                if (mobileNow) {
                    sidebar.classList.add('closed');
                    content.classList.add('extend');
                    header.classList.add('extend');
                }

                content.scrollTop = 0;
                selectedPage = pageName;
                wasResized();
            })
        })(buttonElement, buttonPage, pageName);
    }
}
loadSidebarLinks();

// Handle what page loads automatically
var pageToFrame = {
    'home': 'home_page',
    'project': 'project_page',
    'search': 'search_page'
}

var pageToButton = {
    'home': 'home_button',
    'project': 'project_button',
    'search': 'search_button'
}

function isPushState() {
    if (document.location.href.includes('#')) {
        var goToPage = document.location.href.split('#')[1];
        var pageElement = document.querySelector('.' + pageToFrame[goToPage]);
        var pageButton = document.querySelector('.' + pageToButton[goToPage]);

        for (var i in pageToFrame) {
            var foundPageClass = pageToFrame[i];
            var foundPage = document.querySelector('.' + foundPageClass);
            foundPage.classList.add('disabled');
        }

        pageButton.classList.add('constant_hover');
        pageElement.classList.remove('disabled');
        selectedPage = pageToFrame[goToPage];
    } else {
        var homePage = document.querySelector('.home_page');
        homePage.classList.remove('disabled');
    }
}
isPushState();

// Handle Window Resize
function wasResized() {
    var contentScrollHeight = content.scrollHeight;
    var contentClientHeight = content.clientHeight;

    if (contentScrollHeight > contentClientHeight) {
        content.classList.add('scroll_padding');
    } else {
        content.classList.remove('scroll_padding');
    }

    if (window.innerWidth < 767) {
        content.classList.add('mobile');
        sidebar.classList.add('closed');
        content.classList.add('extend');
        header.classList.add('extend');
        content.focus();

        mobileNow = true;
    } else {
        content.classList.remove('mobile');
        header.classList.remove('extend');
        sidebar.classList.remove('closed');
        content.classList.remove('extend');
        mobileNow = false;
    }
}
window.onresize = wasResized;
wasResized();

// Time Widgets
var clockWidget = document.querySelector('.clock_widget');
function updateClock() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds().toString().padStart(2, '0');
    var year = currentTime.getFullYear();

    var dayOfWeek = days[currentTime.getDay()];
    var month = months[currentTime.getMonth()];

    var amORpm = hours >= 12 ? 'PM' : 'AM';
    minutes = minutes < 10 ? '0' + minutes : minutes;

    if (hours > 12) {
        hours = hours - 12;
    }

    var timeString = hours + ':' + minutes + ':' + seconds + ' ' + amORpm;
    clockWidget.innerHTML = dayOfWeek + ', ' + month + ' ' + currentTime.getDate() + ', ' + year + '<br>' + timeString;

    setTimeout(updateClock, 1000);
}
updateClock();

// Expand Accounts Button
function expand() {
    var allDisabled = document.querySelectorAll('.right_sidebar .disabled');

    for (var i = 0; i < allDisabled.length; i++) {
        var thisElement = allDisabled[i];
        thisElement.classList.remove('disabled');
    }

    expandAccounts.classList.add('disabled')
}
expandAccounts.addEventListener('mouseup', expand);

// Key Listener (for search page)
var searchIndexToURL = [
    'google.com/search?q=',
    'duckduckgo.com/?q=',
    'search.brave.com/search?q=',
    'bing.com/search?q=',
    'ecosia.org/search?q=',
    'yandex.com/search/?text=',
    'wikipedia.org/w/index.php?search=',
    'github.com/search?q=',
    'developer.mozilla.org/en-US/search?q=',
    'stackoverflow.com/search?q=',
    'youtube.com/results?search_query=',
    'twitch.tv/search?term=',
    'reddit.com/search/?q=',
    'twitter.com/search?q=',
    'archive.org/search?query=',
    'merriam-webster.com/dictionary/',
    'urbandictionary.com/define.php?term='
]

var selectedSearchIndex = 0;
var allSearch = document.querySelectorAll('[search]');
var lastSearch = allSearch[allSearch.length - 1];
var lastSearchIndex = parseInt(lastSearch.getAttribute('search'));
var selectedSearchMode = 'all';

function keyListener(event) {
    if (event.which == 9) {
        if (selectedPage == 'search_page') {
            event.preventDefault();
            var boxToFocus = document.querySelector(`[search="${selectedSearchIndex}"]`);
            boxToFocus.focus();
            if (selectedSearchIndex < lastSearchIndex) {
                selectedSearchIndex++;
            } else {
                selectedSearchIndex = 0;
            }
        }
    }

    else if (event.which == 13) {
        if (document.activeElement) {
            var searchIndex = document.activeElement.getAttribute('search');

            if (searchIndex) {
                searchTerm(searchIndex);
            }
        }
    }
}
document.addEventListener('keydown', keyListener);

// Load search button elements
var allSearchButtons = document.querySelectorAll('.search_go');

function loadSearchButtons() {
    for (var i = 0; i < allSearchButtons.length; i++) {
        var thisSearchButton = allSearchButtons[i];

        (function (thisSearchButton) {
            thisSearchButton.onclick = function () {
                var findSearchBox = thisSearchButton.parentElement.querySelector('.search_box');
                var searchIndex = findSearchBox.getAttribute('search');
                searchTerm(searchIndex);
            }
        })(thisSearchButton);
    }
}
loadSearchButtons();

// Open link with search index
function searchTerm(searchIndex) {
    var searchBox = document.querySelector(`[search="${searchIndex}"]`);
    if (searchBox.value.length > 0) {
        window.open(`https://${searchIndexToURL[searchIndex]}${searchBox.value.replaceAll(' ', '+')}`);
        searchBox.value = '';
    }
}