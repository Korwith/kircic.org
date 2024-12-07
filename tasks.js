const tasklist_placeholder = document.querySelector('#tasklist_entry_placeholder')
const tasklist = document.querySelector('.page.tasks');
const tasklist_bar = tasklist.querySelector('.tasklist_bar');
const tasklist_input = tasklist_bar.querySelector('span');
const tasklist_add = tasklist_bar.querySelector('.add');
const tasklist_edit = tasklist_bar.querySelector('.edit');
const tasklist_holder = tasklist.querySelector('.holder');
const tasklist_holder_past = tasklist.querySelector('.previous');

function toggleRecentlyCompleted() {
    let all_entry = tasklist_holder_past.querySelectorAll('.tasklist_entry');
    tasklist_holder_past.classList.toggle('hide', all_entry.length == 0);
    if (all_entry.length == 1) {
        if (all_entry[0].classList.contains('resolved')) {
            tasklist_holder_past.classList.add('hide');
        }
    }
}

function addTask(text, holder, nosave) {
    let clone = tasklist_placeholder.cloneNode(true);
    let clone_span = clone.querySelector('span');
    let clone_button = clone.querySelector('button.checkbox');
    let shift_up = clone.querySelector('.shift.up');
    let shift_down = clone.querySelector('.shift.down');
    clone_span.textContent = text.replaceAll(' ', '');
    shift_up.onclick = handleShiftUp;
    shift_down.onclick = handleShiftDown;
    clone_button.onclick = resolveEntry;
    clone_span.addEventListener('keydown', saveTasks);
    clone.removeAttribute('id');
    holder.appendChild(clone);

    if (holder == tasklist_holder_past) {
        clone.classList.add('removing');
        clone_button.onclick = removeTask;
    }
    tasklist_input.blur();
    toggleRecentlyCompleted();
    updateScrollClass();

    if (nosave) { return false };
    saveTasks();
}

function removeTask(event) {
    if (!event.target) { return false };
    let found_task = event.target.parentElement.parentElement;
    found_task.classList.add('resolved');
    saveTasks();
    toggleRecentlyCompleted();
    setTimeout(function () {
        found_task.remove();
    }, 400);
}

function handleShiftUp(event) {
    if (!event.target) { return false; }
    let origin_task = event.target.parentElement.parentElement;
    let origin_holder = origin_task.parentElement;
    let tasks_array = Array.from(origin_holder.querySelectorAll('.tasklist_entry'));
    let origin_index = tasks_array.indexOf(origin_task);

    if (origin_index < 1) { return false; }
    let previous_task = tasks_array[origin_index - 1];
    origin_task.classList.add('transform_up');
    previous_task.classList.add('transform_down');

    setTimeout(function() {
        origin_task.classList.remove('transform_up');
        previous_task.classList.remove('transform_down');
        tasks_array.splice(origin_index, 1); 
        tasks_array.splice(origin_index - 1, 0, origin_task);

        let all_children = Array.from(origin_holder.children);
        origin_holder.innerHTML = '';

        all_children.forEach(child => {
            if (child.classList.contains('tasklist_entry')) {
                let task = tasks_array.shift();
                origin_holder.appendChild(task);
            } else {
                origin_holder.appendChild(child);
            }
        });
        saveTasks();
    }, 400);
}

function handleShiftDown(event) {
    if (!event.target) { return false; }
    let origin_task = event.target.parentElement.parentElement;
    let origin_holder = origin_task.parentElement;
    let tasks_array = Array.from(origin_holder.querySelectorAll('.tasklist_entry'));
    let origin_index = tasks_array.indexOf(origin_task);

    if (origin_index === -1 || origin_index >= tasks_array.length - 1) { return false; }
    let next_task = tasks_array[origin_index + 1];
    origin_task.classList.add('transform_down');
    next_task.classList.add('transform_up');

    setTimeout(function() {
        origin_task.classList.remove('transform_down');
        next_task.classList.remove('transform_up');
        tasks_array.splice(origin_index, 1); 
        tasks_array.splice(origin_index + 1, 0, origin_task);

        let all_children = Array.from(origin_holder.children);
        origin_holder.innerHTML = '';

        all_children.forEach(child => {
            if (child.classList.contains('tasklist_entry')) {
                let task = tasks_array.shift();
                origin_holder.appendChild(task);
            } else {
                origin_holder.appendChild(child);
            }
        });
        saveTasks();
    }, 400);
}

function resolveEntry(event) {
    if (!event.target) { return false };
    let this_entry = event.target.parentElement.parentElement;
    let span = this_entry.querySelector('span');
    this_entry.classList.add('resolved');

    setTimeout(function () {
        addTask(span.textContent, tasklist_holder_past);
        this_entry.remove();
    }, 400)
}

function addDefaultTasks() {
    addTask('Add some tasks', tasklist_holder);
    addTask('Remove the default task', tasklist_holder)
}

function tasklistInput(event) {
    let raw = removetasklistPlaceholder();
    tasklist_input.classList.toggle('empty', raw.length < 2)
    if (raw.length == 0) {
        setCheckPlaceholder();
    }
}

function tasklistKeyDown(event) {
    let raw = removetasklistPlaceholder();
    if (event.key != 'Enter') { return false };
    event.preventDefault();
    tasklistButton();
}

function tasklistButton() {
    let raw = removetasklistPlaceholder();
    if (raw.length < 2) { return false };
    addTask(raw, tasklist_holder)
    setCheckPlaceholder();
}

function removetasklistPlaceholder() {
    let raw = tasklist_input.textContent.replace('&nbsp;', '');
    return raw;
}

function setCheckPlaceholder() {
    tasklist_input.innerHTML = '&nbsp';
    tasklist_input.classList.add('empty');
}

function tasklistEditing() {
    let edit_active = tasklist_edit.classList.contains('active');
    tasklist_edit.classList.toggle('active', !edit_active);
    tasklist.classList.toggle('editing', !edit_active);

    let all_tasks = tasklist.querySelectorAll('.tasklist_entry');
    for (var i = 0; i < all_tasks.length; i++) {
        let this_task = all_tasks[i];
        let found_span = this_task.querySelector('span');
        if (edit_active) {
            found_span.removeAttribute('contenteditable');
        } else {
            found_span.setAttribute('contenteditable', true);
        }
    }
}

function saveTasks(event) {
    let task_array = [];
    let all_tasks = tasklist.querySelectorAll('.tasklist_entry');
    
    for (var i = 0; i < all_tasks.length; i++) {
        let this_task = all_tasks[i];
        let found_span = this_task.querySelector('span');
        if (this_task.classList.contains('resolved')) { continue };

        task_array.push({
            text: found_span.textContent,
            resolved: this_task.classList.contains('removing')
        });
    }
    let json_save = JSON.stringify(task_array);
    localStorage.setItem('tasks', json_save);

    if (event) {
        if (event.key == 'Enter') { 
            event.preventDefault();
            event.target.blur();
        }
    }
}

function loadTasks() {
    let status_to_holder = {
        true: tasklist_holder_past,
        false: tasklist_holder
    }

    let found_save = localStorage.getItem('tasks');
    if (!found_save) { 
        addDefaultTasks();
        return false 
    };
    let save_data = JSON.parse(found_save);
    for (var i = 0; i < save_data.length; i++) {
        let this_entry = save_data[i];
        addTask(this_entry.text, status_to_holder[this_entry.resolved], true)
    }
}

loadTasks();
tasklist_input.addEventListener('input', tasklistInput);
tasklist_input.addEventListener('keydown', tasklistKeyDown);
tasklist_add.addEventListener('mouseup', tasklistButton);
tasklist_edit.addEventListener('mouseup', tasklistEditing);