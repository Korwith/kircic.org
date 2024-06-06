// Define
const game_holder = document.querySelector('.game_holder');
const canvas_holder = document.querySelector('.canvas_holder');
const placeholder_canvas = document.querySelector('.placeholder_canvas');
const main_canvas = document.querySelector('.center_canvas');
const start_overlay = document.querySelector('.start_overlay');
const title = document.querySelector('.title');
const normal_button = document.querySelector('.select.normal');
const expert_button = document.querySelector('.select.expert');
const infinite_button = document.querySelector('.select.infinite');

const round_search = [
    { x: -1, y: -1, }, { x: 0, y: -1 }, { x: 1, y: -1 },
    { x: -1, y: 0 }, { x: 1, y: 0 },
    { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
]

const mode_map = {
    'select normal': 'normal',
    'select expert': 'expert',
    'select infinite': 'infinite',
}

let default_dimension = {
    'normal': { x: 10, y: 10 },
    'expert': { x: 20, y: 20 },
    'infinite': { x: 20, y: 20 },
}

let default_bomb = {
    'normal': 15,
    'expert': 65,
    'infinite': 65
}

let preset_image = {};

let mode = 'normal';
let set_dimensions;
let numberLocations = {};
let flagLocations = {};
let bombLocations = {};

let block_events = false;
let keysDown = [];
let isMouseDown = false;
let win_count;
let time_elapsed = 0;

// Set Up
function generateBombs(canvas_position, dimensions, bomb_count) {
    if (bombLocations[canvas_position]) { return false };
    let bomb_array = [];

    function makeBomb() {
        let random_x = Math.floor(Math.random() * dimensions.x);
        let random_y = Math.floor(Math.random() * dimensions.y);
        let pos_string = random_x + '_' + random_y;
        if (bomb_array.includes(pos_string)) { return false };
        bomb_array.push(pos_string);
    }

    for (var x = 0; x < bomb_count; x++) {
        makeBomb();
    }

    bombLocations[canvas_position] = bomb_array;

    if (mode == 'infinite') { return false};
    win_count = (dimensions.x * dimensions.y) - bomb_array.length;
}

function makeNumber(canvas_position, rounded_position, dimensions, special, removeflag, recurse) {
    // break if there is no rounded position
    if (!rounded_position) { return false };
    let rounded_position_string = rounded_position.x + '_' + rounded_position.y;

    // break if not going to generate more terrain
    if (mode != 'infinite' && !numberLocations[canvas_position]) { return false };
    // break if a number already exists here
    if (numberLocations[canvas_position][rounded_position_string] > -1) { return false };
    // break if a bomb already exists here
    if (bombLocations[canvas_position][rounded_position_string]) { return false };

    let canvas_element = document.querySelector(`[position="${canvas_position}"]`);
    let number_count = getNumberCount(canvas_position, rounded_position, dimensions);

    let image_dom = preset_image[number_count];
    if (special) {
        image_dom = preset_image[special];
    } else {
        if (number_count > 0) { updateCursor('pointer'); };
        numberLocations[canvas_position][rounded_position_string] = number_count;
    }

    let ctx = canvas_element.getContext('2d');

    let tileWidth = 512 / dimensions.x;
    let offsetX = (rounded_position.x / dimensions.x) * 512;
    let offsetY = (rounded_position.y / dimensions.x) * 512;

    if (!removeflag) {
        ctx.drawImage(
            image_dom,
            offsetX,
            offsetY,
            tileWidth,
            tileWidth
        )
    } else {
        ctx.clearRect(
            offsetX,
            offsetY,
            tileWidth,
            tileWidth
        )
    }

    if (!special && !recurse && number_count == 0) {
        zeroSearch(canvas_position, rounded_position, dimensions);
    }  
    if (special == 'bomb') {
        if (mode != 'infinite') {
            gameLoss();
        }
        flagLocations[canvas_position].push(rounded_position_string);
    }
    if (mode != 'infinite') {
        let current_number_count = Object.keys(numberLocations[canvas_position]).length;
        if (current_number_count >= win_count) {
            gameWin();
        }
    }
}

function zeroSearch(canvas_position, rounded_position, dimensions) {
    for (var i = 0; i < round_search.length; i++) {
        let this_offset = round_search[i];
        let fixed_position_data = getFixedPosition(canvas_position, rounded_position, this_offset, dimensions);
        let new_position = fixed_position_data.new_position;
        let offset_canvas = fixed_position_data.offset_canvas;
        let new_canvas_position = offset_canvas.x + ':' + offset_canvas.y;
        let in_bound = true;

        if (mode != 'infinite') {
            if (new_position.x < 0 || new_position.x >= dimensions.x) {
                in_bound = false
            }
            if (new_position.y < 0 || new_position.y >= dimensions.y) {
                in_bound = false;
            }
        }

        if (in_bound) {
            let found_number = getNumberCount(new_canvas_position, new_position, dimensions);
            if (found_number == 0) {
                makeNumber(new_canvas_position, new_position, dimensions, false, false);
            } else {
                makeNumber(new_canvas_position, new_position, dimensions, false, false, true)
            }
        }
    }
}

function getFixedPosition(canvas_position, rounded_position, this_offset, dimensions) {
    let canvas_split = canvas_position.split(':');
    let new_position = {
        x: rounded_position.x + this_offset.x,
        y: rounded_position.y + this_offset.y
    }
    let offset_canvas = {
        x: parseInt(canvas_split[0]),
        y: parseInt(canvas_split[1])
    }

    if (mode == 'infinite') {
        if (new_position.x < 0) {
            new_position.x = dimensions.x - 1;
            offset_canvas.x--;
        } else if (new_position.x >= dimensions.x) {
            new_position.x = 0;
            offset_canvas.x++;
        }

        if (new_position.y < 0) {
            new_position.y = dimensions.y - 1;
            offset_canvas.y--;
        } else if (new_position.y >= dimensions.y) {
            new_position.y = 0;
            offset_canvas.y++
        }
    }

    return { offset_canvas: offset_canvas, new_position: new_position };
} // for infinite board

function removeFlag(canvas_position, rounded_position, dimensions) {
    let position_string = rounded_position.x + '_' + rounded_position.y;
    let flagIndex = flagLocations[canvas_position].indexOf(position_string);

    flagLocations[canvas_position].splice(flagIndex, 1);
    makeNumber(canvas_position, rounded_position, dimensions, 'flag', true);
}

function getNumberCount(canvas_position, rounded_position, dimensions) {
    let surrounding_bombs = [];

    for (var i = 0; i < round_search.length; i++) {
        let found_offset = round_search[i];
        let updated_positions = getFixedPosition(canvas_position, rounded_position, found_offset, dimensions);
        let new_position = updated_positions.new_position;
        let offset_canvas = updated_positions.offset_canvas;

        let canvas_string = offset_canvas.x + ':' + offset_canvas.y;
        let found_string = new_position.x + '_' + new_position.y;

        if (mode != 'infinite' && !numberLocations[canvas_position]) {
            return false
        };
        if (mode == 'infinite') {
            if (!numberLocations[canvas_string]) {
                makeCanvas(canvas_string, dimensions);
            }
        }

        let bomb_check = bombLocations[canvas_string].includes(found_string);
        if (bomb_check) {
            surrounding_bombs.push(found_string);
        }
    }

    return surrounding_bombs.length;
}

function getRoundedPosition(event, canvas_position, dimensions) {
    let canvas_element = document.querySelector(`[position="${canvas_position}"]`);
    let canvas_rect = canvas_element.getBoundingClientRect();

    let offsetX = event.x - canvas_rect.x;
    let offsetY = event.y - canvas_rect.y;
    let roundedX = Math.floor((offsetX / canvas_rect.width) * dimensions.x);
    let roundedY = Math.floor((offsetY / canvas_rect.height) * dimensions.x);

    return { x: roundedX, y: roundedY };
}

function assignCanvasFunctions(canvas_position, dimensions) {
    function leftClick(event) {
        if (block_events) { return false };
        if (keysDown.includes(16)) { return false };

        let rounded_position = getRoundedPosition(event, canvas_position, dimensions);
        let position_string = rounded_position.x + '_' + rounded_position.y;
        let bomb_check = bombLocations[canvas_position].includes(position_string);
        let flag_check = flagLocations[canvas_position].includes(position_string);
        if (flag_check) {
            removeFlag(canvas_position, rounded_position, dimensions);
            return false;
        }
        if (bomb_check) {
            gameLoss(canvas_position, rounded_position, dimensions);
            return false;
        };

        makeNumber(canvas_position, rounded_position, dimensions);
    }

    function rightClick(event) {
        if (block_events) { return false };
        let rounded_position = getRoundedPosition(event, canvas_position, dimensions);
        let position_string = rounded_position.x + '_' + rounded_position.y;
        let number_check = numberLocations[canvas_position][position_string];
        let flag_check = flagLocations[canvas_position].includes(position_string);

        if (number_check) { return false };
        if (flag_check) {
            removeFlag(canvas_position, rounded_position, dimensions);
            return false;
        }

        flagLocations[canvas_position].push(position_string);
        makeNumber(canvas_position, rounded_position, dimensions, 'flag');
    }

    function handleMouseClick(event) {
        if (block_events) { return false };
        if (event.which == 1) { leftClick(event); return false };
        if (event.which == 3) { rightClick(event) };
    }

    function handleMouseMove(event) {
        if (block_events) { return false };
        let rounded_position = getRoundedPosition(event, canvas_position, dimensions);
        let position_string = rounded_position.x + '_' + rounded_position.y;
        let number_check = numberLocations[canvas_position][position_string];

        if (number_check) {
            updateCursor('pointer');
        } else {
            updateCursor('default');
        }
    }

    let canvas_element = document.querySelector(`canvas[position="${canvas_position}"]`);
    canvas_element.addEventListener('mousemove', handleMouseMove);
    canvas_element.addEventListener('mouseup', handleMouseClick);
}

function checkSurrounding(event) {
    let canvas_element = event.target;
    let canvas_position = canvas_element.getAttribute('position');
    let rounded_position = getRoundedPosition(event, canvas_position, set_dimensions);
    let rounded_string = rounded_position.x + '_' + rounded_position.y;

    if (!numberLocations[canvas_position]) { return false };
    if (!numberLocations[canvas_position][rounded_string]) { return false };

    let target_number = numberLocations[canvas_position][rounded_string];
    let found_flags = 0;
    let surrounding_tiles = {};

    for (var i = 0; i < round_search.length; i++) {
        let this_offset = round_search[i];
        let fixed_position_data = getFixedPosition(canvas_position, rounded_position, this_offset, set_dimensions);
        let offset_canvas = fixed_position_data.offset_canvas;
        let new_position = fixed_position_data.new_position;
        let canvas_string = offset_canvas.x + ':' + offset_canvas.y;
        let new_position_string = new_position.x + '_' + new_position.y;

        if (!surrounding_tiles[canvas_string]) {
            surrounding_tiles[canvas_string] = [];
        }
        surrounding_tiles[canvas_string].push(new_position_string);

        if (flagLocations[canvas_string].includes(new_position_string)) {
            found_flags++;
        }
    }

    if (target_number != found_flags) { return false };

    for (var offset_canvas_string in surrounding_tiles) {
        let tile_array = surrounding_tiles[offset_canvas_string];
        for (var i = 0; i < tile_array.length; i++) {
            let this_tile = tile_array[i];
            let this_tile_split = this_tile.split('_');
            let this_tile_position = {
                x: parseInt(this_tile_split[0]),
                y: parseInt(this_tile_split[1]),
            }

            if (this_tile_position.x < 0 || this_tile_position.x >= set_dimensions.x) { continue };
            if (this_tile_position.y < 0 || this_tile_position.y >= set_dimensions.y) { continue };

            if (numberLocations[offset_canvas_string][this_tile] > -1) { continue };
            if (flagLocations[offset_canvas_string].includes(this_tile)) { continue };
            if (bombLocations[offset_canvas_string].includes(this_tile)) {
                makeNumber(offset_canvas_string, this_tile_position, set_dimensions, 'bomb');
                continue;
            }

            makeNumber(offset_canvas_string, this_tile_position, set_dimensions);
        }
    }
}

function updateCursor(cursor) {
    document.body.style.cursor = cursor;
}

function countTime() {
    if (block_events) { return false };
    setTimeout(function() {
        time_elapsed++;
        countTime();
    }, 1000);
}

function start(event) {
    set_dimensions = null;
    win_count = null;
    block_events = false;
    isMouseDown = false;
    time_elapsed = 0;
    numberLocations = {};
    flagLocations = {};
    bombLocations = {};
    clearCanvas();
    countTime();

    let set_mode = mode_map[event.target.classList.toString()];
    let dimensions = default_dimension[set_mode];

    set_dimensions = dimensions;
    mode = set_mode;
    makeCanvas('0:0', dimensions)
    start_overlay.classList.remove('show');
}

function makeCanvas(canvas_position, dimensions) {
    let split_canvas = canvas_position.split(':');
    let canvas_clone = placeholder_canvas.cloneNode(true);
    canvas_clone.setAttribute('position', canvas_position);
    canvas_clone.classList.remove('placeholder_canvas');
    canvas_clone.style.left = split_canvas[0] * 100 + '%';
    canvas_clone.style.top = split_canvas[1] * 100 + '%'
    canvas_holder.appendChild(canvas_clone);

    // set defaults
    numberLocations[canvas_position] = {};
    flagLocations[canvas_position] = [];

    let bomb_count = default_bomb[mode];
    generateBombs(canvas_position, dimensions, bomb_count);
    assignCanvasFunctions(canvas_position, dimensions);
}

function clearCanvas() {
    let all_canvas = canvas_holder.querySelectorAll('canvas');
    for (var i = 0; i < all_canvas.length; i++) {
        let this_cavas = all_canvas[i];
        this_cavas.remove();
    }
}

function gameLoss(canvas_position, rounded_position, dimensions) {
    makeNumber(canvas_position, rounded_position, dimensions, 'bomb');
    // handle only non-infinite games
    if (mode == 'infinite') { return false };
    block_events = true;
    title.innerHTML = `Game Lost (${time_elapsed}s)`;
    title.classList = 'title';
    title.classList.add('loss');
    updateCursor('default');
    setTimeout(function () {
        start_overlay.classList.add('show');
    }, 2000);
}

function gameWin() {
    if (mode == 'infinite') { return false };
    block_events = true;
    title.innerHTML = `Game Won (${time_elapsed}s)`;
    title.classList = 'title';
    title.classList.add('won');
    updateCursor('default');
    setTimeout(function() {
        start_overlay.classList.add('show');
    }, 2000);
}

function keyDownListener(event) {
    if (block_events) { return false };
    if (keysDown.includes(event.which)) { return false; };
    keysDown.push(event.which);
}

function keyUpListener(event) {
    if (!keysDown.includes(event.which)) { return false; };
    let keyIndex = keysDown.indexOf(event.which);
    keysDown.splice(keyIndex, 1);
}

let startPosition;
let wasDragged;
function mouseDownListener(event) {
    if (block_events) { return false };
    isMouseDown = true;
}

function mouseUpListener(event) {
    if (block_events) { return false };
    isMouseDown = false;
    startPosition = null;

    // break if was dragged
    if (wasDragged) { wasDragged = false; return false };
    // if target isnt a canvas
    if (event.target.nodeName.toLowerCase() == 'canvas') { checkSurrounding(event); return false };
    // handle infinite only
    if (mode != 'infinite') { return false };
    // target must exist
    if (!event.target) { return false }

    let center_canvas = canvas_holder.querySelector('canvas[position="0:0"]');
    let center_canvas_rect = center_canvas.getBoundingClientRect();
    let canvas_holder_rect = canvas_holder.getBoundingClientRect();
    let game_offset_px = {
        x: event.x - canvas_holder_rect.x,
        y: event.y - canvas_holder_rect.y
    }
    let make_canvas = {
        x: Math.floor(game_offset_px.x / center_canvas_rect.width),
        y: Math.floor(game_offset_px.y / center_canvas_rect.width)
    }
    // fix bug on startup 
    if (make_canvas.x == 0 && make_canvas.y == 0) { return false };

    let make_canvas_position = make_canvas.x + ':' + make_canvas.y;
    makeCanvas(make_canvas_position, set_dimensions);
    makeNumber(
        make_canvas_position,
        getRoundedPosition(event, make_canvas_position, set_dimensions),
        set_dimensions
    )
}

function mouseMoveListener(event) {
    if (block_events) { return false };
    // handle infinite only
    if (mode != 'infinite') { return false };
    if (!keysDown.includes(16)) { return false };
    if (!isMouseDown) { return false };

    if (!startPosition) {
        startPosition = {
            x: event.x - parseInt(canvas_holder.style.left),
            y: event.y - parseInt(canvas_holder.style.top)
        }
    }

    let offset_now = {
        x: event.x - startPosition.x,
        y: event.y - startPosition.y
    }

    canvas_holder.style.left = offset_now.x + 'px';
    canvas_holder.style.top = offset_now.y + 'px';
    wasDragged = true;
}

function makeImages() {
    for (var i = 0; i <= 8; i++) {
        let thisImage = new Image();
        thisImage.src = `minesweeper_assets/${i}.png`;
        preset_image[i] = thisImage;
    }

    let bombImage = new Image();
    bombImage.src = 'minesweeper_assets/mine_red.png';
    preset_image['bomb'] = bombImage;

    let flagImage = new Image();
    flagImage.src = 'minesweeper_assets/flag.png';
    preset_image['flag'] = flagImage;
}

makeImages();

// Events
normal_button.addEventListener('mouseup', start);
expert_button.addEventListener('mouseup', start);
infinite_button.addEventListener('mouseup', start);
document.addEventListener('keydown', keyDownListener);
document.addEventListener('keyup', keyUpListener);
document.addEventListener('mousedown', mouseDownListener);
document.addEventListener('mouseup', mouseUpListener);
document.addEventListener('mousemove', mouseMoveListener);
document.addEventListener('contextmenu', function (event) { event.preventDefault() });