var mobileDiscord = document.querySelector('.mobileDiscordButton');
var discordButton = document.querySelector('.discordButton');
var homeButton = document.querySelector('.homeButton');
var updatesButton = document.querySelector('.updatesButton');
var accountsButton = document.querySelector('.accountsButton');
var peopleButton = document.querySelector('.peopleButton');
var musicButton = document.querySelector('.musicButton');

homeButton.setAttribute('title', 'Home');
homeButton.innerHTML = '<a href="index.html" style="padding:0; margin:0; width: 110%; height: 110%; display:block;"></a>';

updatesButton.setAttribute('title', 'Updates');
updatesButton.innerHTML = '<a href="updates.html">Updates</a>';

accountsButton.setAttribute('title', 'Services');
accountsButton.innerHTML = '<a href="services.html">Services</a>';

peopleButton.setAttribute('title', 'Contributors');
peopleButton.innerHTML = '<a href="contributors.html">Contributors</a>';

discordButton.setAttribute('title', 'Discord');
discordButton.innerHTML = '<a href="https://discord.com/invite/p8ZZXZqnag" target="_blank">Discord</a>';

mobileDiscord.setAttribute('title', 'Discord');
mobileDiscord.innerHTML = '<a href="https://discord.com/invite/p8ZZXZqnag" target="_blank"></a>';
