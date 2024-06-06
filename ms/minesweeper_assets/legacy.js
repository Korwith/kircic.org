var placeholderbutton = document.getElementById('placeholder');
var action = document.getElementById('action');
var bomblocations = [];
var squarecollector = [];
var flagcollector = [];
var playing = false;

var getnumberclass = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
]

function bombgen() {
    bomblocations = [];
    flaglocations = [];
    for (var i = 0; i < 15; i++) {
        var randomX = Math.floor(Math.random() * 10);
        var randomY = Math.floor(Math.random() * 10);
        var fullstring = randomX + '_' + randomY;

        if (!bomblocations.includes(fullstring)) {
            bomblocations.push(fullstring);
        }
    }

    var bombtext = document.getElementById('bombs');
    bombtext.innerHTML = 'Bombs: ' + bomblocations.length;
}

function flag(x, y) {
    var pos = x + '_' + y;
    var selectedsquare = document.getElementById('square_' + pos);
    var selectedsquarerect = selectedsquare.getBoundingClientRect();

    if (!selectedsquare.classList.contains('holdsnumber')) {
        if (selectedsquare.classList.contains('flag')) {
            selectedsquare.classList.remove('flag');
            var flagindex = flagcollector.indexOf(pos);
            flagcollector.splice(flagindex, 1);
        } else {
            selectedsquare.classList.add('flag');
            flagcollector.push(pos);
        }
    }

    var flagtext = document.getElementById('flags');
    flagtext.innerHTML = 'Flags: ' + flagcollector.length;
}

function getbombcount(selectedX, selectedY) {
    function recursivelyRevealEmptySquares(x, y) {
        var relativePositions = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: 0 }, { x: 1, y: 0 },
            { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
        ];

        for (var i = 0; i < relativePositions.length; i++) {
            var offset = relativePositions[i];
            var offsetX = offset.x;
            var offsetY = offset.y;

            var newX = parseInt(x) + offsetX;
            var newY = parseInt(y) + offsetY;
            var newstring = newX + '_' + newY;

            var possiblesquare = document.getElementById('square_' + newX + '_' + newY);

            if (possiblesquare && !possiblesquare.classList.contains('activesquare')) {
                possiblesquare.classList.add('activesquare');
                var bombcount = getAdjacentBombCount(newX, newY);
                possiblesquare.classList.add(getnumberclass[bombcount]);
                possiblesquare.classList.add('holdsnumber');

                // If the revealed square has no adjacent bombs, recursively reveal its neighbors
                if (bombcount === 0) {
                    recursivelyRevealEmptySquares(newX, newY);
                }
            }
        }
    }

    var relativePositions = [
        { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
        { x: -1, y: 0 }, { x: 1, y: 0 },
        { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
    ];

    var count = 0;

    for (var i = 0; i < relativePositions.length; i++) {
        var offset = relativePositions[i];
        var offsetX = offset.x;
        var offsetY = offset.y;

        var newX = selectedX + offsetX;
        var newY = selectedY + offsetY;
        var newstring = newX + '_' + newY;

        if (bomblocations.includes(newstring)) {
            count++;
        }
    }

    var pos = selectedX + '_' + selectedY;
    var square = document.getElementById('square_' + pos);

    if (!square.classList.contains('holdsnumber')) {
        square.classList.add(getnumberclass[count]);
        square.classList.add('holdsnumber');
    }

    // Handle click on number tiles only
    if (count > 0 && !square.classList.contains('activesquare')) {
        square.classList.add('activesquare');

        // Remove flag
        if (flagcollector.includes(pos)) {
            var index = flagcollector.indexOf(pos);
            flagcollector.splice(index, 1);
            square.classList.remove('flag');
        }
    }

    if (count === 0) {
        // Recursively check and fill adjacent zeros
        for (var i = 0; i < relativePositions.length; i++) {
            var offset = relativePositions[i];
            var offsetX = offset.x;
            var offsetY = offset.y;

            var newX = selectedX + offsetX;
            var newY = selectedY + offsetY;
            var newstring = newX + '_' + newY;

            // Check if the adjacent square is within the grid
            if (
                newX >= 0 && newX < 10 &&
                newY >= 0 && newY < 10 &&
                !bomblocations.includes(newstring)
            ) {
                var adjacentSquare = document.getElementById('square_' + newX + '_' + newY);
                var index = flagcollector.indexOf(newX + '_' + newY);
                if (flagcollector.includes(newX + '_' + newY)) {
                    flagcollector.splice(index, 1);
                }

                // Check if the adjacent square is not already revealed
                if (!adjacentSquare.classList.contains('activesquare')) {
                    adjacentSquare.classList.add('activesquare');
                    getbombcount(newX, newY);
                }
            }
        }
    } else { //number on click
        square.onclick = function (event) {
            var flagshere = [];
            var emptyhere = [];
            var bombshere = [];

            for (var n = 0; n < relativePositions.length; n++) {
                var offset = relativePositions[n];
                var offsetx = offset.x;
                var offsety = offset.y;

                var newx = parseInt(selectedX) + offsetx;
                var newy = parseInt(selectedY) + offsety;
                var newstring = newx + '_' + newy;

                var possiblesquare = document.getElementById('square_' + newx + '_' + newy);

                if (possiblesquare) {
                    if (possiblesquare.classList.contains('flag')) {
                        flagshere.push(newstring);
                    } else if (!possiblesquare.classList.contains('holdsnumber')) {
                        emptyhere.push(newstring);
                    }

                    if (bomblocations.includes(newstring)) {
                        bombshere.push(newstring);
                    }
                }
            }

            if (flagshere.length == count) {
                var checkedflags = 0;

                if (bombshere.length == flagshere.length) {
                    var allelementsmatch = bombshere.every(function (element) {
                        return flagshere.includes(element);
                    });

                    if (allelementsmatch) {
                        for (var p = 0; p < emptyhere.length; p++) {
                            var newsquare = document.getElementById('square_' + emptyhere[p]);

                            if (newsquare) {
                                var posX = newsquare.id.split('_')[1];
                                var posY = newsquare.id.split('_')[2];

                                var bombcountonnewnumber = getAdjacentBombCount(posX, posY);
                                newsquare.classList.add(getnumberclass[bombcountonnewnumber]);
                                newsquare.classList.add('holdsnumber');
                                newsquare.classList.add('activesquare');

                                // If the new square has no adjacent bombs, recursively reveal its neighbors
                                if (bombcountonnewnumber === 0) {
                                    recursivelyRevealEmptySquares(posX, posY);
                                }
                            }
                        }
                    } else {
                        lose('square_' + bombshere[0]);
                    }
                }
            }
        }
    }

    return count;
}

function getAdjacentBombCount(x, y) {
    var relativePositions = [
        { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
        { x: -1, y: 0 }, { x: 1, y: 0 },
        { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
    ];

    var count = 0;

    for (var i = 0; i < relativePositions.length; i++) {
        var offset = relativePositions[i];
        var offsetX = offset.x;
        var offsetY = offset.y;

        var newX = parseInt(x) + offsetX;
        var newY = parseInt(y) + offsetY;
        var newstring = newX + '_' + newY;

        if (bomblocations.includes(newstring)) {
            count++;
        }
    }

    return count;
}

function squaregen() {
    var placeholders = document.getElementsByClassName('placeholder');
    var placearray = Array.from(placeholders);

    for (var i = 0; i < placearray.length; i++) {
        var element = placearray[i];
        element.remove();
    }

    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
            var clone = placeholderbutton.cloneNode(true);
            clone.style.display = 'block';
            clone.id = 'square_' + x + '_' + y;
            clone.classList.add('placeholder');
            action.appendChild(clone);
            squarecollector.push(clone);
            ///////////////////////////////////////////////////////
            // Add click event listener to each square 
            clone.addEventListener('click', function () {
                if (!playing) { return };
                var clickedx = this.id.split('_')[1];
                var clickedy = this.id.split('_')[2];
                if (flagmode) {
                    flag(clickedx, clickedy);
                    return;
                }
                if (!bomblocations.includes(clickedx + '_' + clickedy)) {
                    getbombcount(parseInt(clickedx), parseInt(clickedy));
                } else {
                    lose(this.id);
                }
            });

            clone.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                if (!playing) { return; };
                var clickedx = this.id.split('_')[1];
                var clickedy = this.id.split('_')[2];
                flag(clickedx, clickedy);
            });

        }
    }
}

function lose(id) {
    for (var i = 0; i < bomblocations.length; i++) {
        var pos = bomblocations[i];
        var x = pos.split('_')[0];
        var y = pos.split('_')[1];
        var newpos = x + '_' + y;
        var square = document.getElementById('square_' + newpos);

        square.classList.add('mine');
        if (square.classList.contains('flag')) {
            square.classList.remove('flag');
        }
        playing = false;
    }

    var targetsquare = document.getElementById(id);
    targetsquare.classList.remove('mine');
    targetsquare.classList.add('activemine');
}

var timeelapsed = 0;
var timeoutID; // Variable to store the timeout ID

function starttick() {
    if (playing) {
        var timetext = document.getElementById('time');
        timetext.innerHTML = 'Time: ' + timeelapsed;
        timeelapsed++;
        timeoutID = setTimeout(starttick, 1000);
    }
}

function stopTick() {
    clearTimeout(timeoutID);
}

function start() {
    playing = false;
    stopTick(); // Stop the timer
    playing = true;
    bombgen();
    squaregen();
    timeelapsed = 0; // Reset the time to 0
    var timetext = document.getElementById('time');
    timetext.innerHTML = 'Time: 0';
    starttick();
}

document.addEventListener('keydown', function (event) {
    if (event.key.toLowerCase() == 'r') {
        start();
    } else if (event.key.toLowerCase() == 'f') {
        toggleflagging();
    }
});
start()

var mouseflag = document.getElementById('mouseflag');
document.addEventListener('mousemove', function(event) {
    mouseflag.style.left = event.clientX + 15 + 'px';
    mouseflag.style.top = event.clientY - 20 + 'px';
});

var flaggingbutton = document.getElementById('flagging');
flaggingbutton.onclick = toggleflagging;

var flagmode = false;
function toggleflagging() {
    flagmode = !flagmode;
    if (flagmode) {
        mouseflag.style.display = 'block';
        flaggingbutton.style.backgroundColor = '#3bcf2d';
    } else {
        mouseflag.style.display = 'none';
        flaggingbutton.style.backgroundColor = 'rgb(225, 50, 50)';
    }
}

var restart = document.getElementById('restart');
restart.addEventListener('click', function(event) {
    start();
});
