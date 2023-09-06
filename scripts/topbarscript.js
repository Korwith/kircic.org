console.log('[Script Loaded]')
var gameButton = document.getElementById('gamebutton')
var accountsbutton = document.getElementById('accountsbutton')
var accountsFrame = document.getElementById('accounts')
var game = document.getElementById('game');
var gameOpen = false;
var accountsOpen = false;

function toggle() {
    accountsOpen = false;
    accountsFrame.style.display = 'none';

    gameOpen = !gameOpen;
    if (!gameOpen) {
        game.style.display = 'none';
    } else {
        game.style.display = 'block';
    }
}

function accounts() {
    gameOpen = false;
    game.style.display = 'none';
    accountsFrame.style.display = 'block';

    accountsOpen = !accountsOpen;
    if (!accountsOpen) {
        accountsFrame.style.display = 'none';
    } else {
        accountsFrame.style.display = 'block';
    }

}
function discordlink() {
    window.open('https://discord.com/invite/p8ZZXZqnag', '_blank');
}