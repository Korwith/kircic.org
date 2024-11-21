const checklist_placeholder = document.querySelector('#checklist_entry_placeholder')
const checklist = document.querySelector('.page.checklist');
const checklist_bar = checklist.querySelector('.checklist_bar');
const checklist_input = checklist_bar.querySelector('span');
const checklist_add = checklist_bar.querySelector('.add');
const checklist_holder = checklist.querySelector('.holder');
const checklist_holder_past = checklist.querySelector('.previous');

function toggleRecentlyCompleted() {
    checklist_holder_past.classList.toggle('hide', !checklist_holder_past.querySelector('.checklist_entry'))
}

function addTask(text, holder) {
    let clone = checklist_placeholder.cloneNode(true);
    let clone_span = clone.querySelector('span');
    let clone_button = clone.querySelector('button');
    clone_span.textContent = text;
    clone_button.onclick = resolveEntry;
    clone.removeAttribute('id');
    holder.appendChild(clone);

    if (holder == checklist_holder_past) {
        clone.classList.add('removing');
        clone_button.onclick = removeTask;
    }
    checklist_input.blur();
    toggleRecentlyCompleted();
    updateScrollClass();
}

function removeTask(event) {
    if (!event.target) { return false };
    let found_task = event.target.parentElement;
    found_task.classList.add('resolved');
    setTimeout(function() {
        found_task.remove();
        toggleRecentlyCompleted();
    }, 400);
}

function resolveEntry(event) {
    if (!event.target) { return false };
    let this_entry = event.target.parentElement;
    let span = this_entry.querySelector('span');
    this_entry.classList.add('resolved');

    setTimeout(function() {
        addTask(span.textContent, checklist_holder_past);
        this_entry.remove();
    }, 400)
}

function addDefaultTasks() {
    addTask('Add some tasks', checklist_holder);
    addTask('Take the trash out', checklist_holder)
    addTask('Stay hydrated', checklist_holder)
}

function checklistInput(event) {
    let raw = removeChecklistPlaceholder();
    checklist_input.classList.toggle('empty', raw.length < 2)
    if (raw.length == 0) {
        setCheckPlaceholder();
    }
}

function checklistKeyDown(event) {
    let raw = removeChecklistPlaceholder();
    if (event.key != 'Enter') { return false };
    event.preventDefault();
    checklistButton();
}

function checklistButton() {
    let raw = removeChecklistPlaceholder();
    if (raw.length < 2) { return false };
    addTask(raw, checklist_holder)
    setCheckPlaceholder();
}

function removeChecklistPlaceholder() {
    let raw = checklist_input.textContent.replace('&nbsp;', '');
    return raw;
}

function setCheckPlaceholder() {
    checklist_input.innerHTML = '&nbsp';
    checklist_input.classList.add('empty');
}

addDefaultTasks();
checklist_input.addEventListener('input', checklistInput);
checklist_input.addEventListener('keydown', checklistKeyDown);
checklist_add.addEventListener('mouseup', checklistButton);