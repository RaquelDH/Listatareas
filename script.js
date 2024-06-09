const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterAll = document.getElementById('filter-all');
const filterActive = document.getElementById('filter-active');
const filterCompleted = document.getElementById('filter-completed');

let tasks = [];

// Event listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', toggleTask);
filterAll.addEventListener('click', filterTasks);
filterActive.addEventListener('click', filterTasks);
filterCompleted.addEventListener('click', filterTasks);

// Functions
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        li.classList.add(task.completed ? 'completed' : 'active');
        li.dataset.index = index;
        li.appendChild(createDeleteButton());
        taskList.appendChild(li);
    });
}

function createDeleteButton() {
    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.classList.add('delete');
    return button;
}

function addTask(event) {
    event.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName === '') return;
    tasks.push({ name: taskName, completed: false });
    renderTasks();
    taskInput.value = '';
}

function toggleTask(event) {
    if (!event.target.classList.contains('delete')) {
        const index = event.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    } else {
        const index = event.target.parentElement.dataset.index;
        tasks.splice(index, 1);
        renderTasks();
    }
}

function filterTasks(event) {
    const filter = event.target.id.split('-')[1];
    const filteredTasks = filter === 'all' ? tasks :
        filter === 'active' ? tasks.filter(task => !task.completed) :
        tasks.filter(task => task.completed);
    renderFilteredTasks(filteredTasks);
    toggleActiveButton(event.target);
}

function renderFilteredTasks(filteredTasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        li.classList.add(task.completed ? 'completed' : 'active');
        li.dataset.index = tasks.indexOf(task);
        li.appendChild(createDeleteButton());
        taskList.appendChild(li);
    });
}

function toggleActiveButton(targetButton) {
    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach(button => button.classList.remove('active'));
    targetButton.classList.add('active');
}
