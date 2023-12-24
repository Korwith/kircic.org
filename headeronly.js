var mobileDiscord = document.querySelector('.mobileDiscordButton');
var discordButton = document.querySelector('.discordButton');
var homeButton = document.querySelector('.homeButton');
var updatesButton = document.querySelector('.updatesButton');
var accountsButton = document.querySelector('.accountsButton');
var peopleButton = document.querySelector('.peopleButton');
var musicButton = document.querySelector('.musicButton');
var pageTitle = document.querySelector('.pageTitle');

homeButton.setAttribute('title', 'Home');
homeButton.innerHTML = '<a href="index.html" style="padding:0; margin:0; width: 110%; height: 110%; display:block;"></a>';

updatesButton.setAttribute('title', 'Updates');
updatesButton.innerHTML = '<a href="updates.html">Updates</a>';

accountsButton.setAttribute('title', 'Services');
accountsButton.innerHTML = '<a href="services.html">Services</a>';

peopleButton.setAttribute('title', 'People');
peopleButton.innerHTML = '<a href="contributors.html">People</a>';

musicButton.setAttribute('title', 'Music');
musicButton.innerHTML = '<a href="music.html">Music</a>';

discordButton.setAttribute('title', 'Discord');
discordButton.innerHTML = '<a href="https://discord.com/invite/p8ZZXZqnag" target="_blank">Discord</a>';

mobileDiscord.setAttribute('title', 'Discord');
mobileDiscord.innerHTML = '<a href="https://discord.com/invite/p8ZZXZqnag" target="_blank"></a>';

var titleText = document.title.split('|')[0];
pageTitle.innerHTML = titleText;
