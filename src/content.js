import { getCategories } from "./categories";

let categories = getCategories();

const tasks = document.querySelector('.tasks');

function createCheckBox(task) {
  const box = document.createElement('button');
  box.id = task.title;
  box.classList.add('check');
  if (task.complete === true) {
    box.textContent = String.fromCharCode(10004) + ' completed';
    box.disabled = true;
  } else box.textContent = 'Mark as complete';
  return box;
}

function handleCheckBox(task) {
  document.addEventListener('click', (e) => {
    if (e.target.id === task.title && e.target.classList.contains('check')) {
      task.complete = true;
      e.target.textContent = String.fromCharCode(10004) + ' completed';
      e.target.disabled = true;
      e.target.parentNode.classList.add('complete');
      const element = e.target.parentNode.parentNode;
      colorize(task, element);
      const updatedCategories = JSON.stringify(categories);
      localStorage.setItem('categories', updatedCategories);
    }
  })
}

function createDeleteBtn(task) {
  const btn = document.createElement('button');
  btn.id = `del-${task.title}`;
  btn.classList.add('delete');
  btn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  return btn;
}

function addElement(task) {
  const element = document.createElement('div');
  element.classList.add('task-element');
  const firstLine = document.createElement('div');
  firstLine.classList.add('first-line');
  const taskTitle = document.createElement('span');
  taskTitle.classList.add('task-title');
  taskTitle.textContent = task.title;
  const taskDueDate = document.createElement('span');
  taskDueDate.classList.add('task-date');
  const more = document.createElement('button');
  more.classList.add('show-more');
  more.innerHTML = '<i class="fa-solid fa-caret-down"></i>';
  more.role = 'link';
  taskDueDate.textContent = task.dueDate;
  const checkBox = createCheckBox(task);
  const deleteBtn = createDeleteBtn(task);

  const taskDescription = document.createElement('p');
  taskDescription.classList.add('task-description', 'closed');
  taskDescription.textContent = task.description;

  firstLine.append(taskTitle, taskDueDate, more, checkBox, deleteBtn);
  if (task.complete === true) {
    firstLine.classList.add('complete');
  }
  handleCheckBox(task);
  element.append(firstLine, taskDescription);
  colorize(task, element);
  tasks.append(element);
}

function colorize(task, element) {
  if (task.complete === true) {
    element.classList.add('task-complete');
  } else {
    switch(task.priority) {
      case 'high-priority':
        element.classList.add('high-priority');
        break;
      case 'important':
        element.classList.add('important');
        break;
      case 'less important':
        element.classList.add('less-important');
        break;
      case 'defer': 
        element.classList.add('defer');
        break;
    }
  }
}

export function displayTasks() {
  //refresh data
  categories = getCategories();
  tasks.textContent = '';
  let active;
  // Display tasks contained in the active category
  // If no category is selected, display the first category (Default)
  if (document.querySelector('.active')) {
    active = document.querySelector('.active');
  } else active = document.querySelector('.category');
  const catName = active.textContent;
  const tasksList = categories[catName];
  if (tasksList.length === 0) {
    const empty = document.createElement('p');
    empty.classList.add('empty-list');
    empty.textContent = `No tasks yet in ${catName}!`;
    tasks.appendChild(empty);
  } else {
    tasksList.forEach(task => {
      addElement(task);
    });
  }
}
