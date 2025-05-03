const header = document.querySelector('header');
const open_button = header.querySelector('button.open');
const path_back = header.querySelector('.back');
const path_next = header.querySelector('.next');
const cut_button = header.querySelector('.cut');
const copy_button = header.querySelector('.copy');
const paste_button = header.querySelector('.paste');
const delete_button = header.querySelector('.delete');
const new_folder = header.querySelector('.new_folder');
const new_file = header.querySelector('.new_file');

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
const media_holder = content.querySelector('.media .media_holder');
const media_info = content.querySelector('.media .media_info');

const nes_holder = content.querySelector('.nes_emulator');
const nes_canvas = nes_holder.querySelector('canvas');

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

const right_menu = document.querySelector('.right_menu');
const right_new_folder = right_menu.querySelector('.new_folder');
const right_new_file = right_menu.querySelector('.new_file');
const right_cut = right_menu.querySelector('button.cut');
const right_copy = right_menu.querySelector('button.copy');
const right_paste = right_menu.querySelector('button.paste');
const right_delete = right_menu.querySelector('button.delete');

const list_placeholder = document.querySelector('.placeholder.list_file');
const large_placeholder = document.querySelector('.placeholder.large_file');

const notification_holder = document.querySelector('.notification_holder');
const notify_placeholder = document.querySelector('.placeholder.notify');

let handle_directory = {};
let folder_directory = {};
let current_path = [];
let saved_path = [];
let image_url = [];

let copied_directory = [];
let copied_data = {};
let cutting = false;

let selected_path;
let selected_file;
let active_content_url;
let active_emulator;

// Media
let supported = ['jpg', 'jpeg', 'png', 'apng', 'svg', 'ico', 'gif', 'avif', 'webp', 'heic', 'heif', 'mp4', 'mov', 'mkv'];
let heic = ['heic', 'heif'];
let video = ['mp4', 'mov', 'mkv', 'avi', 'webm', 'ogv', 'flv', '3gp'];
let keyframe = ['mp4', 'mov', 'webm', 'flv', '3pg'];

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

let load_count = 0;
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
                load_count++;
                updateLoadNotification(load_count);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function startLoad() {
    startLoadNotification();
    await handleFiles();
    stopLoadNotification();
    load_count = 0;
    let handle_keys = Object.keys(handle_directory);
    let origin_key = handle_keys[0];
    let folder = handle_directory[origin_key].constructor == Object;
    let entry = createListEntry(origin_key, folder, 0);
    iconSelect({ target: entry });
}

async function openFile(path) {
    let target_button = file_explorer.querySelector(`.large_file[path="${path}"]`);
    target_button.classList.add('loading');

    let handle = stringToObject(path);
    handleFileIcon(file_icon, handle.name);

    let file = await handle.getFile();
    let format = handle.name.includes('.') ? handle.name.split('.').pop().toLowerCase() : handle.name.toLowerCase();
    active_content_url ? URL.revokeObjectURL(active_content_url) : undefined;
    active_content_url = URL.createObjectURL(file);

    async function loadText() {
        let text = await file.text();
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

    function loadPDF() {
        viewer_iframe.src = active_content_url;
        viewer_content.classList = 'viewer_content document';
    }

    async function loadNES() {
        let buffer = await file.arrayBuffer();
        try {
            if (active_emulator) { nesCleanup(active_emulator); }
            let nes = new NesJs.Nes();
            nes.setRom(new NesJs.Rom(buffer));
            nes.setDisplay(new NesJs.Display(nes_canvas));
            nes.setAudio(new NesJs.Audio());
            active_emulator = nes;

            function nesKeyDown(event) {
                nes.handleKeyDown(event);
                nesCleanup(nes);
            }

            function nesKeyUp(event) {
                nes.handleKeyUp(event);
                nesCleanup(nes);
            }

            function nesCleanup(nes_object) {
                if (selected_file != handle) {
                    document.removeEventListener('keydown', nesKeyDown);
                    document.removeEventListener('keyup', nesKeyUp);
                    nes_object.setDisplay(null);
                    nes_object.setAudio(null);
                    nes_object = null;
                }
            }

            document.addEventListener('keydown', nesKeyDown);
            document.addEventListener('keyup', nesKeyUp);
            nes.bootup();
            nes.run();
            nes_canvas.focus();
            viewer_content.classList = 'viewer_content nes';
            
            return true;
        } catch (error) {
            sendNotification(3000, error + ' (Unsupported NES format)', 'error');
            handleFileClose();
            target_button.classList.remove('loading');
            return false;
        }
    }

    function loadMedia() {
        let properties = ['duration', 'videoWidth', 'videoHeight', 'naturalWidth', 'naturalHeight'];
        let is_video = video.includes(format);
        let new_media = document.createElement(is_video ? 'video' : 'img');
        media_holder.querySelector('img, video')?.remove();
        if (is_video) {
            new_media.muted = true;
            new_media.autoplay = true;
        }

        async function mediaLoaded() {
            let new_width = is_video ? new_media.videoWidth : new_media.naturalWidth;
            let new_height = is_video ? new_media.videoHeight : new_media.naturalHeight;
            new_media.aspectRatio = new_width / new_height;

            let all_properties = media_info.querySelectorAll('span');
            for (var i = 0; i < all_properties.length; i++) {
                let this_span = all_properties[i];
                this_span.remove();
            }

            for (var i = 0; i < properties.length; i++) {
                let this_property = properties[i];
                let found_value = new_media[this_property];
                if (!found_value) { continue; }
                let entry = document.createElement('span');
                entry.textContent = `${this_property}: ${found_value}`;
                media_info.appendChild(entry);
            }

            media_holder.appendChild(new_media);
            await createImagePreview(target_button, true);
            target_button.classList.remove('loading');
        }

        new_media.addEventListener(is_video ? 'loadeddata' : 'load', mediaLoaded, { once: true });
        new_media.src = active_content_url;
        viewer_content.classList = 'viewer_content media';
    }

    selected_path = path;
    selected_file = handle;
    file_viewer.classList.remove('editing');
    if (format == 'pdf') {
        await loadPDF();
    } else if (supported.includes(format)) {
        await loadMedia();
    } else if (format == 'nes') {
        let loaded_rom = await loadNES();
        if (!loaded_rom) { return; }
    } else {
        let istext = await loadText();
        if (!istext) {
            file_viewer.classList.remove('canedit');
            return;
        }
    }
    let text = await file.text();
    target_button.classList.remove('loading');
    content.classList.add('shift');
    file_name.textContent = handle.name;
    file_size.textContent = getFileSize(text.length);
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

async function deleteFile(path, dontupdate) {
    let parent_directory = getPreviousPath(path);
    let parent_object = stringToObject(parent_directory);
    let file_name = path.includes('/') ? path.split('/').pop() : path;
    let file_object = stringToObject(path);

    if (file_object.constructor == Object) {
        file_object = folder_directory[path];
        await file_object.remove({ recursive: true });
        delete folder_directory[path];
    } else {
        await file_object.remove();
    }
    delete parent_object[file_name];

    if (dontupdate) { return; }
    updatePath(parent_directory, true);
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

async function handleNewFolder() {
    forceCloseRightClick();
    if (current_path.length == 0) { return; }
    let found_path = current_path.join('/');
    let parent_object = stringToObject(found_path);
    let parent_handle = folder_directory[found_path];
    let new_handle = await parent_handle.getDirectoryHandle('New Folder', { create: true });
    let new_path = `${found_path}/${'New Folder'}`;
    parent_object['New Folder'] = {};
    folder_directory[new_path] = await new_handle;

    updatePath(found_path, true)
    let found_button = file_explorer.querySelector(`.large_file[path="${new_path}"]`);
    handleActiveClass({ target: found_button });
}

async function handleNewFile() {
    forceCloseRightClick();
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

async function copyFiles() {
    let all_selected = file_explorer.querySelectorAll('.active');
    let found_path = current_path.join('/');
    let directory_object = stringToObject(found_path);

    copied_data = {};
    copied_directory = [...current_path];
    for (var i = 0; i < all_selected.length; i++) {
        let found_button = all_selected[i];
        let handle_path = found_button.getAttribute('path');
        let handle_name = handle_path.includes('/') ? handle_path.split('/').pop() : handle_path;
        let handle = directory_object[handle_name];
        copied_data[handle_name] = handle;
    }

    header.classList.toggle('showpaste', all_selected.length > 0);
}

let pasted_count = 0;
async function pasteFiles(inner_path = []) {
    let found_directory = copied_data;
    let updated_path = [...current_path, ...inner_path].join('/');
    let directory_now = folder_directory[updated_path];
    let directory_now_object = stringToObject(updated_path);

    // finds the target subfolder from the root directory
    for (var i = 0; i < inner_path.length; i++) {
        let folder_name = inner_path[i];
        found_directory = found_directory[folder_name];
    }

    for (var i in found_directory) {
        let entry = found_directory[i];
        // check if the entry is a file or folder
        if (entry.constructor == Object) {
            let create_directory = await directory_now.getDirectoryHandle(i, { create: true });
            let added_path = [...inner_path, i];
            let outer_path = [...current_path, ...inner_path, i];
            folder_directory[outer_path.join('/')] = create_directory;
            directory_now_object[i] = {};
            await pasteFiles(added_path);
            // call the function itself again to fill the newly created subfolder
            // sends back the new subfolder as paramater
        } else {
            let file = await entry.getFile();
            let buffer = await file.arrayBuffer();
            let new_handle = await directory_now.getFileHandle(i, { create: true });
            let writable = await new_handle.createWritable();
            await writable.write(buffer);
            await writable.close();
            directory_now_object[i] = new_handle;
            pasted_count++;
            updateLoadNotification(pasted_count);
        }
    }
}

async function deleteCopyDirectory() {
    try {
        for (const name in copied_data) {
            const file_path = [...copied_directory, name].join('/');
            await deleteFile(file_path, true); // Pass true to skip UI update
            const previous_button = sidebar.querySelector(`[path="${file_path}"]`);
            if (previous_button) {
                previous_button.remove();
            }
        }
        copied_data = {};
        cutting = false;
    } catch (e) {
        console.error('Failed to delete copied directory:', e);
    }
}

// Gui
let root_folder_blacklist = ['System Volume Information', 'Recovery', '$RECYCLE.BIN', '.Trash-1000'];
function loadFolder(path) {
    let object = stringToObject(path);
    let sorted_list = getSortedList(path);
    select_error.classList.add('hide');

    clearLargeIcons();
    for (var i in sorted_list) {
        let key = sorted_list[i];
        let value = object[key];
        let folder = value.constructor == Object;
        if (!path.includes('/') && root_folder_blacklist.includes(key)) { continue; }
        if (key[0] == '.') { continue; }
        createListEntry(path, folder, key);
        createLargeEntry(path, folder, key);
    }
    updatePath(path);
    handleImagePreviews();

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

    if (next && next.includes('.')) {
        clone.classList.add(next.split('.').pop());
    }

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
    folder ? folders.appendChild(clone) : files.appendChild(clone);

    if (next && next.includes('.')) {
        clone.classList.add(next.split('.').pop());
    }

    if (cutting && path == copied_directory.join('/')) {
        if (copied_data[next]) {
            clone.classList.add('cut');
        }
    }
}

async function handleImagePreviews() {
    let current_elements = file_explorer.querySelectorAll('.large_file');
    let original_path = [...current_path];
    for (var i = 0; i < current_elements.length; i++) {
        if (JSON.stringify(original_path) != JSON.stringify(current_path)) {
            handleCacheURL();
            break;
        }
        let this_element = current_elements[i];
        let this_path = this_element.getAttribute('path');
        await createImagePreview(this_element);
        // use await to slow this down
    }
}

async function createImagePreview(element, force) {
    if (element.classList.contains('loaded_image')) { return; }
    let path = element.getAttribute('path');
    let found_span = element.querySelector('span');
    let found_handle = stringToObject(path);
    if (found_handle.constructor == Object) { return; }

    let format = found_handle.name.includes('.')
        ? found_handle.name.split('.').pop().toLowerCase()
        : undefined;

    if (!format || !supported.includes(format)) { return; }
    if (!supported.includes(format)) { return; }
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let file = await found_handle.getFile();

    let blob = !heic.includes(format)
        ? file
        : await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.2 });

    if (!force && blob.size > 5 * 1024 * 1024) {
        return;
    } else {
        element.classList.add('loading');
    }

    try {
        let bitmap = await createImageBitmap(blob);
        let target_size = { width: 75, height: Math.round((bitmap.height / bitmap.width) * 75) };
        canvas.width = target_size.width;
        canvas.height = target_size.height;
        ctx.drawImage(bitmap, 0, 0, target_size.width, target_size.height);
        bitmap.close();
        element.insertBefore(canvas, found_span);
        element.classList.add('loaded_image');
    } catch (error) {
        !video.includes(format)
            ? imagePreviewFallback(element, canvas, blob)
            : videoPreviewFallback(element, canvas, file, format);
        delete blob;
    } finally {
        element.classList.remove('loading');
    }
}

function imagePreviewFallback(element, canvas, blob) {
    let found_span = element.querySelector('span');
    let ctx = canvas.getContext('2d');
    let img = new Image();

    img.onload = function () {
        let target_size = { width: 75, height: Math.round((img.naturalHeight / img.naturalWidth) * 75) };
        canvas.width = target_size.width;
        canvas.height = target_size.height;
        ctx.drawImage(img, 0, 0, target_size.width, target_size.height);
        element.insertBefore(canvas, found_span); // is this oops
        element.classList.add('loaded_image');
        img.remove();
    }

    img.onerror = function () {
        canvas.remove();
        img.remove();
    }

    let object_url = URL.createObjectURL(blob);
    image_url.push(object_url);
    img.src = object_url;
}

async function videoPreviewFallback(element, canvas, blob) {
    let ctx = canvas.getContext('2d');
    let found_span = element.querySelector('span');
    let video_element = document.createElement('video');
    let target_url = URL.createObjectURL(blob);
    let target_size = { width: 100, height: 100 };
    video_element.preload = 'metadata';
    image_url.push(target_url);

    function loadedMetadata() {
        target_size = { width: 100, height: (video_element.videoHeight / video_element.videoWidth) * 100 }
        canvas.width = target_size.width * 2;
        canvas.height = target_size.height * 2;
        canvas.style.width = target_size.width + 'px';
        canvas.style.height = target_size.height + 'px';
        canvas.style.aspectRatio = target_size.width / target_size.height;
        video_element.currentTime = video_element.duration / 2;
        video_element.requestVideoFrameCallback(frameLoaded);
    }

    function frameLoaded() {
        if (!video_element) { return; }
        ctx.drawImage(video_element, 0, 0, target_size.width * 2, target_size.height * 2);
        element.insertBefore(canvas, found_span);
        element.classList.add('loaded_image');
        cleanup();
    }

    function cleanup() {
        URL.revokeObjectURL(target_url);
        video_element.remove();
    }

    video_element.addEventListener('loadedmetadata', loadedMetadata, { once: true });
    video_element.addEventListener('error', cleanup, { once: true });
    video_element.src = target_url;
}

function clearLargeIcons() {
    let all_large = file_explorer.querySelectorAll('.large_file');
    for (var i = 0; i < all_large.length; i++) {
        let this_icon = all_large[i];
        this_icon.remove();
    }
    handleCacheURL();
}

function handleCacheURL() {
    for (var i = 0; i < image_url; i++) {
        let found_url = image_url[i];
        URL.revokeObjectURL(found_url);
    }
    image_url = [];
}

function iconSelect(event) {
    if (!event.target) { return; }
    let path = event.target.getAttribute('path');
    if (path == selected_path) { return; }
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
    updateHeaderClasses();
}

function handleFileClose() {
    selected_file = null;
    selected_path = null;
    media_holder.querySelector('img, video')?.remove();
    content.classList.remove('shift');
    file_explorer.style.width = "";
    updateHeaderClasses();
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
        updateHeaderClasses();
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
    if (current_path.length <= 1) { return; }
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

function handleFileEdit(event) {
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
        sendNotification(2000, 'Renamed file', 'rename');
    }
}

async function handleDelete() {
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

    let batch_file_size = await getBatchFileCount(found_select);
    sendNotification(2000, `Deleting ${batch_file_size} file${batch_file_size != 1 ? 's' : ''}...`, 'delete');
    forceCloseRightClick();
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
    updateHeaderClasses();
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
    if (event.which == 3) { return; }
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

function updateHeaderClasses() {
    let select_bool = file_explorer.querySelectorAll('.active').length > 0;
    let select_hide = [cut_button, copy_button, paste_button, delete_button];
    for (var i = 0; i < select_hide.length; i++) {
        let this_button = select_hide[i];
        this_button.classList.toggle('hide', !select_bool);
    }
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
    updateHeaderClasses();
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
    if (file_viewer.contains(document.activeElement)) { return; }
    if (!event.ctrlKey) { return; }
    let all_button = file_explorer.querySelectorAll('.large_file');
    for (var i = 0; i < all_button.length; i++) {
        let this_button = all_button[i];
        this_button.classList.add('active');
    }
    updateHeaderClasses();
}

function handleCopy(event) {
    let accept_button = [copy_button, right_copy];
    if (!event.ctrlKey && !accept_button.includes(event.target)) { return; }
    copyFiles();
    forceCloseRightClick();
}

async function handlePaste(event) {
    let accept_button = [paste_button, right_paste];
    if (!event.ctrlKey && !accept_button.includes(event.target)) { return; }
    forceCloseRightClick();
    startLoadNotification();
    updateLoadNotification(0);
    await pasteFiles();
    stopLoadNotification();
    pasted_count = 0;

    if (cutting) {
        await deleteCopyDirectory();
    }
    updatePath(current_path.join('/'), true);
}

function handleCut(event) {
    let accept_button = [cut_button, right_cut];
    if (!event.ctrlKey && !accept_button.includes(event.target)) { return; }
    cutting = true;
    copyFiles();
    forceCloseRightClick();

    let all_select = file_explorer.querySelectorAll('.active');
    let all_previous_cut = file_explorer.querySelectorAll('.cut');

    for (var i = 0; i < all_previous_cut.length; i++) {
        let this_icon = all_previous_cut[i];
        this_icon.classList.remove('cut');
    }

    for (var i = 0; i < all_select.length; i++) {
        let this_icon = all_select[i];
        this_icon.classList.add('cut');
    }
}

function handleRightClick(event) {
    event.preventDefault();
    right_menu.classList.toggle('show');
    right_menu.style.left = event.x + 'px';
    right_menu.style.top = event.y + 'px';

    if (event.target.classList.contains('large_file')) {
        if (!event.target.classList.contains('active')) {
            let target_path = event.target.getAttribute('path');
            handleActiveClass(target_path);
        }
    }
}

function forceCloseRightClick(event) {
    if (event && (right_menu == event.target || right_menu.contains(event.target))) { return; }
    right_menu.classList.remove('show');
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
    65: handleSelectAll,
    67: handleCopy,
    86: handlePaste,
    88: handleCut
}

function handleKeyMap(event) {
    if (document.activeElement == file_viewer || file_viewer.contains(document.activeElement)) { return; }
    let found = keymap[event.which];
    found ? found(event) : undefined;
}

function sendNotification(ms, text, addclass) {
    let notify = notify_placeholder.cloneNode(true);
    let span = notify.querySelector('span.text');
    notify.classList.remove('placeholder');
    notification_holder.appendChild(notify);

    if (ms && text) {
        span.textContent = text;
        setTimeout(function () {
            notify.remove();
        }, ms);
    }
    if (addclass) {
        notify.classList.add(addclass);
    }
    return notify;
}

function startLoadNotification() {
    let notify = notification_holder.querySelector('.notify.loader') || sendNotification();
    notify.classList.add('loader');
    notify.classList.remove('hide');
}

function updateLoadNotification(value) {
    let notify = notification_holder.querySelector('.notify.loader');
    let notify_text = notify.querySelector('span.text');
    let ending = value == load_count ? 'loaded' : 'copied';
    ending = cutting ? 'moved' : ending;
    notify_text.textContent = `${value} files ${ending}`;
}

function stopLoadNotification() {
    let notify = notification_holder.querySelector('.notify.loader');
    notify.classList.add('hide');
}

function focusViewer() {
    if (viewer_content.classList.contains('nes')) {
        nes_canvas.focus();
        return;
    }
    file_viewer.focus();
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

async function getFileCount(path_string) {
    let count = 0;
    let path_object = stringToObject(path_string);
    if (path_object.constructor != Object) {
        return 1;
    }

    for (var i in path_object) {
        let directory_handle = path_object[i];
        if (directory_handle.constructor == Object) {
            count += await getFileCount(`${path_string}/${i}`);
        } else {
            count++;
        }
    }

    return count;
}

async function getBatchFileCount(array) {
    let count = 0;
    for (var i = 0; i < array.length; i++) {
        let this_element = array[i];
        let this_path = this_element.getAttribute('path');
        count += await getFileCount(this_path);
    }
    return count;
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
cut_button.addEventListener('mouseup', handleCut);
copy_button.addEventListener('mouseup', handleCopy);
paste_button.addEventListener('mouseup', handlePaste);
delete_button.addEventListener('mouseup', handleDelete);
new_folder.addEventListener('mouseup', handleNewFolder);
new_file.addEventListener('mouseup', handleNewFile);
file_name.addEventListener('beforeinput', handleFileRename);
file_close.addEventListener('mouseup', handleFileClose);
file_edit.addEventListener('mouseup', handleFileEdit);
edit_discard.addEventListener('mouseup', handleFileEdit);
edit_save.addEventListener('mouseup', editFile);
resize.addEventListener('mousedown', startResize);
file_explorer.addEventListener('mousedown', startSelect);
file_viewer.addEventListener('transitionend', moveTransitionEnd);
file_viewer.addEventListener('mousedown', focusViewer);
right_new_folder.addEventListener('mouseup', handleNewFolder);
right_new_file.addEventListener('mouseup', handleNewFile);
right_cut.addEventListener('mouseup', handleCut);
right_copy.addEventListener('mouseup', handleCopy);
right_paste.addEventListener('mouseup', handlePaste);
right_delete.addEventListener('mouseup', handleDelete);
document.addEventListener('keydown', handleKeyMap);
document.addEventListener('contextmenu', handleRightClick);
document.addEventListener('mousedown', forceCloseRightClick);
window.addEventListener('onresize', updateFileIcons);
window.addEventListener('onresize', moveTransitionEnd);