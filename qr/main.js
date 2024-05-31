const result_div = document.querySelector('.result');
const qr_canvas = document.querySelector('.qr_canvas');
const url_input = document.querySelector('.url');
const url_text = document.querySelector('.url_text');
const submit = document.querySelector('.submit');
const clipboard = document.querySelector('.clipboard');
const file = document.querySelector('.file');
const background_color = document.querySelector('#background input');
const foreground_color = document.querySelector('#foreground input');
const bg_color_text = document.querySelector('.color_text.background');
const fg_color_text = document.querySelector('.color_text.foreground')

let qrOptions = {
    type: 'image/png',
    margin: 3,
    color: {
        dark: '#000000ff',
        light: '#ffffffff'
    }
}

function makeQR(event, text) {
    if (!text) {
        text = url_input.value;
    }

    QRCode.toCanvas(qr_canvas, text, qrOptions, (error, canvas) => {
        if (error) {
            url_input.classList.add('error');
            url_text.classList.add('error');
            url_text.innerHTML = error;
            console.log(error);
            return;
        } else {
            url_input.classList.remove('error');
            url_text.classList.remove('error');
            url_text.innerHTML = 'Website URL';
        }
    });
    handleResize();
}

function writeClipboard() {
    qr_canvas.toBlob(function(blob) {
        const item = new ClipboardItem({"image/png": blob});
        navigator.clipboard.write([item]);
    });
}

function writeFile() {
    qr_canvas.toBlob(function(blob) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'qr.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}

function keyListener(event) {
    if (event.which == 13) {
        event.preventDefault();
        if (document.activeElement = url_input) {
            makeQR();
        }
    }
}

function handleResize() {
    let result_rect = result_div.getBoundingClientRect();
    qr_canvas.style.width = result_rect.width - 20 + 'px';
    qr_canvas.style.height = result_rect.width - 20 + 'px';
}

function colorSelect(event) {
    event.target.parentElement.parentElement.querySelector('textarea').value = event.target.value;
    if (event.target.parentElement.id == 'background') {
        qrOptions.color.light = event.target.value;
        event.target.parentElement.style.backgroundColor = event.target.value;
    } else if (event.target.parentElement.id = 'foreground') {
        qrOptions.color.dark = event.target.value;
        event.target.parentElement.style.backgroundColor = event.target.value;
    }

    if (url_input.value.length == 0) {
        makeQR(null, 'https://www.kircic.org/discord.html');
    } else {
        makeQR();
    }
}

function assignColor(event) {
    if (event.target == bg_color_text) {
        qrOptions.color.light = event.target.value + 'ff';
    } else if (event.target == fg_color_text) {
        qrOptions.color.dark = event.target.value + 'ff';
    }
}

makeQR(null, 'https://www.kircic.org/discord.html');
handleResize();
submit.addEventListener('mouseup', makeQR);
clipboard.addEventListener('mouseup', writeClipboard);
file.addEventListener('mouseup', writeFile);
background_color.addEventListener('input', colorSelect);
foreground_color.addEventListener('input', colorSelect);
document.addEventListener('keydown', keyListener);
window.onresize = handleResize;