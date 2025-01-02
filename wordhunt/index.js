const board = document.querySelector('.board');
const count = document.querySelector('.word_count');
const score = document.querySelector('.score');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let database;
let used = [];
let all_nodes = [];

let score_val = 0;
let count_val = 0;
let preset_scores = [100, 400, 800, 1400, 1800];

let surrounding = [
    {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
    {x: -1, y: 0}, {x: 1, y: 0},
    {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}
]

const touchEvent = isMobile() ? 'touchstart' : 'mousedown';
const moveEvent = isMobile() ? 'touchmove' : 'mousemove';
const endEvent = isMobile() ? 'touchend' : 'mouseup';

function getRandomLetter() {
    const letters = [
        { letter: 'E', weight: 11.1607 },
        { letter: 'A', weight: 8.4966 },
        { letter: 'R', weight: 7.5809 },
        { letter: 'I', weight: 7.5448 },
        { letter: 'O', weight: 7.1635 },
        { letter: 'T', weight: 6.9509 },
        { letter: 'N', weight: 6.6544 },
        { letter: 'S', weight: 5.7351 },
        { letter: 'L', weight: 5.4893 },
        { letter: 'C', weight: 4.5388 },
        { letter: 'U', weight: 3.6308 },
        { letter: 'D', weight: 3.3844 },
        { letter: 'P', weight: 3.1671 },
        { letter: 'M', weight: 3.0129 },
        { letter: 'H', weight: 3.0034 },
        { letter: 'G', weight: 2.4705 },
        { letter: 'B', weight: 2.0720 },
        { letter: 'F', weight: 1.8121 },
        { letter: 'Y', weight: 1.7779 },
        { letter: 'W', weight: 1.2899 },
        { letter: 'K', weight: 1.1016 },
        { letter: 'V', weight: 1.0074 },
        { letter: 'X', weight: 0.2902 },
        { letter: 'Z', weight: 0.2722 },
        { letter: 'J', weight: 0.1965 },
        { letter: 'Q', weight: 0.1962 }
    ];

    const weightedArray = [];
    letters.forEach(({ letter, weight }) => {
        const count = Math.round(weight * 100); 
        for (let i = 0; i < count; i++) {
            weightedArray.push(letter);
        }
    });

    const randomIndex = Math.floor(Math.random() * weightedArray.length);
    return weightedArray[randomIndex];
}

function generateBoard() {
    for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 4; y++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.setAttribute('x', x);
            tile.setAttribute('y', y);
            tile.setAttribute('letter', getRandomLetter());
            board.appendChild(tile);
        }
    }
}

let current_string = '';

function startSelection(event) {
    if (!event.target) { return false };
    if (event.target == board) { return false };
    event.target.classList.add('select');
    window.addEventListener(endEvent, endSelection, {passive: false});
    window.addEventListener(moveEvent, moveSelection, {passive: false});
    event.preventDefault();
    current_string = current_string + event.target.getAttribute('letter');
    all_nodes.push(event.target);
}

function endSelection() {
    let all_tile = board.querySelectorAll('.tile');
    updateTileClass(all_tile, 'remove', 'select');
    updateTileClass(all_tile, 'remove', 'valid')
    updateTileClass(all_tile, 'remove', 'error');
    board.classList.remove('valid');
    board.classList.remove('error');
    
    addScore();
    current_string = '';
    all_nodes = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board.removeAttribute('display');
    window.removeEventListener(endEvent, endSelection);
    window.removeEventListener(moveEvent, moveSelection);
}

function moveSelection(event) {
    event.preventDefault();
    let targetElement;
    if (event.touches) {
        const touch = event.touches[0];
        targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    } else {
        targetElement = document.elementFromPoint(event.clientX, event.clientY);
    }
    if (!targetElement || !targetElement.classList.contains('tile') || targetElement.classList.contains('select')) {
        return false;
    }
    let valid = checkValid(all_nodes[all_nodes.length - 1], targetElement);
    if (!valid) { return false };
    
    targetElement.classList.add('select');
    all_nodes.push(targetElement);
    
    current_string += targetElement.getAttribute('letter');
    
    let status = checkSelection();
    let show_string = current_string.replace('null', '');
    if (status) {
        show_string += ` (+${getWordScore()})`
    }
    board.setAttribute('current', show_string);
    board.setAttribute('display', true);
}

function checkSelection() {
    if (current_string.length < 3) {
        drawLines('none');
        return false 
    };
    let selected_tiles = board.querySelectorAll('.tile.select');
    updateTileClass(selected_tiles, 'remove', 'error');
    board.classList.remove('error');

    if (used.includes(current_string)) {
        board.classList.add('error');
        updateTileClass(selected_tiles, 'add', 'error');
        drawLines('error');
        return false;
    }

    if (database.includes(current_string)) {
        board.classList.add('valid');
        updateTileClass(selected_tiles, 'add', 'valid');
        drawLines('valid');
        return true;
    } else {
        board.classList.remove('valid');
        updateTileClass(selected_tiles, 'remove', 'valid')
        drawLines('none')
        return false;
    }
}

function updateTileClass(nodeList, action, classname) {
    for (var i = 0; i < nodeList.length; i++) {
        let this_tile = nodeList[i];
        this_tile.classList[action](classname);
    }
}

function getWordScore() {
    if (current_string.length < 3) { return 0 };
    let found;
    const lastPresetScore = preset_scores[preset_scores.length - 1];
    if (current_string.length <= preset_scores.length + 2) {
        found = preset_scores[current_string.length - 3];
    } else {
        found = lastPresetScore + (current_string.length - preset_scores.length - 2) * 200;
    }
    return found;
}

function addScore() {
    if (!database.includes(current_string)) { return false };
    if (used.includes(current_string)) { return false }
    count_val++;
    score_val += getWordScore();
    count.textContent = 'Words: ' + count_val.toString();
    score.textContent = 'Score: ' + score_val.toString().padStart(4, '0');
    board.classList.add('pop');
    used.push(current_string);
    setTimeout(function() {
        board.classList.remove('pop');
    }, 200);
}

let draw_colors = {
    'valid': 'rgba(255, 255, 255, 0.8)',
    'error': 'rgba(255, 255, 255, 0.8)',
    'none': 'rgba(252, 53, 53, 0.8)'
}

function drawLines(type) {
    let found_color = draw_colors[type];
    if (!found_color) { return false };
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < all_nodes.length; i++) {
        let this_tile = all_nodes[i];
        let next_tile = all_nodes[i+1];
        if (!next_tile) { break };

        let canvas_rect = canvas.getBoundingClientRect();
        let this_rect = this_tile.getBoundingClientRect();
        let next_rect = next_tile.getBoundingClientRect();
        let offset = this_rect.width / 2;
        let scaled = {
            x: 1000 / canvas_rect.width,
            y: 1000 / canvas_rect.height
        }
        let start_position = {
            x: (this_rect.x - canvas_rect.x + offset) * scaled.x,
            y: (this_rect.y - canvas_rect.y + offset) * scaled.y
        }
        let end_position = {
            x: (next_rect.x - canvas_rect.x + offset) * scaled.x,
            y: (next_rect.y - canvas_rect.y + offset) * scaled.y
        }
        
        ctx.beginPath();
        ctx.moveTo(start_position.x, start_position.y);
        ctx.lineCap = 'round';
        ctx.lineWidth = '30';
        ctx.strokeStyle = found_color;
        ctx.lineTo(end_position.x, end_position.y);
        ctx.stroke();
    }
}

function checkValid(origin, next) {
    let origin_x = parseInt(origin.getAttribute('x'));
    let origin_y = parseInt(origin.getAttribute('y'));
    let next_x = parseInt(next.getAttribute('x'));
    let next_y = parseInt(next.getAttribute('y'));
    let match = false;

    for (var i = 0; i < surrounding.length; i++) {
        let this_offset = surrounding[i];
        let new_x = origin_x + this_offset.x;
        let new_y = origin_y + this_offset.y;
        if (new_x == next_x && new_y == next_y) {
            match = true;
        } 
    }

    return match;
}

function start() {
    generateBoard();
    board.addEventListener(touchEvent, startSelection, {passive: false});
}

async function fetchDatabase() {
    try {
        const response = await fetch('assets/valid.txt');
        if (!response.ok) {
            throw new Error('Error: ' + response.status);
        }
        let text = (await response.text()).replace(/\r/g, '');  // Correctly use a regex literal, not a string
        database = text.split('\n');  // Split the text into an array of words
    } catch(error) {
        console.error(error);
    }
}

document.addEventListener('touchstart', function(event) {
    event.preventDefault(); // Prevent the default touch action
}, { passive: false });

function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
}

start();
fetchDatabase();