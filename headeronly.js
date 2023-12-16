var mobileDiscord = document.querySelector('#mobileDiscordButton');
var discordButton = document.querySelector('.discordButton');
var homeButton = document.querySelector('#homeButton');
var updatesButton = document.querySelector('.updatesButton');
var accountsButton = document.querySelector('.accountsButton');
var peopleButton = document.querySelector('.peopleButton');
var musicButton = document.querySelector('.musicButton');

homeButton.onclick = function() {
    window.location.href = 'index.html';
}

updatesButton.onclick = function() {
    window.location.href = 'updates.html';
}

accountsButton.onclick = function() {
    window.location.href = 'accounts.html';
}

peopleButton.onclick = function() {
    window.location.href = 'contributors.html';
}

musicButton.onclick = function() {
    window.location.href = 'music.html';
}

function discord() {
    window.open('https://discord.com/invite/p8ZZXZqnag', '_blank');
}

discordButton.onclick = discord;
mobileDiscord.onclick = discord;