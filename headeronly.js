var pageTitle = document.querySelector('#pageTitle')
var homeIcon = document.querySelector('#homeIcon');
var mobieDiscordButton = document.querySelector('#mobileDiscordButton');
var homeButton = document.querySelector('.homeButton');
var updatesButton = document.querySelector('.updatesButton');
var accountsButton = document.querySelector('.accountsButton');
var peopleButton = document.querySelector('.peopleButton');
var discordButton = document.querySelector('.discordButton');

var buttonToLink = [
    {button: homeIcon, link: 'index.html'},
    {button: homeButton, link: 'index.html'},
    {button: updatesButton, link: 'updates.html'},
    {button: accountsButton, link: 'services.html'},
    {button: peopleButton, link: 'contributors.html'}
]

var externalLinks = [
    {button: discordButton, link: 'https://discord.gg/invite/p8ZZXZqnag'},
    {button: mobieDiscordButton, link: 'https://discord.gg/invite/p8ZZXZqnag'}
]

for (var i = 0; i < buttonToLink.length; i++) {
    (function(i) {
        var thisData = buttonToLink[i];
        var thisButton = thisData.button;
        var thisLink = thisData.link;

        thisButton.onclick = function() {
            window.location.href = thisLink;
        }
    })(i);
}

for (var i = 0; i < externalLinks.length; i++) {
    (function(i) {
        var thisData = externalLinks[i];
        var thisButton = thisData.button;
        var thisLink = thisData.link;

        thisButton.onclick = function() {
            window.open(thisLink, '_blank');
        }
    })(i)
}

pageTitle.innerHTML = document.title.split('|')[0];