const header = document.querySelector('header');
const open_button = header.querySelector('button.open');
const path_back = header.querySelector('.back');
const path_next = header.querySelector('.next');
const delete_button = header.querySelector('.delete');
const new_button = header.querySelector('.new');

const sidebar = document.querySelector('nav.sidebar');

const content = document.querySelector('.content');
const content_header = content.querySelector('.content_header');
const file_explorer = content.querySelector('.file_explorer');
const folders = file_explorer.querySelector('.segment.folders');
const files = file_explorer.querySelector('.segment.files');

const info_page = content.querySelector('.info_page');
const support_error = info_page.querySelector('.support_error');
const select_error = info_page.querySelector('.select_error');

const file_viewer = content.querySelector('.file_viewer')
const viewer_content = content.querySelector('.viewer_content');
const viewer_iframe = content.querySelector('iframe');

const file_icon = file_viewer.querySelector('.file_icon');
const file_name = file_viewer.querySelector('.file_name');
const file_size = file_viewer.querySelector('.file_size');
const file_edit = file_viewer.querySelector('.edit');
const file_close = file_viewer.querySelector('.close');
const edit_discard = file_viewer.querySelector('.discard');
const edit_save = file_viewer.querySelector('.save');
const editor_frame = file_viewer.querySelector('#editor');

const resize = file_viewer.querySelector('.resize');
const select = document.querySelector('.select');

const list_placeholder = document.querySelector('.placeholder.list_file');
const large_placeholder = document.querySelector('.placeholder.large_file');

let handle_directory = {};
let folder_directory = {};
let current_path = [];
let saved_path = [];
let image_url = [];
let selected_path;
let selected_file;
let active_content_url;

const icons = window.FileIcons;
const editor = ace.edit('editor');
editor.setTheme('ace/theme/dracula');
editor.setOptions({
    fontSize: '14px',
    showPrintMargin: false,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
});
editor.setReadOnly(true);

async function handleFiles(origin, access, current_path) {
    if (origin instanceof FileSystemDirectoryHandle != true) { origin = null; }

    try {
        let handle = origin || await window.showDirectoryPicker();
        if (!access) {
            handle_directory[handle.name] = {};
            access = handle_directory[handle.name];
            current_path = handle.name;
            folder_directory[handle.name] = handle;
        }

        for await (let entry of handle.values()) {
            if (entry.kind == 'directory') {
                let new_path = `${current_path}/${entry.name}`;
                access[entry.name] = {};
                folder_directory[new_path] = entry;
                await handleFiles(entry, access[entry.name], new_path);
            } else {
                access[entry.name] = entry;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function startLoad() {
    await handleFiles();
    let handle_keys = Object.keys(handle_directory);
    let origin_key = handle_keys[0];
    let folder = handle_directory[origin_key].constructor == Object;
    let entry = createListEntry(origin_key, folder, 0);
    iconSelect({ target: entry });
}

async function openFile(path) {
    let handle = stringToObject(path);
    handleFileIcon(file_icon, handle.name);

    let file = await handle.getFile();
    let text = await file.text();
    let format = handle.name.includes('.') ? handle.name.split('.').pop().toLowerCase() : handle.name.toLowerCase();
    active_content_url ? URL.revokeObjectURL(active_content_url) : undefined;
    active_content_url = URL.createObjectURL(file);

    async function loadText() {
        let blob = file.slice(0, 1024);
        let buffer = await blob.arrayBuffer();
        let decoder = new TextDecoder('utf-8', { fatal: true });
        try {
            decoder.decode(buffer);
        } catch (error) {
            handleFileClose();
            return false;
        }

        let key = accept[format.toLowerCase()];
        if (key) {
            editor.session.setMode('ace/mode/' + key.toLowerCase());
        } else {
            editor.session.setMode('ace/mode/plain_text');
        }
        editor.setValue(text, -1);
        viewer_content.classList = 'viewer_content text';
        file_viewer.classList.add('canedit');
        return true;
    }

    async function loadPDF() {
        viewer_iframe.src = active_content_url;
        viewer_content.classList = 'viewer_content document';
    }

    selected_path = path;
    selected_file = handle;
    file_name.textContent = handle.name;
    file_size.textContent = getFileSize(text.length);
    file_viewer.classList.remove('editing');
    if (format == 'pdf') {
        loadPDF();
    } else {
        let istext = await loadText();
        if (!istext) { 
            file_viewer.classList.remove('canedit');
            return; 
        }
    }
    content.classList.add('shift');
}

async function renameFile() {
    let new_name = file_name.textContent;
    if (!fileNameAccept(new_name)) { return; }

    let directory_path = getPreviousPath(selected_path);
    let directory_object = stringToObject(directory_path);
    delete directory_object[selected_file.name];
    directory_object[new_name] = selected_file;

    await selected_file.move(new_name);
    file_name.blur();
    updatePath(directory_path, true);
}

async function deleteFile(path) {
    let directory_path = getPreviousPath(path);
    let parent_directory = stringToObject(directory_path);
    let directory_object = folder_directory[directory_path];
    let file_object = stringToObject(path);
    delete parent_directory[file_object.name];

    await directory_object.removeEntry(file_object.name);
    updatePath(directory_path, true);

    if (file_object == selected_file) {
        handleFileClose();
    }
}

async function editFile() {
    if (!selected_file) { return; }
    let writable = await selected_file.createWritable();
    let found_text = editor.getValue();
    await writable.write(found_text);
    file_size.textContent = getFileSize(found_text.length);
    writable.close();
    handleFileEdit();
}

async function handleNewFile() {
    if (current_path.length == 0) { return; }
    let found_path = current_path.join('/');
    let directory_object = stringToObject(found_path);
    let directory_access = folder_directory[found_path];
    
    let file_handle = await directory_access.getFileHandle('text.txt', { create: true });
    selected_file = file_handle;
    directory_object['text.txt'] = file_handle;

    updatePath(found_path, true);
    let new_path = `${found_path}/text.txt`;
    let found_button = file_explorer.querySelector(`.large_file[path="${new_path}"]`);
    iconSelect({ target: found_button });
}

// Gui
function loadFolder(path) {
    let object = stringToObject(path);
    let sorted_list = getSortedList(path);
    select_error.classList.add('hide');
    if (sorted_list.length == 0) { return; }

    clearLargeIcons();
    for (var i in sorted_list) {
        let key = sorted_list[i];
        let value = object[key];
        let folder = value.constructor == Object;
        createListEntry(path, folder, key);
        createLargeEntry(path, folder, key);
    }
    updatePath(path);

}

function createListEntry(path, folder, next) {
    let new_path = next ? `${path}/${next}` : path;
    let clone = list_placeholder.cloneNode(true);
    let clone_name = clone.querySelector('span');
    let clone_icon = clone.querySelector('.icon');
    clone_name.textContent = new_path.split('/').pop();
    clone.classList.remove('placeholder');
    clone.classList.add(folder ? 'folder' : 'file');
    clone.setAttribute('path', new_path);
    clone.addEventListener('click', iconSelect);
    handleFileIcon(clone_icon, next);

    if (next == 0) {
        clone.classList.add('root');
    }

    let target_list = sidebar.querySelector(`.target_list[path="${path}"]`) || sidebar;
    target_list.appendChild(clone);
    return clone;
}

function createLargeEntry(path, folder, next) {
    let new_path = next ? `${path}/${next}` : path;
    let clone = large_placeholder.cloneNode(true);
    let clone_name = clone.querySelector('span');
    let clone_icon = clone.querySelector('.icon');
    clone_name.textContent = new_path.split('/').pop();
    clone.classList.remove('placeholder');
    clone.classList.add(folder ? 'folder' : 'file');
    clone.setAttribute('path', new_path);
    clone.addEventListener('click', iconSelect);
    handleFileIcon(clone_icon, next);
    if (!folder) {
        createImagePreview(clone, new_path);
    }

    folder ? folders.appendChild(clone) : files.appendChild(clone);
}

let supported = ['jpg', 'jpeg', 'png', 'apng', 'svg', 'ico', 'gif', 'avif', 'webp'];
async function createImagePreview(element, path) {
    let found_span = element.querySelector('span');
    let found_handle = stringToObject(path);
    let file = await found_handle.getFile();
    let format = found_handle.name.includes('.') ? found_handle.name.split('.').pop() : undefined;
    if (!format) { return; }
    if (!supported.includes(format)) { return; }
    
    let pic = new Image();
    let url = URL.createObjectURL(file);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    image_url.push(url);

    pic.onload = function() {
        let new_height = (75 * pic.naturalHeight) / pic.naturalWidth;
        canvas.width = '75';
        canvas.height = `${new_height}`;
        ctx.drawImage(pic, 0, 0, 75, new_height);

        pic.remove();
        element.insertBefore(canvas, found_span);
        element.classList.add('loaded_image');
    }
    pic.onerror = function() {
        pic.remove();
        canvas.remove();
    }
    pic.src = url;
}

function clearLargeIcons() {
    let all_large = file_explorer.querySelectorAll('.large_file');
    for (var i = 0; i < all_large.length; i++) {
        let this_icon = all_large[i];
        this_icon.remove();
    }

    for (var i = 0; i < image_url; i++) {
        let found_url = image_url[i];
        URL.revokeObjectURL(found_url);
    }
    image_url = [];
}

function iconSelect(event) {
    if (!event.target) { return; }
    let path = event.target.getAttribute('path');
    handleActiveClass(path);
    let sidebar_button = event.target;
    let force_open = false;

    if (!event.target.classList.contains('list_file')) {
        sidebar_button = sidebar.querySelector(`.list_file[path="${path}"]`);
        force_open = true;
    }

    if (sidebar_button.classList.contains('file')) {
        openFile(path);
        return;
    }

    let target_list = sidebar_button.parentElement.querySelector(`.target_list[path="${path}"]`);
    if (force_open && target_list) {
        target_list.remove();
    }
    if (!target_list || force_open) {
        target_list = document.createElement('div');
        target_list.classList.add('target_list');
        target_list.setAttribute('path', path);
        sidebar_button.parentElement.insertBefore(target_list, sidebar_button.nextElementSibling);
        loadFolder(path);
    } else {
        target_list.remove();
    }
}

function handleFileIcon(icon, name) {
    if (!name) { return; }
    let icon_parent = icon.parentElement;
    if (icon_parent.classList.contains('folder')) { return; }
    icon.classList = Array.from(icon.classList).shift();
    let class_name = icons.getClassWithColor(name) || 'unknown';

    if (!class_name.includes(' ')) {
        icon.classList.add(class_name);
        return;
    }

    let class_split = class_name.split(' ');
    for (var i = 0; i < class_split.length; i++) {
        let this_class = class_split[i];
        icon.classList.add(this_class)
    }
}

function handleActiveClass(path) {
    let found_button = document.querySelectorAll(`[path="${path}"]`);
    let previous_select = document.querySelectorAll('.active');

    for (var i = 0; i < previous_select.length; i++) {
        let this_button = previous_select[i];
        this_button.classList.remove('active');
    }

    for (var i = 0; i < found_button.length; i++) {
        let this_button = found_button[i];
        this_button.classList.add('active');
    }
}

function handleFileClose() {
    content.classList.remove('shift');
    file_explorer.style.width = "";
}

function clearPath() {
    let all_path_button = content_header.querySelectorAll('.path_button');
    current_path = [];
    for (var i = 0; i < all_path_button.length; i++) {
        let this_button = all_path_button[i];
        this_button.remove();
    }
}

function updatePath(path, clicklast) {
    let path_split = path.includes('/') ? path.split('/') : [path];
    clearPath();
    updatePathHistory();
    for (var i = 0; i < path_split.length; i++) {
        let this_value = path_split[i];
        let path_button = document.createElement('div');
        path_button.setAttribute('path', path_split.slice(0, i + 1).join('/'));
        path_button.classList.add('path_button');
        path_button.textContent = this_value;
        path_button.addEventListener('mouseup', iconSelect);
        content_header.appendChild(path_button);

        current_path.push(this_value);
        if (current_path.length > saved_path.length) {
            saved_path = [...current_path];
        }

        if (i == path_split.length - 1 && clicklast) {
            iconSelect({ target: path_button });
        }
    }
}

function updatePathHistory() {
    for (var i = 0; i < current_path.length; i++) {
        if (saved_path[i] != current_path[i]) {
            saved_path = [...current_path];
        }
    }
}

function handlePathBack() {
    if (current_path.length == 1) { return; }
    current_path.splice(current_path.length - 1, 1);
    updatePath(current_path.join('/'), true);
    handleFileClose();
}

function handlePathNext() {
    let next_path = saved_path[current_path.length];
    if (!next_path) { return; }
    current_path.push(next_path);
    updatePath(current_path.join('/'), true);
    handleFileClose();
}

function handleFileEdit() {
    let editing = file_viewer.classList.contains('editing');
    if (!editing) {
        editor.setReadOnly(false);
        editor_frame.classList.remove('readonly');
    } else {
        editor.setReadOnly(true);
        editor_frame.classList.add('readonly');
    }
    file_viewer.classList.toggle('editing', !editing);
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

function handleDelete() {
    let found_select = file_explorer.querySelectorAll('.active');
    if (found_select.length == 0) { 
        alert('No files selected.');
        return; 
    }
    let check = confirm(`Delete ${found_select.length} file${found_select.length != 1 ? 's' : ''}?`);
    if (!check) { return; }

    for (var i = 0; i < found_select.length; i++) {
        let found_button = found_select[i];
        let path = found_button.getAttribute('path');
        deleteFile(path);
    }
}

function updateFileIcons() {
    let viewer_bounds = file_viewer.getBoundingClientRect();
    file_viewer.classList.toggle('shrink', viewer_bounds.width < 525);
}

function moveTransitionEnd() {
    let viewer_bounds = file_viewer.getBoundingClientRect();
    let frame_width = window.innerWidth - 300;
    let bounds_px = viewer_bounds.width;
    let target_px = frame_width - bounds_px;
    file_explorer.style.width = content.classList.contains('shift') ? ((target_px - 20) / frame_width) * 100 + '%' : '100%';
}

function resizeMove(event) {
    let new_width = window.innerWidth - event.x;
    let max = window.innerWidth - 300;
    let min = 400;
    new_width = new_width > max ? max : new_width;
    new_width = new_width < min ? min : new_width;

    file_viewer.style.width = 100 * (new_width / max) + '%';
    file_explorer.style.width = 100 * (max - new_width - 20) / max + '%';
    file_explorer.classList.toggle('hide_scroll', max - new_width - 20 <= 230);
    updateFileIcons();
}

function startResize() {
    file_viewer.classList.add('dragging');
    document.addEventListener('mousemove', resizeMove);
    document.addEventListener('mouseup', stopResize);
}

function stopResize() {
    file_viewer.classList.remove('dragging');
    document.removeEventListener('mousemove', resizeMove);
    document.removeEventListener('mouseup', stopResize);
}

function findSelected() {
    let bounds = select.getBoundingClientRect();
    let all_button = file_explorer.querySelectorAll('.large_file');

    for (var i = 0; i < all_button.length; i++) {
        let this_button = all_button[i];
        let this_bounds = this_button.getBoundingClientRect();
        if (
            bounds.left < this_bounds.right &&
            bounds.right > this_bounds.left &&
            bounds.top < this_bounds.bottom &&
            bounds.bottom > this_bounds.top
        ) {
            this_button.classList.add('active');
        } else {
            this_button.classList.remove('active');
        }
    }
}

let start_position;
function selectMove(event) {
    let set_position = {
        x: event.x - start_position.x,
        y: event.y - start_position.y
    }
    select.classList.toggle('tx', set_position.x < 0);
    select.classList.toggle('ty', set_position.y < 0);
    select.style.width = Math.abs(set_position.x) + 'px';
    select.style.height = Math.abs(set_position.y) + 'px';
    findSelected();
}

function startSelect(event) {
    if (!start_position) {
        start_position = { x: event.x, y: event.y };
        select.style.left = event.x + 'px';
        select.style.top = event.y + 'px';
        findSelected();
    }

    document.addEventListener('mousemove', selectMove);
    document.addEventListener('mouseup', stopSelect);
}

function stopSelect() {
    document.removeEventListener('mousemove', selectMove);
    document.removeEventListener('mouseup', stopSelect);
    select.style = "";
    start_position = false;
}

function shiftScroll(next) {
    let explorer_top = file_explorer.scrollTop;
    let explorer_bottom = explorer_top + file_explorer.clientHeight;
    let next_top = next.offsetTop;
    let next_bottom = next_top + next.clientHeight;

    let before_frame = next_top <= explorer_top;
    let after_frame = next_bottom >= explorer_bottom;

    if (before_frame || after_frame) {
        next.scrollIntoView({
            behavior: 'smooth',
            block: before_frame ? 'start' : 'end',
            inline: 'start'
        });
    }
}

function handleHorizontalMove(event) {
    if (document.activeElement == file_name) { return; }
    event.preventDefault();

    let all_list = Array.from(file_explorer.querySelectorAll('.large_file'));
    let selected_list = file_explorer.querySelectorAll('.active');
    if (selected_list.length != 1) {
        handleActiveClass(all_list[0].getAttribute('path'));
        return;
    }
    let selected = selected_list[0];
    let found_index = all_list.indexOf(selected);
    found_index = event.which == 37 ? found_index - 1 : found_index + 1;
    let next = all_list[found_index];
    if (!next) { return; }
    let path = next.getAttribute('path');
    shiftScroll(next);
    handleActiveClass(path);
}

function handleVerticalMove(event) {
    if (document.activeElement == file_name) { return; }
    event.preventDefault();

    let all_list = Array.from(file_explorer.querySelectorAll('.large_file'));
    let selected_list = file_explorer.querySelectorAll('.active');
    if (selected_list.length != 1) {
        handleActiveClass(all_list[0].getAttribute('path'));
        return;
    }
    let selected = selected_list[0];
    let selected_bounds = selected.getBoundingClientRect();
    let found_index = all_list.indexOf(selected);

    function checkIndex(i) {
        let found_element = all_list[i];
        let found_path = found_element.getAttribute('path');
        let found_bounds = found_element.getBoundingClientRect();
        if (selected_bounds.x == found_bounds.x) {
            handleActiveClass(found_path);
            shiftScroll(found_element);
            return true;
        }
    }

    if (event.which == 40) {
        for (var i = found_index + 1; i < all_list.length; i++) {
            if (checkIndex(i)) { break; }
        }
    } else {
        for (var i = found_index - 1; i >= 0; i--) {
            if (checkIndex(i)) { break; }
        }
    }
}

function handleBackspace() {
    if (document.activeElement == file_name) { return; }
    let file_open = content.classList.contains('shift');
    if (file_open) {
        handleFileClose();
    } else {
        handlePathBack();
    }
}

function handleEnterKey() {
    let selected_list = file_explorer.querySelectorAll('.active');
    if (selected_list.length != 1) { return; }
    iconSelect({ target: selected_list[0] });
}

function handleSelectAll(event) {
    if (!event.ctrlKey) { return; }
    let all_button = file_explorer.querySelectorAll('.large_file');
    for (var i = 0; i < all_button.length; i++) {
        let this_button = all_button[i];
        this_button.classList.add('active');
    }
}

let keymap = {
    8: handleBackspace,
    13: handleEnterKey,
    32: handleEnterKey,
    27: handleFileClose,
    37: handleHorizontalMove,
    39: handleHorizontalMove,
    38: handleVerticalMove,
    40: handleVerticalMove,
    46: handleDelete,
    65: handleSelectAll
}

function handleKeyMap(event) {
    let found = keymap[event.which];
    found ? found(event) : undefined;
}

// Fetch
function stringToObject(path_string) {
    if (!path_string) { return; }
    if (path_string.includes('/')) {
        let path_split = path_string.split('/');
        let path_object = handle_directory[path_split[0]];
        for (var i = 1; i < path_split.length; i++) {
            path_object = path_object[path_split[i]];
        }
        return path_object;
    } else {
        return handle_directory[path_string];
    }
}

function getPreviousPath(path_string) {
    let path_split = path_string.split('/');
    path_split.pop();
    return path_split.join('/');
}

function getSortedList(path_string) {
    let object = stringToObject(path_string);
    let folder_keys = [];
    let file_keys = [];

    for (var i in object) {
        let value = object[i];
        if (value.constructor == Object) {
            folder_keys.push(i);
        } else {
            file_keys.push(i);
        }
    }
    folder_keys.sort();
    file_keys.sort();

    return [...folder_keys, ...file_keys];
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

function checkSupport() {
    let support = 'showOpenFilePicker' in self;
    if (support) { return; }
    support_error.classList.remove('hide');
    select_error.classList.add('hide');
    document.body.style.pointerEvents = 'none';
}

checkSupport();
updateFileIcons();
open_button.addEventListener('mouseup', startLoad);
path_back.addEventListener('mouseup', handlePathBack);
path_next.addEventListener('mouseup', handlePathNext);
delete_button.addEventListener('mouseup', handleDelete);
new_button.addEventListener('mouseup', handleNewFile);
file_name.addEventListener('beforeinput', handleFileRename);
file_close.addEventListener('mouseup', handleFileClose);
file_edit.addEventListener('mouseup', handleFileEdit);
edit_discard.addEventListener('mouseup', handleFileEdit);
edit_save.addEventListener('mouseup', editFile);
resize.addEventListener('mousedown', startResize);
file_explorer.addEventListener('mousedown', startSelect);
file_viewer.addEventListener('transitionend', moveTransitionEnd);
document.addEventListener('keydown', handleKeyMap);
window.addEventListener('onresize', updateFileIcons);
window.addEventListener('onresize', moveTransitionEnd);