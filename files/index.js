const header = document.querySelector('header');
const sidebar = document.querySelector('nav.sidebar');
const content = document.querySelector('.content');

const open = header.querySelector('button.open');
const path_back = header.querySelector('button.back');
const path_next = header.querySelector('button.next');
const sidebar_toggle = header.querySelector('.sidebar_toggle');

const content_header = content.querySelector('.content_header');
const file_explorer = content.querySelector('.icon_explorer');
const folders = file_explorer.querySelector('.segment.folders');
const files = file_explorer.querySelector('.segment.files');
const folder_header = folders.querySelector('.type_header');
const file_header = files.querySelector('.type_header');

const no_view_holder = content.querySelector('.no_view');
const no_view_root = no_view_holder.querySelector('.open_root');
const no_view_open_folder = no_view_holder.querySelector('.open_folder');

const file_viewer = content.querySelector('.file_viewer')
const viewer_header = file_viewer.querySelector('.file_header');
const viewer_icon = viewer_header.querySelector('.icon');
const viewer_name = viewer_header.querySelector('span.file_name');
const viewer_size = viewer_header.querySelector('span.file_size');
const text_content = file_viewer.querySelector('.text_content');

const text_edit = file_viewer.querySelector('.edit');
const text_close = file_viewer.querySelector('.close');
const text_discard = file_viewer.querySelector('.discard');
const text_save = file_viewer.querySelector('.save');

const list_placeholder = document.querySelector('#placeholder.list_file');
const large_placeholder = document.querySelector('#placeholder.large_file');

const icons = window.FileIcons;

// Global Variables
let file_id_directory = {};
let id_handle = [];
let path_history = [];
let saved_history = [];
let block_action = false;
let editing_text = false;
let current_file_access;

// FileSystem
async function loadFolder(event, origin) {
    try {
        let handle = id_handle[origin] || await window.showDirectoryPicker();
        if (!origin) {
            id_handle[0] = handle;
            createListEntry(handle, 0, 0);
            updatePathHistory(0);
            origin = 0;
            no_view_root.classList.add('hide');
            no_view_open_folder.classList.remove('hide');
        }

        for await (let entry of handle.values()) {
            id_handle.push(entry);
            createListEntry(entry, id_handle.length - 1, origin);
            createMainEntry(entry, id_handle.length - 1);
        }
        updateCountAttributes();
    } catch(error) {
        console.error(error);
    }
}

async function fileAccess(handle) {
    if (!handle.name.includes('.')) { return; }
    let format = handle.name.split('.').pop();
    if (!supported_text.includes(format)) { return; }

    let file = await handle.getFile();
    let text = await file.text();
    current_file_access = handle;
    document.body.classList.toggle('mobile_shift', false);
    content.classList.add('shift');
    assignIconImage(handle, viewer_icon);
    viewer_name.textContent = handle.name;
    viewer_size.textContent = getFileSize(text.length);
    text_content.textContent = text;
    removeHighlightClasses();
    hljs.highlightElement(text_content);
}

async function updateFile() {
    try {
        let writable = await current_file_access.createWritable();
        await writable.write(text_content.textContent);
        await writable.close();
        removeTextEditable();
    } catch(error) {
        console.error(error);
    }
}

// User Interface
function iconSelect(event, force) {
    if (block_action && !force) { return; }
    let found_access = event.target.getAttribute('access');
    let handle = id_handle[found_access];
    if (handle instanceof FileSystemDirectoryHandle != true) {
        fileAccess(handle);
        return true;
    }

    clearMainIcons();
    updatePathHistory(found_access);
    if (event.target.classList.contains('list_file')) {
        if (!event.target.classList.contains('expand')) {
            loadFolder(false, found_access);
        } else {
            let target_list = findTargetList(found_access);
            clearTargetList(target_list);
            target_list.remove();
        }
        event.target.classList.toggle('expand');    
    } else {
        let found_list_entry = sidebar.querySelector(`.list_file[access="${found_access}"]`);
        loadFolder(false, found_access);
        found_list_entry.classList.add('expand');
    }
}

function createMainEntry(entry, access) {
    let large_clone = large_placeholder.cloneNode(true);
    let large_icon = large_clone.querySelector('.icon');
    let large_text = large_clone.querySelector('span');
    large_text.textContent = entry.name;
    large_clone.setAttribute('access', access);
    large_clone.setAttribute('kind', entry.kind);
    large_clone.setAttribute('name', entry.name);
    large_clone.removeAttribute('id');
    large_clone.addEventListener('mouseup', iconSelect);

    if (entry.kind == 'directory') {
        folders.appendChild(large_clone);
    } else {
        files.appendChild(large_clone);
        assignIconImage(entry, large_icon);
    }
}

function createListEntry(entry, access, origin) {
    let list_clone = list_placeholder.cloneNode(true);
    let list_icon = list_clone.querySelector('.icon');
    let list_text = list_clone.querySelector('span');
    list_text.textContent = entry.name;
    entry.kind == 'directory' ? list_clone.style.order = 0 : list_clone.style.order = access;
    list_clone.setAttribute('access', access);
    list_clone.setAttribute('kind', entry.kind);
    list_clone.setAttribute('name', entry.name);
    list_clone.removeAttribute('id');
    list_clone.addEventListener('mouseup', iconSelect);
    assignIconImage(entry, list_icon);

    if (access) {
        let found_list = findTargetList(origin);
        found_list.appendChild(list_clone);
    } else {
        sidebar.appendChild(list_clone);
        list_clone.classList.add('expand');
    }
}

function findTargetList(origin) {
    let found_target = sidebar.querySelector(`.target_list[origin="${origin}"]`);
    if (found_target) {
        return found_target;
    }

    let found_entry = sidebar.querySelector(`.list_file[access="${origin}"]`);
    let new_target = document.createElement('div');
    new_target.classList.add('target_list');
    new_target.setAttribute('origin', origin);
    found_entry.parentElement.insertBefore(new_target, found_entry.nextElementSibling);
    return new_target;
}

function clearTargetList(target_list) {
    let all_entry = target_list.querySelectorAll('.list_file');
    let handle_clone = [...id_handle];
    for (var i = 0; i < all_entry.length; i++) {
        let this_entry = all_entry[i];
        let this_access = parseInt(this_entry.getAttribute('access'));
        handle_clone.splice(this_access);
    }
    id_handle = [...handle_clone];
    content.removeAttribute('folders');
    content.removeAttribute('files');
}

function clearMainIcons() {
    let all_main = file_explorer.querySelectorAll('.large_file');
    for (var i = 0; i < all_main.length; i++) {
        let this_entry = all_main[i];
        this_entry.remove();
    }
}

function updatePathHistory(access) {
    let found_entry = sidebar.querySelector(`.list_file[access="${access}"]`);
    let found_history = [];
    
    while (found_entry != sidebar) {
        let found_id = found_entry.getAttribute('access') || found_entry.getAttribute('origin');
        let found_handle = id_handle[parseInt(found_id)];
        found_history.push(found_handle.name);
        found_entry = found_entry.parentElement;
    }

    path_history = found_history.reverse();
    updateSavedHistory();
    clearPathHistory();
    createPathHistory();
}

function createPathHistory() {
    clearPathHistory();
    for (var i = 0; i < path_history.length; i++) {
        let this_name = path_history[i];
        let new_entry = document.createElement('div');
        new_entry.textContent = this_name;
        new_entry.classList.add('path_entry');
        new_entry.setAttribute('name', this_name);
        new_entry.addEventListener('mouseup', accessPathHistory);
        content_header.appendChild(new_entry);
    }
}

function accessPathHistory(event) {
    if (block_action) { return; }
    let origin_element = sidebar.querySelector('.list_file[access="0"]');
    let found_name = event.target.getAttribute('name');
    let end_index = path_history.indexOf(found_name);
    let access_history = path_history.slice(1, end_index + 1);

    let current_index = 0;
    const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type == 'childList') {
                if (mutation.target.classList.contains('target_list')) {
                    let found_button = mutation.target.querySelector(`.list_file[name="${access_history[current_index]}"]`);
                    if (found_button) {
                        current_index++;
                        setTimeout(function() {
                            iconSelect({target: found_button}, true);
                        }, 1);
                    }
                }
            }
        }

        if (current_index == access_history.length) {
            endObserve();
        }
    }

    block_action = true;
    content.classList.add('noshow');
    origin_element.classList.add('expand');
    iconSelect({target: origin_element}, true);
    const observe_config = {attributes: true, childList: true, subtree: true};
    const observer = new MutationObserver(callback);
    observer.observe(sidebar, observe_config);
    iconSelect({target: origin_element}, true);

    function endObserve() {
        observer.disconnect();
        block_action = false;
        content.classList.remove('noshow');
    }
}

function clearPathHistory() {
    let all_entry = content_header.querySelectorAll('.path_entry');

    for (var i = 0; i < all_entry.length; i++) {
        let this_entry = all_entry[i];
        this_entry.remove();
    }
}

function updateSavedHistory() {
    if (path_history.length >= saved_history.length) {
        saved_history = [...path_history];
    }

    for (var i = 0; i < path_history.length; i++) {
        let this_path = path_history[i];
        let this_saved = saved_history[i];
        if (this_path != this_saved) {
            saved_history = [...path_history];
            break;
        }
    }
}

function pathHistoryNext() {
    let current_page = path_history[path_history.length - 1];
    let next_page = saved_history[path_history.length];
    if (!next_page) { return; }

    let page_element = sidebar.querySelector(`.list_file[name="${next_page}"]`);
    iconSelect({target: page_element}, true);
}

function pathHistoryBack() {
    let current_page = path_history[path_history.length - 1];
    let found_index = saved_history.indexOf(current_page);
    let page_before = saved_history[found_index - 1];
    if (!page_before) { return; }

    let page_element = sidebar.querySelector(`.list_file[name="${page_before}"]`);
    iconSelect({target: page_element}, true);
    iconSelect({target: page_element}, true);
}

function assignIconImage(entry, icon) {
    let classes = icons.getClassWithColor(entry.name);
    icon.classList = 'icon';
    if (!classes) {
        icon.classList.add('unknown');
        return;
    }

    let split = classes.split(' ');
    for (var i = 0; i < split.length; i++) {
        let this_entry = split[i];
        icon.classList.add(this_entry);
    }
}

function assignTextEditable() { 
    if (editing_text) {
        removeTextEditable();
        return;
    }
    editing_text = true;
    removeHighlightClasses();
    text_content.setAttribute('contenteditable', true);
    text_content.textContent = text_content.textContent;
    text_edit.classList.add('active');
}

async function removeTextEditable() {
    editing_text = false;
    let found_file = await current_file_access.getFile();
    text_content.textContent = await found_file.text();
    text_content.removeAttribute('contenteditable');
    text_edit.classList.remove('active');
    removeHighlightClasses();
    hljs.highlightElement(text_content);
    
}

function removeHighlightClasses() {
    file_viewer.removeAttribute('editing');
    text_content.removeAttribute('contenteditable');
    text_content.removeAttribute('data-highlighted');
    text_content.classList = 'text_content';
}

function handleEditedText(event) {
    file_viewer.setAttribute('editing', true);
    viewer_size.textContent = getFileSize(text_content.textContent.length);
}

function hideCodeMenu() {
    content.classList.remove('shift');
    file_viewer.removeAttribute('editing');
    removeTextEditable();
}

function handleSidebarToggle() {
    document.body.classList.toggle('mobile_shift');
}

function updateCountAttributes() {
    let folder_count = folders.querySelectorAll('.large_file').length;
    let file_count = files.querySelectorAll('.large_file').length;
    folder_count > 0 ? content.setAttribute('folders', folder_count) : content.removeAttribute('folders');
    file_count > 0 ? content.setAttribute('files', file_count) : content.removeAttribute('files');
    folder_header.textContent = `Folders (${folder_count})`;
    file_header.textContent = `Files (${file_count})`;
}

function handleKeyDown(event) {
    if (event.which == 27) {
        hideCodeMenu();
    }
}

let all_types = [' Byes', 'KB', 'MB', 'GB', 'TB'];
function getFileSize(bytes) {
    let count = 0;
    while (bytes >= 1024) {
        bytes /= 1024;
        count++;
    }
    let no_dec = bytes.toFixed(2).endsWith('.00');
    return (no_dec ? Math.floor(bytes) : bytes.toFixed(2)) + all_types[count];
}

// Initialize
open.addEventListener('mouseup', loadFolder);
path_next.addEventListener('mouseup', pathHistoryNext);
path_back.addEventListener('mouseup', pathHistoryBack);
no_view_root.addEventListener('mouseup', loadFolder);
sidebar_toggle.addEventListener('mouseup', handleSidebarToggle);
text_close.addEventListener('mouseup', hideCodeMenu);
text_edit.addEventListener('mouseup', assignTextEditable);
text_discard.addEventListener('mouseup', removeTextEditable);
text_save.addEventListener('mouseup', updateFile);;
text_content.addEventListener('input', handleEditedText);
document.addEventListener('keyup', handleKeyDown);