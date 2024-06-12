const content_holder = document.querySelector('.content');
const sidebar = document.querySelector('.sidebar');

const make_text = document.querySelector('.element.textbox');
const make_image = document.querySelector('.element.image');
const make_embed = document.querySelector('.element.embed');
const make_link = document.querySelector('.embed.link');

const image_edit_div = document.querySelector('.image_edit_holder');
const image_edit_header = document.querySelector('.type_header.image');
const image_url_input = document.querySelector('.url_box');
const image_width_input = document.querySelector('.image_width');
const image_height_input = document.querySelector('.image_height');
const image_shift_left = document.querySelector('.shift_left');
const image_shift_center = document.querySelector('.shift_center');
const image_shift_right = document.querySelector('.shift_right');

const text_edit_div = document.querySelector('.text_edit_holder');
const text_edit_header = document.querySelector('.type_header.text');
const text_edit_box = document.querySelector('.text_edit');
const text_color_container = document.querySelector('.color');
const text_color_input = document.querySelector('.text_color_input');
const size_holder = document.querySelector('.size_holder');
const size_header = size_holder.querySelector('.header');
const size_subheader = size_holder.querySelector('.subheader');
const size_body = size_holder.querySelector('.body');

const backgrounds = ['wave.jpg'];

let active_edit;

let default_css = {
    'content_block': {
        'width': '100%',
        'height': '300px',
        'backgroundColor': 'black',
        'position': 'relative'
    },

    'custom_block': {
        'width': '100%',
        'min-height': '50px',
        'height': 'fit-content',
        'backgroundColor': 'white',
        'position': 'relative',
        'background-color': '#303030'
    },

    'text': {
        'margin-left': 'auto',
        'margin-right': 'auto',
        'display': 'flex',
        'align-items': 'center',
        'width': '80%',
        'min-height': '40px',
        'height': 'fit-content',
        'color': 'white',
        'padding-left': '5px',
        'padding-right': '5px',
        'color': 'rgba(255, 255, 255, 0.7)',
    },

    'image': {
        'height': '200px',
        'width': '200px',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'bottom',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': '80%',
        'background-image': 'url(icon/image.svg)',
    },

    'title': {
        'width': '60%',
        'height': '60px',
        'display': 'block',
        'position': 'absolute',
        'left': '50%',
        'top': '50%',
        'transform': 'translate(-50%, -50%)'
    }
}

function createContentBlock(style, bg) {
    let block = document.createElement('div');
    applyDefaults(block, default_css[style]);
    content_holder.appendChild(block);

    if (bg) {
        block.style.backgroundImage = getRandomBackground();
        createPageTitle(block);
    }
    return block;
}

function createText(element) {
    let textbox = document.createElement('span');
    textbox.classList.add('edit');
    textbox.innerHTML = 'Add some text...';
    textbox.onclick = editText;
    applyDefaults(textbox, default_css['text']);
    element.appendChild(textbox);
}

function createImage(element) {
    let image_holder = document.createElement('div');
    image_holder.classList.add('edit');
    image_holder.onclick = editImage;
    applyDefaults(image_holder, default_css['image'])
    element.appendChild(image_holder);
}

function editText(event) {
    unfocus();
    event.target.classList.add('active');
    showTextEditor(true);
    active_edit = event.target;
}

function editImage(event) {
    event.target.classList.add('active');
    showImageEditor(true);
    active_edit = event.target;
}

function updateImageSize(event) {
    if (!active_edit) { return false };
    let classToStyle = {
        'image_width': 'width',
        'image_height': 'height',
    }
    let update_style = classToStyle[event.target.classList[0]];
    if (!update_style) { return false };
    active_edit.style[update_style] = event.target.value + 'px';
}

function updateImageShift(event) {
    if (!active_edit) { return false };
    let classToSet = {
        'shift_left': 'flex-start',
        'shift_center': 'center',
        'shift_right': 'flex-end'
    }
    let update_style = classToSet[event.target.classList[0]];
    if (!update_style) { return false };
    active_edit.parentElement.style.justifyContent = update_style;
}

function updateText() {
    if (!active_edit) { return false };
    let set_text = text_edit_box.value.replace(/\n/g, '<br>');
    active_edit.innerHTML = set_text;
}

function updateTextColor() {
    let set_color = text_color_input.value;
    if (!active_edit) { return false };
    text_color_container.style.backgroundColor = set_color;
    active_edit.style.color = set_color;
}

function updateTextSize(event) {
    if (!active_edit) { return false };
    let class_to_size = {
        'header': '3rem',
        'subheader': '2rem',
        'body': '1rem',
    }
    let set_px = class_to_size[event.target.classList[0]];
    if (!set_px) { return false };
    active_edit.style.fontSize = set_px;
}

function createPageTitle(element) {
    let title = document.createElement('span');
    title.classList.add('edit');
    title.style.textAlign = 'center';
    title.style.fontSize = '3rem';
    title.style.fontWeight = 900;
    title.style.minHeight = '100px';
    title.style.height = 'fit-content';
    applyDefaults(title, default_css['title']);
    element.appendChild(title);
    title.addEventListener('mouseup', editText);
}

function applyDefaults(element, dictionary) {
    for (var i in dictionary) {
        element.style[i] = dictionary[i];
    }
}

function getRandomBackground() {
    let random_number = Math.floor(Math.random() * backgrounds.length);
    let bg = backgrounds[random_number];
    return `url(large_img/${bg})`;
}

function showTextEditor(value) {
    if (!value) {
        text_edit_div.classList.add('hide');
        text_edit_header.classList.add('hide');
    } else {
        text_edit_div.classList.remove('hide');
        text_edit_header.classList.remove('hide');
    }
}

function showImageEditor(value) {
    if (!value) {
        image_edit_div.classList.add('hide');
        image_edit_header.classList.add('hide');
    } else {
        image_edit_div.classList.remove('hide');
        image_edit_header.classList.remove('hide');
    }
}

function addTextBox() {
    let custom_block = createContentBlock('custom_block');
    createText(custom_block);
}

function addImageBox() {
    let custom_block = createContentBlock('custom_block');
    custom_block.style.display = 'flex';
    createImage(custom_block);
}

function unfocus() {
    if (!active_edit) { return false };
    active_edit.classList.remove('active');
    active_edit = null;
    showTextEditor(false);
    showImageEditor(false);
}

function handleMouseClick(event) {
    if (!event.target) { return false };
    if (!active_edit) { return false };
    if (event.target == active_edit) { return false };
    if (sidebar.contains(event.target)) { return false };
    unfocus();
}

function handleKeyDown(event) {
    if (event.which == 13) {
        if (document.activeElement != image_url_input) { return false };
        image_url_input.blur();
        if (image_url_input.value.substring(0, 4) != 'http') { return false };
        active_edit.style.backgroundImage = `url(${image_url_input.value})`;
        active_edit.style.backgroundSize = 'cover';
        active_edit.style.border = 0;
    }
}

createContentBlock('content_block', true);
make_text.addEventListener('mouseup', addTextBox);
make_image.addEventListener('mouseup', addImageBox);
image_width_input.addEventListener('input', updateImageSize);
image_height_input.addEventListener('input', updateImageSize);
image_shift_left.addEventListener('mouseup', updateImageShift);
image_shift_center.addEventListener('mouseup', updateImageShift);
image_shift_right.addEventListener('mouseup', updateImageShift);
text_edit_box.addEventListener('input', updateText);
text_color_input.addEventListener('input', updateTextColor);
size_header.addEventListener('mouseup', updateTextSize);
size_subheader.addEventListener('mouseup', updateTextSize);
size_body.addEventListener('mouseup', updateTextSize);
document.addEventListener('mouseup', handleMouseClick);
document.addEventListener('keydown', handleKeyDown);