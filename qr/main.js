const result_div = document.querySelector('.result');
const qr_canvas = document.querySelector('.qr_canvas');
const url_input = document.querySelector('.url');
const submit = document.querySelector('.submit');
const clipboard = document.querySelector('.clipboard');
const file = document.querySelector('.file');

function makeQR(event, text) {
    if (!text) {
        text = url_input.value;
    }

    QRCode.toCanvas(qr_canvas, text, (error, canvas) => {
        if (error) {
            console.log(error);
            return;
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

makeQR(null, 'https://www.kircic.org/discord.html');
handleResize();
submit.addEventListener('mouseup', makeQR);
clipboard.addEventListener('mouseup', writeClipboard);
file.addEventListener('mouseup', writeFile);
document.addEventListener('keydown', keyListener);
window.onresize = handleResize;