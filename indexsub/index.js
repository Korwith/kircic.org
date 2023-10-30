var buttontolink = {
    'minesweeper': 'sub/minesweeper.html',
    'rhythm': 'sub/rhythm.html',
    'enchant': 'sub/legacy/enchant/index.html',
    'math': 'sub/math.html',
    'flappy': 'sub/flappy/game.html',
    'rhythm2': 'sub/newrhythm/game.html',
    'calculator': 'sub/calculator.html'
}

for (var key in buttontolink) {
    var button = document.getElementById(key);
    button.onclick = function (currentKey) {
        return function () {
            //window.open(buttontolink[currentKey], '_blank');
            openPreview(buttontolink[currentKey]);
        };
    }(key);
}

var gameframe = document.querySelector('#playhere');
var gameframeoverlay = document.querySelector('#playoverlay');
var home = document.querySelector('.home')

function checkMobile() {
    return (window.innerWidth < 767);
}

function openPreview(url) {
    if (checkMobile()) {
        window.open(url, '_blank');
    } else {
        gameframe.src = url;
        gameframe.classList.remove('hidden');
        gameframeoverlay.classList.remove('hidden');
    }
}

var previewclose = document.querySelector('.close');
var previewopen = document.querySelector('.newtab');

previewclose.onclick = function() {
    gameframe.classList.add('hidden');
    gameframeoverlay.classList.add('hidden');

    setTimeout(function() {
        gameframe.removeAttribute('src');
    }, 500);
}

previewopen.onclick = function() {
    window.open(gameframe.src, '_blank');
}
