const bookmark_holder = document.querySelector('.search_holder.bookmarks');
const plus = document.querySelector('.plus');
const placeholder_bookmark = document.querySelector('.placeholder_bookmark');
const trash_button = document.querySelector('.trash');

let bookmarkArray = [];
var trashing = false;

function bookmark(url, load) {
    let clone = placeholder_bookmark.cloneNode(true);
    let cloneIcon = clone.querySelector('.icon');
    clone.classList.remove('placeholder_bookmark');
    clone.classList.add('real');
    clone.setAttribute('index', bookmark_holder.querySelectorAll('.real').length);
    clone.setAttribute('href', url);
    clone.setAttribute('target', '_blank');
    cloneIcon.style.backgroundImage = `url(https://www.google.com/s2/favicons?domain=${url}&sz=128)`
    bookmark_holder.appendChild(clone);

    (function (clone) {
        clone.addEventListener('mouseup', function () {
            if (clone.classList.contains('red')) {
                let bookmarkIndex = parseInt(clone.getAttribute('index'));
                bookmarkArray.splice(bookmarkIndex, 1);
                clone.remove();
                refreshIndex();
                saveBookmarks();
            }
        });
    })(clone);

    if (!load) {
        bookmarkArray.push(url);
        saveBookmarks();
    }
}

function refreshIndex() {
    let currentBookmarks = bookmark_holder.querySelectorAll('.real');
    for (var i = 0; i < currentBookmarks.length; i++) {
        var thisBookmark = currentBookmarks[i];
        thisBookmark.setAttribute('index', i);
    }
}

function handleAddBookmark() {
    var response = prompt('Bookmark a website...')

    if (response) {
        var subbed = response.substring(0, 8);
        var prefix = false;
        if (!subbed.includes('http://') && !subbed.includes('https://')) {
            response = 'https://' + response;
        }

        bookmark(response);
    }
}

function trashMode() {
    const trash_icon = trash_button.querySelector('.icon');
    var currentBookmarks = bookmark_holder.querySelectorAll('.real');

    trashing = !trashing;
    if (trashing) {
        trash_icon.classList.add('enabled');
        plus.classList.add('hide');
    } else {
        trash_icon.classList.remove('enabled');
        plus.classList.remove('hide');
    }

    for (var i = 0; i < currentBookmarks.length; i++) {
        var thisBookmark = currentBookmarks[i];
        if (trashing) {
            thisBookmark.classList.add('red');
            thisBookmark.removeAttribute('href');
        } else {
            thisBookmark.classList.remove('red')
            thisBookmark.setAttribute('href', bookmarkArray[i]);
        }
    }
}

function saveBookmarks() {
    let stringed = JSON.stringify(bookmarkArray);
    localStorage.setItem('bookmarks', stringed);
}

function loadBookmarks() {
    let bookmarkData = localStorage.getItem('bookmarks');
    if (bookmarkData) {
        let newArray = JSON.parse(bookmarkData);
        bookmarkArray = newArray;

        for (var i = 0; i < newArray.length; i++) {
            var thisURL = newArray[i];
            bookmark(thisURL, true);
        }
    }
}

loadBookmarks();
plus.addEventListener('mouseup', handleAddBookmark);
trash_button.addEventListener('mouseup', trashMode);