var placeholder = document.querySelector('#placeholder');
var hamburger = document.querySelector('.hamburger');
var home = document.querySelector('.homebutton');
var updates = document.querySelector('.updatesbutton')
var accounts = document.querySelector('.accountsbutton');
var discord = document.querySelector('.discordbutton');

hamburger.onclick = function() {
    window.location.href = 'index.html';
}

home.onclick = function () {
    window.location.href = 'index.html';
}

updates.onclick = function () {
    window.location.href = 'updates.html';
}

accounts.onclick = function () {
    window.location.href = 'services.html';
}

discord.onclick = function () {
    window.open('https://discord.gg/invite/p8ZZXZqnag', '_blank');
}