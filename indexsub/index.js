var buttontolink = {
    'minesweeper': 'sub/minesweeper.html',
    'rhythm': 'sub/rhythm.html',
    'kirhubv1': 'sub/me/index.html',
    'enchant': 'sub/enchant/index.html',
    'math': 'sub/math.html'
}

for (var key in buttontolink) {
    var button = document.getElementById(key);
    button.onclick = function (currentKey) {
        return function () {
            window.open(buttontolink[currentKey], '_blank');
        };
    }(key);
}

var home = document.querySelector('.home')
var discord = document.querySelector('.discord');
var youtube = document.querySelector('.youtube');
var accounts = document.querySelector('.accounts');

discord.onclick = function () {
    window.open('https://discord.com/invite/p8ZZXZqnag', '_blank');
}

youtube.onclick = function () {
    window.open('https://www.youtube.com/channel/UCLcCNfyLG_jQev4MdkHtCZw', '_blank');
}

accounts.onclick = function () {
    window.open('https://www.kirhub.com/services.html', '_blank')
}

home.onclick = function () {
    alert('you found me');
}