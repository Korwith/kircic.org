const content = document.querySelector('.content');
const action_pane = document.querySelector('.action_pane');
const score_pane = document.querySelector('.score_pane')
const show_tile = document.querySelector('#show_tile');

const main_menu = action_pane.querySelector('.button_holder.menu.extra');
const main_row = action_pane.querySelector('.main_row');
const secondary_row = action_pane.querySelector('.secondary_row');

const menu_button = action_pane.querySelector('.menu_button');
const flag_button = action_pane.querySelector('.flag');
const restart_button = action_pane.querySelector('.restart');
const center_button = action_pane.querySelector('.center');
const move_button = action_pane.querySelector('.move');

const zoom_bar = action_pane.querySelector('.slider input[type="range"]');
const zoom_text = action_pane.querySelector('.slider span.zoom_level');
const zoom_reset = action_pane.querySelector('.slider .reset');

const save_holder = action_pane.querySelector('.save_buttons');
const save_button = action_pane.querySelector('.save');
const load_button = action_pane.querySelector('.load');

const score_stat = score_pane.querySelector('.score');
const tile_stat = score_pane.querySelector('.tiles');

const search_array = [
    { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
    { x: -1, y: 0 }, { x: 1, y: 0 },
    { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
]

let mouse_down = false;
let force_flag = false;
let force_move = false;

let image_info = {};
let number_info = {};
let bomb_info = {};
let flag_info = {};
let game_stats = {current_score: 0};

let zoom = 1;
let tile_size = 40 * zoom;
let last_mouse_event;

function handleMouseMove(event) {
    last_mouse_event = event;
    setTilePosition(event);

    if (action_pane.contains(event.target) || score_pane.contains(event.target)) {
        show_tile.style.display = 'none';
    } else {
        show_tile.style.display = 'block';
    }

    if (mouse_down) {
        moveContent(event);
        return;
    }
}

let starting_position;
function moveContent(event) {
    if (!starting_position) {
        starting_position = {
            x: event.x / zoom - parseInt(content.style.left),
            y: event.y / zoom - parseInt(content.style.top)
        }
    }
    let offset_position = {
        x: event.x / zoom - starting_position.x,
        y: event.y / zoom - starting_position.y
    }
    content.style.left = offset_position.x + 'px';
    content.style.top = offset_position.y + 'px';
    document.body.style.backgroundPosition = (offset_position.x*zoom)%tile_size + 'px ' + (offset_position.y*zoom)%tile_size + 'px';
}

function handleMouseDown(event) {
    if (action_pane.contains(event.target) || score_pane.contains(event.target)) { return; }
    mouse_down = true;
    document.body.classList.add('down');
}

function handleMouseUp(event) {
    mouse_down = false;
    document.body.classList.remove('down');
    if (starting_position != null) { 
        starting_position = null;
        return; 
    }
    if (action_pane.contains(event.target) || force_move) { return; }
    let canvas_info = getCanvasPosition(event, true);
    let canvas_string = chunkToPosition(canvas_info.chunk);
    let position_string = getPositionString(canvas_info.position);

    if (number_info[canvas_string][position_string] == null) {
        createNumber(canvas_info.chunk, canvas_info.position, force_flag || event.which == 3);
    } else {
        chordTile(canvas_info.chunk, canvas_info.position);
    }
}

function handleTouchStart(event) {
    if (action_pane.contains(event.target) || score_pane.contains(event.target)) { return; }
    mouse_down = true;
}

function handleTouchEnd(event) {
    mouse_down = false;
    starting_position = null;
}

function handleTouchMove(event) {
    let first_point = event.touches[0];
    let touch_event = {
        x: first_point.clientX,
        y: first_point.clientY,
        target: first_point.target
    };
    handleMouseMove(touch_event);
}

function handleKeyDown(event) {
    if (event.which == 32) {
        //handleMouseDown(event)
    } else if (event.which == 70) {
        toggleFlag();
    } else if (event.which == 81) {
        toggleMovement();
    } else if (event.which == 67) {
        centerGame();
    }
}

function handleKeyUp(event) {
    if (event.which == 32) {
        handleMouseUp(last_mouse_event);
        handleTouchEnd();
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleMenuButton(event) {
    main_menu.classList.toggle('show');
}

function setTilePosition(event) {
    let found_left = parseInt(content.style.left) * zoom;
    let found_top = parseInt(content.style.top) * zoom
    let offset_rounded = {
        x: found_left + Math.floor((event.x - found_left) / tile_size) * tile_size,
        y: found_top + Math.floor((event.y - found_top) / tile_size) * tile_size
    };
    show_tile.style.left = offset_rounded.x + 'px';
    show_tile.style.top = offset_rounded.y + 'px'
}

function getCanvasPosition(event, force_gen) {
    let chunk = document.elementFromPoint(event.x * (1/zoom), event.y * (1/zoom));
    if (!chunk || chunk.nodeName.toLowerCase() != 'canvas') {
        if (!force_gen) { return };
        chunk = generateCanvas({
            x: Math.floor((event.x * (1/zoom) - parseInt(content.style.left)) / 800),
            y: Math.floor((event.y * (1/zoom) - parseInt(content.style.top)) / 800)
        })
    }
    let chunk_bounds = chunk.getBoundingClientRect();
    let offset_position = {
        x: Math.floor((event.x - chunk_bounds.x) / tile_size),
        y: Math.floor((event.y - chunk_bounds.y) / tile_size)
    }
    return { 'chunk': chunk, 'position': offset_position };
}

function getNumberInfo(chunk, position) {
    let chunk_position = {
        x: parseInt(chunk.getAttribute('x')),
        y: parseInt(chunk.getAttribute('y'))
    }
    let chunk_string = getPositionString(chunk_position);
    let tile_string = getPositionString(position);
    if (bomb_info[chunk_string].includes(tile_string)) {
        return { num: 'mine_red' };
    }

    let count = 0;
    let tiles = [];
    for (var i = 0; i < 8; i++) {
        let this_offset = search_array[i];
        let found_tile = {
            x: position.x + this_offset.x,
            y: position.y + this_offset.y
        }
        let found_chunk = {
            x: chunk_position.x,
            y: chunk_position.y
        };
        // this could be better
        if (found_tile.x < 0) {
            found_tile.x = 19;
            found_chunk.x--;
        } else if (found_tile.x > 19) {
            found_tile.x = 0;
            found_chunk.x++;
        }
        if (found_tile.y < 0) {
            found_tile.y = 19;
            found_chunk.y--;
        } else if (found_tile.y > 19) {
            found_tile.y = 0;
            found_chunk.y++;
        }

        let found_chunk_string = getPositionString(found_chunk);
        let found_tile_string = getPositionString(found_tile);
        positionToChunk(found_chunk_string); // make sure it exists

        if (bomb_info[found_chunk_string].includes(found_tile_string)) {
            count++;
        }
        tiles.push({ 'chunk': found_chunk_string, 'position': found_tile });
    }
    return { 'num': count, 'tiles': tiles };
}

function chordTile(chunk, position) {
    let tile_info = getNumberInfo(chunk, position);
    if (typeof tile_info.num != 'number' || tile_info.num == 0) { return; }

    let count = 0;
    for (var i = 0; i < tile_info.tiles.length; i++) {
        let this_tile = tile_info.tiles[i];
        let position_string = getPositionString(this_tile.position);
        if (flag_info[this_tile.chunk].includes(position_string)) {
            count++;
        }
    }
    
    if (count != tile_info.num) { return; }
    for (var i = 0; i < tile_info.tiles.length; i++) {
        let this_tile = tile_info.tiles[i];
        let position_string = getPositionString(this_tile.position);
        let this_chunk = positionToChunk(this_tile.chunk);
        if (flag_info[this_tile.chunk].includes(position_string)) { continue; }
        createNumber(this_chunk, this_tile.position);
    }
}

function createNumber(chunk, position, flag) {
    let ctx = chunk.getContext('2d');
    let chunk_string = chunkToPosition(chunk);
    let position_string = getPositionString(position);
    if (number_info[chunk_string][position_string] != null) { return; }

    let tile_info = getNumberInfo(chunk, position);
    // handle flagging
    let flag_index = flag_info[chunk_string].indexOf(position_string);
    function addFlag() {
        drawNumber(chunk, 'flag', position);
        flag_info[chunk_string].push(position_string);
        game_stats['flag']++;
        updateStats();
    }
    function removeFlag() {
        ctx.clearRect(position.x * 40, position.y * 40, 40, 40);
        flag_info[chunk_string].splice(flag_index, 1);
        game_stats['flag']--;
        updateStats();
    }
    if (flag) {
        if (flag_index == -1) {
            addFlag();
        } else {
            removeFlag();
        }
        return;
    }
    if (flag_index != -1) {
        removeFlag();
        return;
    }
    
    number_info[chunk_string][position_string] = tile_info.num;
    game_stats[tile_info.num]++;
    drawNumber(chunk, tile_info.num, position);
    updateStats();
    updateScore(tile_info.num);
    
    if (tile_info.num == 0) {
        for (var i in tile_info.tiles) {
            let this_tile = tile_info.tiles[i];
            let chunk_object = positionToChunk(this_tile.chunk);
            createNumber(chunk_object, this_tile.position, false, true);
        }
    }
}

function drawNumber(chunk_object, number, position) {
    let ctx = chunk_object.getContext('2d');
    ctx.drawImage(image_info[number], position.x * 40, position.y * 40, 40, 40)
}

function generateCanvas(position) {
    let previous_chunk = content.querySelector(`[x="${position.x}"][y="${position.y}"]`);
    if (previous_chunk) { return previous_chunk; }
    let chunk = document.createElement('canvas');
    chunk.setAttribute('x', position.x);
    chunk.setAttribute('y', position.y);
    chunk.width = '800';
    chunk.height = '800';
    chunk.style.left = position.x * 800 + 'px';
    chunk.style.top = position.y * 800 + 'px';
    content.appendChild(chunk);
    createBombs(position);

    let position_string = getPositionString(position);
    number_info[position_string] = {};
    flag_info[position_string] = [];

    return chunk;
}

function createBombs(chunk_position) {
    let chunk_string = getPositionString(chunk_position);
    bomb_info[chunk_string] = [];
    for (var i = 0; i < 60; i++) {
        let random_position = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        }
        let random_position_string = getPositionString(random_position);
        if (bomb_info[chunk_string].includes(random_position_string)) { continue; }
        bomb_info[chunk_string].push(random_position_string);
    }
}

function getPositionString(position_object) {
    return `${position_object.x}:${position_object.y}`;
}

function getPositionArray(position_string) {
    let position_split = position_string.split(':');
    return {
        x: position_split[0],
        y: position_split[1]
    }
}

function positionToChunk(position_string) {
    let position_array = getPositionArray(position_string);
    let chunk = content.querySelector(`canvas[x="${position_array.x}"][y="${position_array.y}"]`);
    if (!chunk) {
        chunk = generateCanvas({ x: position_array.x, y: position_array.y });
    }
    return chunk;
}

function chunkToPosition(chunk) {
    let position_string = {
        x: chunk.getAttribute('x'),
        y: chunk.getAttribute('y')
    }
    return getPositionString(position_string);
}

function toggleFlag() {
    force_flag = !force_flag;
    flag_button.classList.toggle('no_filter', force_flag);
}

function updateZoom(event, set) {
    let zoom_level = set || zoom_bar.value;
    if (event.target == zoom_reset) {
        zoom_level = 1;
    }
    if (set) {
        zoom_bar.value = set;
    }
    zoom_bar.value = zoom_level == 1 ? 1.1 : zoom_level;
    zoom = zoom_level;
    tile_size = 40 * zoom_level;
    show_tile.style.width = tile_size + 'px';
    show_tile.style.height = tile_size + 'px';
    content.style.zoom = zoom_level * 100 + '%';
    zoom_text.textContent = 'x' + zoom_level;
    if (zoom_level.toString().length == 1) {
        zoom_text.textContent += '.0';
    }

    let camera_position = {
        x: parseFloat(content.style.left),
        y: parseFloat(content.style.top)
    }
    document.body.style.backgroundSize = tile_size + "px " + tile_size + "px";
    document.body.style.backgroundPosition = (camera_position.x % tile_size) + 'px ' + (camera_position.y % tile_size) + 'px';
}

function centerGame(event, no_ui) {
    content.style.left = (window.innerWidth / 2) + 'px';
    content.style.top = (window.innerHeight / 2) + 'px';
    document.body.style.backgroundPosition = window.innerWidth/2 % tile_size + 'px ' + window.innerHeight/2 % tile_size + 'px'
    
    if (no_ui) { return; }
    center_button.classList.add('no_filter');
    setTimeout(function() {
        center_button.classList.remove('no_filter');
    }, 1000)
}

function toggleMovement() {
    force_move = !force_move;
    move_button.classList.toggle('no_filter', force_move);
    document.body.classList.toggle('movelock', force_move);
}

function initStats() {
    let special = ['mine_red', 'flag'];
    for (var i = 0; i <= 8; i++) {
        if (!game_stats[i]) {
            game_stats[i] = 0;
        }
    }
    for (var i = 0; i < special.length; i++) {
        let this_entry = special[i];
        if (!game_stats[this_entry]) {
            game_stats[this_entry] = 0;
        }
    }
}

let flag_stat = main_menu.querySelector(`.number_stat[num="flag"]`);
let mine_stat = main_menu.querySelector(`.number_stat[num="mine_red"]`);
function updateStats() {
    flag_stat.textContent = game_stats['flag'];
    mine_stat.textContent = game_stats['mine_red'];
    
    let tile_count = 0;
    for (var i = 0; i <= 8; i++) {
        let stat_element = main_menu.querySelector(`.number_stat[num="${i}"]`);
        let stat_value = game_stats[i];
        stat_element.textContent = stat_value;
        stat_element.classList.toggle('hide', stat_value == 0);
        tile_count += stat_value;
    }
    tile_stat.textContent = 'Tiles: ' + tile_count;
    score_stat.textContent = 'Score: ' + game_stats.current_score;
}

function updateScore(num) {
    let add = 0;
    if (typeof num != 'number' && num == 'mine_red') {
        add = (game_stats.current_score - 100) < 0 ? -game_stats.current_score : -100;
    } else {
        add = Math.pow(num, num > 1 ? num-1 : 1);
        add = add > 0 ? add : 0;
    }
    game_stats.current_score += add;
    score_stat.classList.toggle('red', add < 0);
    score_stat.textContent = "Score: " + game_stats.current_score;
}

function handleReset(event, force) {
    let accept = force || confirm('Are you sure you want to reset this game?');
    if (!accept) { return };
    let all_canvas = content.querySelectorAll('canvas');
    number_info = {};
    bomb_info = {};
    flag_info = {};
    game_stats = {current_score: 0};
    
    for (var i = 0; i < all_canvas.length; i++) {
        let this_canvas = all_canvas[i];
        this_canvas.remove();
    }
    initStats();
    updateStats();
    updateZoom({target: zoom_reset});
    centerGame(false, true);
    generateCanvas({ x: 0, y: 0});
}

function handleSave(event) {
    let camera_position = {
        x: parseFloat(content.style.left) || 0,
        y: parseFloat(content.style.top) || 0,
        zoom: parseFloat(content.style.zoom) / 100 || 1,
    }

    let save_info = {
        bombs: bomb_info,
        numbers: number_info,
        flags: flag_info,
        stats: game_stats,
        pos: camera_position,
    }
    
    let save_string = JSON.stringify(save_info);
    if (event && event.target == save_button) {
        saveToFile(save_string);
    } else {
        localStorage.setItem('save', save_string);
    }
}

function saveToFile(save_string) {
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(save_string));
    link.setAttribute('download', 'infinisweeper.kir');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function handleLoad(event, file) {
    let found_info = file || localStorage.getItem('save');
    if (!found_info) { return; }
    let parse;
    try {
        parse = JSON.parse(found_info);
        handleReset(false, true);
    } catch(error) {
        console.warn(error);
        return;
    }   

    for (var i in parse.numbers) {
        let position_array = getPositionArray(i);
        let chunk = generateCanvas(position_array);

        let this_entry = parse.numbers[i];
        for (var j in this_entry) {
            let this_tile = this_entry[j];
            let tile_position_array = getPositionArray(j);
            drawNumber(chunk, this_tile, tile_position_array)
        }
    }

    for (var i in parse.flags) {
        let chunk = positionToChunk(i);
        
        let this_entry = parse.flags[i];
        for (var j = 0; j < this_entry.length; j++) {
            let this_flag = this_entry[j];
            let flag_position_array = getPositionArray(this_flag);
            drawNumber(chunk, 'flag', flag_position_array);
        }
    }

    bomb_info = parse.bombs;
    number_info = parse.numbers;
    flag_info = parse.flags;
    game_stats = parse.stats;
    content.style.left = parse.pos.x + 'px';
    content.style.top = parse.pos.y + 'px';
    document.body.style.backgroundPosition = (parse.pos.x % tile_size) + 'px ' + (parse.pos.y % tile_size) + 'px';
    updateZoom(false, parse.pos.zoom);
    updateStats();
}

function loadFromFile() {
    let input = document.createElement('input');
    input.addEventListener('change', function(event) {
        let file = input.files[0];
        if (file) {
            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = function(event) {
                handleLoad(false, event.target.result);
            }
            reader.onerror = function(event) {
                console.log('file reading error');
            }
            document.body.removeChild(input);
        }    
    });
    input.type = 'file';
    input.accept = '.kir';
    document.body.appendChild(input);
    input.click();
}

function createImages() {
    let special = ['mine_red', 'mine', 'flag', 'outset'];
    for (var i = 0; i <= 8; i++) {
        let img = new Image();
        img.src = 'minesweeper_assets/' + i + '.png';
        image_info[i] = img;
    }
    for (var i = 0; i < special.length; i++) {
        let img = new Image();
        img.src = 'minesweeper_assets/' + special[i] + '.png';
        image_info[special[i]] = img;
    }
}

function handleMobileUI() {
    if (window.innerWidth >= 767) {
        main_row.appendChild(save_holder);
    } else {
        secondary_row.appendChild(save_holder);
    }
}

generateCanvas({ x: 0, y: 0 });
createImages();
initStats();
updateZoom({target: zoom_reset});
handleMobileUI();
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('contextmenu', handleContextMenu);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);
document.addEventListener('touchmove', handleTouchMove)
window.addEventListener('load', handleLoad);
window.addEventListener('beforeunload', handleSave);
window.addEventListener('resize', handleMobileUI);
menu_button.addEventListener('mouseup', handleMenuButton);
flag_button.addEventListener('mouseup', toggleFlag);
save_button.addEventListener('mouseup', handleSave);
load_button.addEventListener('mouseup', loadFromFile);
center_button.addEventListener('mouseup', centerGame);
move_button.addEventListener('mouseup', toggleMovement);
zoom_bar.addEventListener('input', updateZoom);
zoom_reset.addEventListener('mouseup', updateZoom);
restart_button.addEventListener('mouseup', handleReset);