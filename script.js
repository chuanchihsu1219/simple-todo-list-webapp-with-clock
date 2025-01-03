// Add a task to the list
function add_task() {
    // Get the list, input and text
    const ul = document.getElementById('list');
    const input = document.getElementById('input');
    const text = input.value;

    // Check if the input is empty
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new task
    const new_task = document.createElement('li');
    new_task.classList.add('task');

    // Add the text
    new_task.innerText = text;

    // Add the checkbox
    new_task.onclick = check_task

    // Add the delete button
    const delete_button = document.createElement('span');
    delete_button.classList.add('delete');
    delete_button.onclick = delete_task;

    // Add the delete button icon
    new_task.appendChild(delete_button);
    ul.appendChild(new_task);

    // Clear the input
    input.value = '';
}

// Check or uncheck a task
function check_task(event) {
    const task = event.target;
    task.classList.toggle('checked');
}

// Delete a task
function delete_task(event) {
    const task = event.target.parentElement;
    task.remove();
}

// Add task when the add button is clicked
const add_button = document.getElementById('add-button');
add_button.addEventListener('click', add_task);

// Prevent form reloading the page
const form = document.getElementById('input-wrapper');
form.addEventListener('submit', (event) => {
    event.preventDefault();
});