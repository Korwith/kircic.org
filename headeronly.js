var placeholder = document.querySelector('#placeholder');
var pagetitle = document.querySelector('.pagetitle');
var hamburger = document.querySelector('.hamburger');
var home = document.querySelector('.homebutton');
var updates = document.querySelector('.updatesbutton')
var accounts = document.querySelector('.accountsbutton');
var contribute = document.querySelector('.contributorsbutton');
var discord = document.querySelector('.discordbutton');
var mobilediscord = document.querySelector('.mobilediscord');

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

contribute.onclick = function () {
    window.location.href = 'contributors.html';
}

discord.onclick = function () {
    window.open('https://discord.gg/invite/p8ZZXZqnag', '_blank');
}

mobilediscord.onclick = function() {
    window.open('https://discord.gg/invite/p8ZZXZqnag', '_blank');
}

pagetitle.innerHTML = document.title.split('|')[0];