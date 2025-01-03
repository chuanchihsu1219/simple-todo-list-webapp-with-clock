let task_list = [];
const list_key = 'task_list';

function load_task_list() {
    const task_list_string = localStorage.getItem(list_key);
    if (task_list_string !== null) {
        return JSON.parse(task_list_string);
    }
    return [];
}

function c() {
    localStorage.clear();
}

function save_task_list() {
    localStorage.setItem(list_key, JSON.stringify(task_list));
}

function init_list() {
    task_list = load_task_list();
    console.log(task_list);
    for (task of task_list) {
        add_task(task.text, task.checked);
    }
}


function add_task_with_input() {
    const input = document.getElementById('input');
    const text = input.value;
    input.value = '';

    // Check if the input is empty
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    // Check if the task already exists
    if (Array.from(task_list).some((task) => task.text === text)) {
        alert('This task already exists!');
        return;
    }

    new_task = add_task(text);
    task_list.push({ text: text, checked: false });
    save_task_list();
}

// Add a task to the list
function add_task(text, checked = false) {
    // Get the list, input and text
    const ul = document.getElementById('list');

    // Create a new task
    const new_task = document.createElement('li');
    new_task.classList.add('task');

    // Add the text
    new_task.innerText = text;

    // Add the checkbox
    new_task.onclick = check_task
    if (checked) {
        new_task.classList.add('checked');
    }

    // Add the delete button
    const delete_button = document.createElement('span');
    delete_button.classList.add('delete');
    delete_button.onclick = delete_task;

    // Add the delete button icon
    new_task.appendChild(delete_button);
    ul.appendChild(new_task);
}

// Check or uncheck a task
function check_task(event) {
    const task = event.target;
    task.classList.toggle('checked');

    const index = Array.from(task.parentElement.children).indexOf(task);
    console.log(task_list);

    task_list[index].checked = !task_list[index].checked;
    console.log(task_list);
    save_task_list();
}

// Delete a task
function delete_task(event) {
    const task = event.target.parentElement;
    const index = Array.from(task.parentElement.children).indexOf(task);
    task_list = task_list.filter((_, i) => i !== index);
    save_task_list();
    task.remove();
}

// Add task when the add button is clicked
const add_button = document.getElementById('add-button');
add_button.addEventListener('click', add_task_with_input);
init_list();

// Prevent form reloading the page
const form = document.getElementById('input-wrapper');
form.addEventListener('submit', (event) => {
    event.preventDefault();
});