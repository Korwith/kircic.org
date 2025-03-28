const header = document.querySelector('header');
const sidebar = document.querySelector('nav.sidebar');
const content = document.querySelector('.content');

const open = header.querySelector('button.open');
const path_back = header.querySelector('button.back');
const path_next = header.querySelector('button.next');
const file_new = header.querySelector('button.add');
const file_delete = header.querySelector('button.delete');
const sidebar_toggle = header.querySelector('.sidebar_toggle');

const content_header = content.querySelector('.content_header');
const file_explorer = content.querySelector('.icon_explorer');
const folders = file_explorer.querySelector('.segment.folders');
const files = file_explorer.querySelector('.segment.files');
const folder_header = folders.querySelector('.type_header');
const file_header = files.querySelector('.type_header');

const no_view_holder = content.querySelector('.no_view');
const no_view_header = no_view_holder.querySelector('.nv_title');
const no_view_root = no_view_holder.querySelector('.open_root');
const no_view_open_folder = no_view_holder.querySelector('.open_folder');
const no_view_error = no_view_holder.querySelector('.nv_error');

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

const image_holder = file_viewer.querySelector('.image_holder');
const image_element = image_holder.querySelector('img');
const image_size = image_holder.querySelector('span.image_dimensions');

const video_holder = file_viewer.querySelector('.video_holder');
const video_element = video_holder.querySelector('video');
const video_size = video_holder.querySelector('span.video_dimensions');

const iframe_element = file_viewer.querySelector('iframe');

const list_placeholder = document.querySelector('#placeholder.list_file');
const large_placeholder = document.querySelector('#placeholder.large_file');

const icons = window.FileIcons;

// Global Variables
let id_handle = [];
let path_history = [];
let saved_history = [];
let block_action = false;
let editing_text = false;
let current_folder_access;
let current_file_access;
let current_access;
let active_content_url;

// FileSystem
async function loadFolder(event, origin) {
    try {
        let handle = id_handle[origin] || await window.showDirectoryPicker();
        if (!origin) {
            if (id_handle.length > 0) {
                fullReset();
            }
            id_handle[0] = handle;
            origin = 0;
            createListEntry(handle, 0, 0);
            updatePathHistory(0);
            current_folder_access = handle;
            no_view_root.classList.add('hide');
            no_view_open_folder.classList.remove('hide');
        }

        for await (let entry of handle.values()) {
            if (entry.name.endsWith('.crswap')) { continue; }
            id_handle.push(entry);
            createListEntry(entry, id_handle.length - 1, origin);
            createMainEntry(entry, id_handle.length - 1);
        }
        updateCountAttributes();
    } catch (error) {
        console.error(error);
    }
}

let image_formats = ['jpg', 'jpeg', 'webp', 'gif', 'png', 'apng', 'tiff', 'svg', 'bmp', 'ico'];
let video_formats = ['mp4', 'mov', 'ogg', 'webm', 'flv', 'avi', 'wmv', 'asf'];
let blacklist = ['glb', 'obj', 'mtl'];
async function fileAccess(handle) {
    let format = handle.name.split('.').pop().toLowerCase();
    if (blacklist.includes(format)) { return; }
    let file = await handle.getFile();
    let text = await file.text();
    active_content_url ? URL.revokeObjectURL(active_content_url) : undefined;
    active_content_url = URL.createObjectURL(file);

    if (image_formats.includes(format)) {
        image_element.src = active_content_url;
        text_content.textContent = '';
        file_viewer.classList = 'file_viewer image'
    } else if (video_formats.includes(format)) {
        video_element.src = active_content_url;
        text_content.textContent = '';
        file_viewer.classList = 'file_viewer video';
    } else if (format == 'pdf') {
        iframe_element.src = active_content_url;
        text_content.textContent = '';
        file_viewer.classList = 'file_viewer pdf';
    } else if (format == 'docx') {
        let response = await fetch(active_content_url);
        let buffer = await response.arrayBuffer();
        let result = await mammoth.convertToHtml({ arrayBuffer: buffer });
        iframe_element.contentDocument.body.innerHTML = result.value;
        iframe_element.contentDocument.body.style.overflow = 'auto';
        iframe_element.contentDocument.body.style.backgroundColor = '#1E1E1E';
        iframe_element.contentDocument.body.style.color = 'white';
        file_viewer.classList = 'file_viewer docx';
    } else {
        let blob = file.slice(0, 1024);
        let buffer = await blob.arrayBuffer();
        let decoder = new TextDecoder('utf-8', { fatal: true });
        try {
            decoder.decode(buffer);
        } catch (error) {
            hideCodeMenu();
            return;
        }

        text_content.textContent = text;
        removeHighlightClasses();
        file_viewer.classList = 'file_viewer text';
        text.length <= 51200 ? hljs.highlightElement(text_content) : undefined;
    }

    current_file_access = handle;
    viewer_name.textContent = handle.name;
    viewer_size.textContent = getFileSize(text.length);
    document.body.classList.toggle('mobile_shift', false);
    content.classList.add('shift');
    assignIconImage(handle, viewer_icon);
}

async function updateFile() {
    try {
        let writable = await current_file_access.createWritable();
        await writable.write(text_content.textContent);
        await writable.close();
        removeTextEditable();
    } catch (error) {
        console.error(error);
    }
}

async function renameFile() {
    try {
        let found_name = viewer_name.textContent;
        if (found_name == current_file_access.name) { return; }
        if (fileNameAccept(found_name)) {
            current_file_access.move(found_name);
            viewer_name.blur();
            assignIconImage({ name: found_name }, viewer_icon);

            let found_file_selectors = document.querySelectorAll(`nav.sidebar .list_file[access="${current_access}"], .icon_explorer .large_file[access="${current_access}"]`);
            for (var i = 0; i < found_file_selectors.length; i++) {
                let this_entry = found_file_selectors[i];
                let this_icon = this_entry.querySelector('.icon');
                let this_name = this_entry.querySelector('span');
                assignIconImage({ name: found_name }, this_icon);
                this_name.textContent = found_name;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function newEmptyFile() {
    if (!current_folder_access) { return; }
    try {
        let file_handle = await current_folder_access.getFileHandle('text.txt', { create: true });
        let writable = await file_handle.createWritable();
        current_file_access = file_handle;
        writable.close();

        const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type != 'childList') { continue; }
                let found_target = mutation.target.querySelector('.large_file[name="text.txt"]');
                if (!found_target) { continue; }
                observer.disconnect();
                handleActiveClass({ target: found_target });
            }
        }
        const observe_config = { attributes: true, childList: true, subtree: false };
        const observer = new MutationObserver(callback);
        observer.observe(files, observe_config);

        accessPathHistory(false, current_folder_access.name);
        fileAccess(current_file_access);

    } catch (error) {
        console.error(error);
    }
}

async function deleteFile() {
    if (!current_folder_access || !current_file_access) { return; }
    try {
        await current_folder_access.removeEntry(current_file_access.name);
        current_file_access = null;
        hideCodeMenu();
        accessPathHistory(false, current_folder_access.name);
    } catch (error) {
        console.error(error);
    }
}

// User Interface
function iconSelect(event, force, dontopen) {
    if (block_action && !force) { return; }
    handleActiveClass(event);

    let found_access = event.target.getAttribute('access');
    let handle = id_handle[found_access];
    if (handle instanceof FileSystemDirectoryHandle != true) {
        current_access = parseInt(found_access);
        fileAccess(handle);
        return true;
    }
    if (dontopen) { 
        hideCodeMenu();
        return; 
    }

    current_folder_access = handle;
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

function handleActiveClass(event) {
    let found_name = event.target.getAttribute('name');
    let is_large = event.target.classList.contains('large_file');
    let found_target = is_large ? event.target : file_explorer.querySelector(`.large_file[name="${found_name}"]`);

    let previous_active = document.querySelectorAll(`.large_file.active`);
    for (var i = 0; i < previous_active.length; i++) {
        previous_active[i].classList.remove('active');
    }

    if (found_target) {
        found_target.classList.add('active');
    }
}

function createMainEntry(entry, access, newfile) {
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

function accessPathHistory(event, name) {
    if (block_action) { return; }
    let origin_element = sidebar.querySelector('.list_file[access="0"]');
    let found_name = name || event.target.getAttribute('name');
    let end_index = path_history.indexOf(found_name);
    let access_history = path_history.slice(1, end_index + 1);

    let current_index = 0;
    const callback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type != 'childList') { continue; }
            if (!mutation.target.classList.contains('target_list')) { continue; }
            let found_button = mutation.target.querySelector(`.list_file[name="${access_history[current_index]}"]`);
            if (!found_button) { continue; }
            current_index++;
            setTimeout(function () {
                iconSelect({ target: found_button }, true);
            }, 1);
        }

        if (current_index == access_history.length) {
            observer.disconnect();
            block_action = false;
            content.classList.remove('noshow');
        }
    }

    block_action = true;
    content.classList.add('noshow');
    origin_element.classList.add('expand');
    iconSelect({ target: origin_element }, true);
    const observe_config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(callback);
    observer.observe(sidebar, observe_config);
    iconSelect({ target: origin_element }, true);
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
    iconSelect({ target: page_element }, true);
}

function pathHistoryBack(event) {
    if (event.which && event.which == 8) {
        if (document.activeElement == text_content) {
            return;
        }
    }

    let current_page = path_history[path_history.length - 1];
    let found_index = saved_history.indexOf(current_page);
    let page_before = saved_history[found_index - 1];
    if (!page_before) { return; }

    let page_element = sidebar.querySelector(`.list_file[name="${page_before}"]`);
    iconSelect({ target: page_element }, true);
    iconSelect({ target: page_element }, true);
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
    text_content.setAttribute('contenteditable', 'plaintext-only');
    text_content.textContent = text_content.textContent;
    text_edit.classList.add('active');
}

async function removeTextEditable() {
    editing_text = false;
    if (current_file_access) {
        let found_file = await current_file_access.getFile();
        text_content.textContent = await found_file.text();
    }
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

function handleFileRename(event) {
    let accept = ['insertText', 'insertParagraph', 'deleteContentBackward', 'deleteWordBackward'];
    if (!accept.includes(event.inputType)) {
        event.preventDefault();
        return;
    }

    if (event.inputType == 'insertParagraph') {
        event.preventDefault();
        renameFile();
    }
}

function handleMediaEvents() {
    image_element.onload = function() {
        image_size.textContent = `${image_element.naturalWidth}x${image_element.naturalHeight}`;
    }

    image_element.onerror = function() {
        image_element.src = 'icon/error.svg';
        image_size.textContent = 'Error';
    }

    video_element.onloadeddata = function() {
        video_size.textContent = `${video_element.videoWidth}x${video_element.videoHeight}`;
    }

    video_element.onerror = function() {
        video_element.src = 'icon/error.svg';
        video_size.textContent = 'Error';
    }
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

function handleHorizontalMove(event) {
    let all_files = Array.from(file_explorer.querySelectorAll('.large_file'));
    let target_file = file_explorer.querySelector('.large_file.active');
    let current_index = all_files.indexOf(target_file);
    event.which == 37 ? current_index-- : current_index++;
    current_index < 0 ? current_index = 0 : undefined;
    let new_target = all_files[current_index];
    if (!new_target) { return; }
    iconSelect({target: new_target}, false, true);
    shiftScroll(new_target);
}

function handleVerticalMove(event) {
    let all_files = Array.from(file_explorer.querySelectorAll('.large_file'));
    let target_file = file_explorer.querySelector('.large_file.active');
    if (!target_file) { return; }
    let target_rect = target_file.getBoundingClientRect();
    let current_index = all_files.indexOf(target_file);

    let next_file;
    function checkIndex(i) {
        let found_file = all_files[i];
        let found_rect = found_file.getBoundingClientRect();
        if (target_rect.x == found_rect.x) {
            next_file = found_file;
            return true;
        }
    }
    if (event.which == 38) {
        for (var i = current_index - 1; i >= 0; i--) {
            let check = checkIndex(i);
            if (check) { break; }
        }
    } else if (event.which == 40) {
        for (var i = current_index + 1; i < all_files.length; i++) {
            let check = checkIndex(i);
            if (check) { break; }
        }
    }

    if (!next_file) { return; }
    iconSelect({target: next_file}, false, true);
    shiftScroll(next_file);
}

function shiftScroll(next_file) {
    let explorer_top = file_explorer.scrollTop;
    let explorer_bottom = explorer_top + file_explorer.clientHeight;
    let next_top = next_file.offsetTop;
    let next_bottom = next_top + next_file.clientHeight;

    let before_frame = next_top <= explorer_top;
    let after_frame = next_bottom >= explorer_bottom;

    if (before_frame || after_frame) {
        next_file.scrollIntoView({
            behavior: 'smooth',
            block: before_frame ? 'start' : 'end',
            inline: 'start'
        });
    }
}

function keyboardFolderOpen() {
    let target_file = file_explorer.querySelector('.large_file.active');
    if (!target_file) { return; }
    if (target_file.parentElement != folders) { return; }
    iconSelect({target: target_file});
}

let keymap = {
    37: handleHorizontalMove, 
    39: handleHorizontalMove,
    38: handleVerticalMove,
    40: handleVerticalMove,
    27: hideCodeMenu,
    13: keyboardFolderOpen,
    8: pathHistoryBack
}
let prevent = [37, 38, 39, 40];
function handleKeyDown(event) {
    if (prevent.includes(event.which)) {
        event.preventDefault();
    }

    let found_function = keymap[event.which];
    found_function ? found_function(event) : undefined;
}

function handleResize() {
    let viewer_rect = file_viewer.getBoundingClientRect();
    iframe_element.width = viewer_rect.width;
    iframe_element.height = viewer_rect.height;
}

function checkSystemAccess() {
    if ('showOpenFilePicker' in window != true) {
        no_view_header.textContent = 'Error';
        no_view_error.classList.remove('hide');
        no_view_root.classList.add('hide');
        no_view_open_folder.classList.add('hide');
        header.style.pointerEvents = 'none';
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

function fileNameAccept(name) {
    const unsafe = /[\/\\:*?"<>|\x00-\x1F]/;
    if (typeof name != 'string') { return false; }
    if (name.length == 0 || name.length > 255) { return false; }
    if (name.startsWith(' ') || name.endsWith(' ')) { return false; }
    if (name.startsWith('.') || name.endsWith('.')) { return false; }
    if (unsafe.test(name)) { return false; }
    return true;
}

function fullReset() {
    let all_remove = document.querySelectorAll('.list_file:not([id]), .large_file:not([id]), .target_list');
    for (var i = 0; i < all_remove.length; i++) {
        let this_remove = all_remove[i];
        this_remove.remove();
    }
    id_handle = [];
    path_history = [];
    saved_history = [];
    block_action = false;
    editing_text = false;
    current_file_access = null;
    current_access = null;
    hideCodeMenu();
}

// Initialize
checkSystemAccess();
handleMediaEvents();
handleResize();
open.addEventListener('mouseup', loadFolder);
path_next.addEventListener('mouseup', pathHistoryNext);
path_back.addEventListener('mouseup', pathHistoryBack);
file_new.addEventListener('mouseup', newEmptyFile);
file_delete.addEventListener('mouseup', deleteFile);
no_view_root.addEventListener('mouseup', loadFolder);
sidebar_toggle.addEventListener('mouseup', handleSidebarToggle);
text_close.addEventListener('mouseup', hideCodeMenu);
text_edit.addEventListener('mouseup', assignTextEditable);
text_discard.addEventListener('mouseup', removeTextEditable);
text_save.addEventListener('mouseup', updateFile);
text_content.addEventListener('input', handleEditedText);
viewer_name.addEventListener('beforeinput', handleFileRename);
document.addEventListener('keydown', handleKeyDown);
window.addEventListener('resize', handleResize);