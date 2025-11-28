"use strict";
class SearchPage extends Page {
    constructor(parent) {
        super('search', parent);
        document.addEventListener('keydown', (e) => this.#tabKeyListener(e));
    }
    #tabKeyListener(e) {
        if (e.key != 'Tab')
            return;
        if (!this.element.classList.contains('show'))
            return;
        let all_search = [];
        let link_box = this.element.querySelector('.link_box');
        let plus = this.element.querySelector('.add');
        let past_searches = Array.from(this.element.querySelectorAll('.search_entry'));
        let bookmarks = Array.from(this.element.querySelectorAll('.bookmark'));
        let trash = this.element.querySelector('.trash');
        let search_boxes = Array.from(this.element.querySelectorAll('.search_box'));
        all_search.push(...[link_box, plus, ...past_searches, ...bookmarks, trash, ...search_boxes]);
        let current_index = all_search.indexOf(document.activeElement);
        let next_index = (current_index == -1 ? 0 : current_index + 1);
        next_index = next_index > all_search.length - 1 ? 0 : next_index;
        all_search[next_index].focus();
        e.preventDefault();
    }
}
class SearchScrollGlassPane extends ScrollGlassPane {
    constructor(parent) {
        super('y', parent, CSS_FullWidthFitHeight);
        this.element.classList.remove('glass', 'flex_padding');
        this.element.classList.add('nowrap');
    }
}
class Bookmark {
    element;
    link_info;
    constructor(parent, link_info, bookmark_bar) {
        this.element = document.createElement('a');
        this.element.classList.add('darkglass', 'bookmark', 'loading');
        this.link_info = this.#fixLink(link_info);
        let target_attribute = bookmark_bar.element.classList.contains('deletion') ? 'fakehref' : 'href';
        this.element.setAttribute(target_attribute, this.link_info.link);
        let open_new_tab = SettingsData.getItem('Open New Tab');
        if (open_new_tab)
            this.element.setAttribute('target', '_blank');
        this.#setWebsiteFavicon(link_info);
        parent.appendChild(this.element);
    }
    #setWebsiteFavicon(link_info) {
        for (var i = 0; i < AssignedBookmarks.length; i++) {
            let this_boomark = AssignedBookmarks[i];
            for (var j = 0; j < this_boomark.match.length; j++) {
                let this_match = this_boomark.match[j];
                if (!link_info.link.includes(this_match))
                    continue;
                this.element.style.setProperty('--icon', `url(${this_boomark.icon})`);
                this.element.classList.remove('loading');
                this.element.classList.add('loaded');
                return;
            }
        }
        let favicon = `https://www.google.com/s2/favicons?domain=${link_info.link}&sz=48`;
        let attempt = new Image();
        attempt.onload = () => {
            if (attempt.width > 20 && attempt.height > 20) {
                this.element.style.setProperty('--icon', `url('${favicon}')`);
                this.element.classList.add('loaded');
            }
            else {
                this.element.classList.add('default');
            }
            this.element.classList.remove('loading');
            attempt.remove();
        };
        attempt.onerror = () => {
            this.element.classList.remove('loading');
            this.element.classList.add('default');
            attempt.remove();
        };
        attempt.src = favicon;
    }
    #fixLink(link_info) {
        link_info.link = link_info.link.trim();
        let has_http = link_info.link.includes('http://') || link_info.link.includes('https://');
        if (has_http)
            return link_info;
        return { link: 'https://' + link_info.link };
    }
}
class SavedSearch {
    element;
    constructor(parent, search_info, search_term, search_link) {
        this.element = document.createElement('a');
        this.element.classList.add('darkglass');
        this.element.classList.add('search_entry');
        this.element.style.setProperty('--icon-image', `url('${search_info.image.icon}')`);
        this.element.style.setProperty('--icon-size', '100%');
        let target_attribute = parent.classList.contains('deletion') ? 'fakehref' : 'href';
        this.element.setAttribute(target_attribute, search_link);
        let open_new_tab = SettingsData.getItem('Open New Tab');
        if (open_new_tab)
            this.element.setAttribute('target', '_blank');
        let search_text = document.createElement('span');
        search_text.classList.add('search_text');
        search_text.textContent = search_term.trim().slice(0, 25).trim() + (search_term.length >= 25 ? '...' : '');
        this.element.appendChild(search_text);
        parent.appendChild(this.element);
    }
}
class BookmarksBar {
    element;
    plus;
    delete;
    link_box;
    last_input;
    constructor(parent) {
        this.element = document.createElement('div');
        this.element.classList.add('bookmarks_bar');
        this.plus = this.#addPlusButton();
        this.delete = this.#addTrashButton();
        this.link_box = this.#addLinkBox();
        this.#initializeSave();
        this.#loadSavedData();
        this.#bookmarksEventListeners();
        let hidden_setting = SettingsData.getItem('Hide Bookmarks');
        let new_tab_setting = SettingsData.getItem('Open New Tab');
        this.element.classList.toggle('hide', hidden_setting);
        this.#settingLinksOpenInNewTab(new_tab_setting);
        parent.appendChild(this.element);
    }
    #addPlusButton() {
        let plus = document.createElement('button');
        plus.classList.add('darkglass');
        plus.classList.add('add');
        plus.addEventListener('click', this.#addInput.bind(this));
        this.element.appendChild(plus);
        return plus;
    }
    #addTrashButton() {
        let trash = document.createElement('button');
        trash.classList.add('darkglass');
        trash.classList.add('trash');
        trash.onclick = () => {
            let deletion_mode = this.element.classList.toggle('deletion');
            let set_href = deletion_mode ? 'fakehref' : 'href';
            let remove_href = deletion_mode ? 'href' : 'fakehref';
            let all_links = this.element.querySelectorAll('a');
            for (var i = 0; i < all_links.length; i++) {
                let link_element = all_links[i];
                let link = link_element.getAttribute(remove_href);
                if (!link)
                    continue;
                link_element.removeAttribute(remove_href);
                link_element.setAttribute(set_href, link);
            }
        };
        this.element.appendChild(trash);
        return trash;
    }
    #addLinkBox() {
        let box = document.createElement('span');
        box.innerHTML = '&nbsp';
        box.classList.add('darkglass');
        box.classList.add('link_box');
        box.classList.add('empty');
        box.setAttribute('contenteditable', 'true');
        box.addEventListener('keydown', (e) => this.#onKeyDown(e));
        box.addEventListener('input', (e) => this.#onInput(e));
        this.element.appendChild(box);
        return box;
    }
    #onKeyDown(input) {
        let enter = input.key == 'Enter';
        this.last_input = input;
        if (enter) {
            input.preventDefault();
            this.#onInput(input); // jank but works
        }
    }
    #onInput(input) {
        let enter = this.last_input?.key == 'Enter';
        let backspace = this.last_input?.key == 'Backspace';
        if (enter) {
            this.#addInput();
        }
        if (backspace && this.link_box.textContent.length == 0) {
            this.link_box.innerHTML = '&nbsp';
        }
        this.link_box.classList.toggle('empty', this.link_box.textContent.length <= 1);
        this.last_input = null;
    }
    #handleLinkBoxError(error_code) {
        this.link_box.innerHTML = '&nbsp';
        this.link_box.classList.add('error');
        this.link_box.classList.add(error_code);
        setTimeout(() => {
            this.link_box.classList.remove('error');
            this.link_box.classList.remove(error_code);
        }, 1000);
    }
    #addInput() {
        this.addBookmark(this.link_box.textContent);
    }
    #initializeSave() {
        BookmarksData.initializeKeys({ bookmark_array: [], search_array: [] });
    }
    #handleLinkDeletion(input, internal) {
        let target_element = input instanceof PointerEvent ? input.target : input;
        if (target_element.parentElement != this.element)
            return;
        if (!internal && !this.element.classList.contains('deletion'))
            return;
        this.#initializeSave();
        let bookmarks_list = BookmarksData.getItem('bookmark_array');
        let search_list = BookmarksData.getItem('search_array');
        let url = target_element.getAttribute('fakehref') || target_element.getAttribute('href');
        if (!url)
            return;
        if (target_element.classList.contains('bookmark')) {
            let index = bookmarks_list.indexOf(url);
            console.log(url, bookmarks_list);
            if (index == -1)
                return;
            bookmarks_list.splice(index, 1);
            BookmarksData.setItem('bookmark_array', bookmarks_list);
        }
        if (target_element.classList.contains('search_entry')) {
            for (var i = 0; i < search_list.length; i++) {
                let search_entry = search_list[i];
                if (search_entry.search_link != url)
                    continue;
                search_list.splice(i, 1);
                BookmarksData.setItem('search_array', search_list);
                break;
            }
        }
        target_element.remove();
    }
    #loadSavedData() {
        this.#initializeSave();
        let bookmarks_list = BookmarksData.getItem('bookmark_array');
        let search_list = BookmarksData.getItem('search_array');
        for (var i = 0; i < search_list.length; i++) {
            let data = search_list[i];
            this.addSearchEntry(data.search_info, data.search_term, data.search_link, true);
        }
        for (var i = 0; i < bookmarks_list.length; i++) {
            let url = bookmarks_list[i];
            this.addBookmark(url, true);
        }
    }
    #bookmarksEventListeners() {
        document.addEventListener('Hide Bookmarks', ((e) => {
            this.element.classList.toggle('hide', e.detail.data);
        }));
        document.addEventListener('Save Last Search', ((e) => {
            let value = e.detail.data;
            if (value == true)
                return;
            this.#deleteSearches();
        }));
        document.addEventListener('Open New Tab', ((e) => {
            let value = e.detail.data;
            this.#settingLinksOpenInNewTab(value);
        }));
    }
    #settingLinksOpenInNewTab(status) {
        let search_list = this.element.querySelectorAll('.search_entry, .bookmark');
        for (var i = 0; i < search_list.length; i++) {
            let element = search_list[i];
            status ? element.setAttribute('target', '_blank') : element.removeAttribute('target');
        }
    }
    #deleteSearches() {
        let search_list = this.element.querySelectorAll('.search_entry');
        for (var i = 0; i < search_list.length; i++) {
            let element = search_list[i];
            this.#handleLinkDeletion(element, true);
        }
    }
    addBookmark(url, internal) {
        if (url.length == 0 || url.length == 1)
            return this.#handleLinkBoxError('notext');
        if (url.length < 4)
            return this.#handleLinkBoxError('invalid');
        if (!url.includes('.'))
            return this.#handleLinkBoxError('invalid');
        if (url.charAt(url.indexOf('.') + 1) == '')
            return this.#handleLinkBoxError('invalid');
        url = url.trim();
        let mark = new Bookmark(this.element, { link: url }, this);
        mark.element.onclick = (e) => this.#handleLinkDeletion(e);
        this.link_box.innerHTML = '&nbsp';
        this.link_box.classList.add('empty');
        if (!internal) {
            this.#initializeSave();
            let bookmark_save = BookmarksData.getItem('bookmark_array');
            bookmark_save.push(mark.link_info.link);
            BookmarksData.setItem('bookmark_array', bookmark_save);
        }
    }
    addSearchEntry(search_info, search_term, search_link, internal) {
        if (SettingsData.getItem('Save Last Search') != true)
            return;
        let search = new SavedSearch(this.element, search_info, search_term, search_link);
        search.element.onclick = (e) => this.#handleLinkDeletion(e);
        if (!internal) {
            this.#initializeSave();
            let search_save = BookmarksData.getItem('search_array');
            search_save.push({
                search_info: search_info,
                search_term: search_term,
                search_link: search_link
            });
            BookmarksData.setItem('search_array', search_save);
        }
    }
}
class SearchEntry {
    element;
    search_info;
    bookmarks_bar;
    icon_button;
    search_box;
    search_button;
    constructor(parent, info, bar) {
        this.element = document.createElement('div');
        this.element.classList.add('search_holder');
        this.search_info = info;
        this.bookmarks_bar = bar;
        this.icon_button = this.#createSearchIcon(info.base_url, info.image);
        this.search_box = this.#createSearchBox(info.name);
        this.search_button = this.#createSearchButton();
        parent.appendChild(this.element);
    }
    #createSearchIcon(base_url, icon_info) {
        let icon_button = document.createElement('a');
        icon_button.classList.add('darkglass', 'search_icon');
        icon_button.style.backgroundImage = `url('${icon_info.icon}')`;
        icon_button.style.backgroundSize = icon_info.size || '100%';
        icon_button.href = base_url;
        this.element.appendChild(icon_button);
        return icon_button;
    }
    #createSearchBox(name) {
        let search_box = document.createElement('input');
        search_box.classList.add('darkglass', 'search_box');
        search_box.placeholder = 'Search ' + name;
        search_box.addEventListener('keyup', (e) => this.#checkSearchInput(e));
        this.element.appendChild(search_box);
        return search_box;
    }
    #createSearchButton() {
        let search_button = document.createElement('button');
        search_button.classList.add('darkglass', 'search_button');
        search_button.addEventListener('click', () => this.#searchQuery());
        this.element.appendChild(search_button);
        return search_button;
    }
    #getSearchLink() {
        let search_url = this.search_info.search_url;
        let encoded_suffix = encodeURIComponent(this.search_box.value.trim());
        return search_url + encoded_suffix;
    }
    #checkSearchInput(e) {
        if (e.key === 'Enter') {
            this.#searchQuery();
        }
    }
    #searchQuery() {
        let query = this.search_box.value.trim();
        if (!query)
            return;
        this.bookmarks_bar.addSearchEntry(this.search_info, this.search_box.value.trim(), this.#getSearchLink());
        let fake_link = document.createElement('a');
        if (SettingsData.getItem('Open New Tab') == true) {
            fake_link.setAttribute('target', '_blank');
        }
        fake_link.setAttribute('href', this.#getSearchLink());
        fake_link.click();
        fake_link.remove();
        this.search_box.value = '';
    }
}
class SearchList {
    createSearchList(parent, list, bar) {
        for (var i = 0; i < list.length; i++) {
            let this_info = list[i];
            if (!bar)
                continue;
            new SearchEntry(parent, this_info, bar);
        }
    }
}
const Search = new SearchPage(Content.element);
Search.element.classList.add('glass');
new TextHeader(Search.element, 'Search');
new TextSubheader(Search.element, 'Browser Homepage');
const Bookmarks = new BookmarksBar(Search.element);
const SearchHolder = new SearchScrollGlassPane(Search.element);
const List = new SearchList();
List.createSearchList(SearchHolder.element, SearchInfo, Bookmarks);
