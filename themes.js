const blurred_img_bg = document.querySelector('.blurred_img_bg');
const sidebar_dots_holder = document.querySelector('.sidebar_dots_holder');
const custom = document.querySelector('.custom');
const theme_bar = document.querySelector('.theme_select');
const theme_buttons = theme_bar.querySelectorAll('div');

let selectingNow = false;

function toggleThemeSelect() {
    selectingNow = !selectingNow;

    if (selectingNow) {
        theme_bar.classList.add('show');
        sidebar_dots_holder.classList.add('hide_traffic');
    } else {
        theme_bar.classList.remove('show');
        sidebar_dots_holder.classList.remove('hide_traffic');
    }
}

function assignButtons() {
    for (var i = 0; i < theme_buttons.length; i++) {
        var thisButton = theme_buttons[i];
        (function (thisButton) {
            thisButton.onclick = function () {
                var thisButtonClass = thisButton.classList[0] + '_bg';
                blurred_img_bg.classList = 'blurred_img_bg';
                blurred_img_bg.classList.add(thisButtonClass);
                localStorage.setItem('color', thisButtonClass);
            }
        })(thisButton);
    }
}

function checkSave() {
    let checkStorage = localStorage.getItem('color');
    
    if (checkStorage) {
        blurred_img_bg.classList = 'blurred_img_bg';
        blurred_img_bg.classList.add(checkStorage);
    } else {
        localStorage.setItem('color', 'purple_bg');
    }
}

custom.addEventListener('mouseup', toggleThemeSelect);
assignButtons();
checkSave();