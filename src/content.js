import { getCategories } from "./categories";

let categories = getCategories();

const tasks = document.querySelector('.tasks');

function createCheckBox(task) {
  const box = document.createElement('button');
  box.id = task.title;

  if (task.complete === true) {
    box.textContent = String.fromCharCode(10004) + ' completed';
    box.disabled = true;
  } else box.textContent = 'Mark as complete';
  return box;
}

function handleCheckBox(task) {
  document.addEventListener('click', (e) => {
    if (e.target.id === task.title) {
      task.complete = true;
      e.target.textContent = String.fromCharCode(10004) + ' completed';
      e.target.disabled = true;
      e.target.parentNode.classList.add('complete');
      const updatedCategories = JSON.stringify(categories);
      localStorage.setItem('categories', updatedCategories);
    }
  })
}

function createDeleteBtn(task) {
  const btn = document.createElement('button');
  btn.id = `del-${task.title}`;
  btn.classList.add('delete');
  btn.textContent = 'Delete';
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
  more.classList.add('more');
  more.textContent = 'Show more';
  more.role = 'link';
  taskDueDate.textContent = task.dueDate;
  const checkBox = createCheckBox(task);
  const deleteBtn = createDeleteBtn(task);

  const taskDescription = document.createElement('p');
  taskDescription.classList.add('task-description', 'closed');
  taskDescription.textContent = task.description;

  firstLine.append(checkBox, taskTitle, taskDueDate, more, deleteBtn);
  if (task.complete === true) {
    firstLine.classList.add('complete');
  }
  handleCheckBox(task);
  element.append(firstLine, taskDescription);
  tasks.append(element);
}

function toggleButtonText(target) {
  if (target.textContent === 'Show more') {
    target.textContent = 'Show less';
  } else target.textContent = 'Show more';
}

function showMore() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('more')) {
      //select the task-element div related to the button
      const task = e.target.parentNode.parentNode;
      const description = task.querySelector('.task-description');
      description.classList.toggle('closed');
      toggleButtonText(e.target);
    }
  })
}

export function displayTasks() {
  //refresh data
  categories = getCategories();
  tasks.textContent = '';
  const catName = document.querySelector('.active').textContent;
  const tasksList = categories[catName];
  if (tasksList.length === 0) {
    const empty = document.createElement('p');
    empty.classList.add('empty-list');
    empty.textContent = `no tasks yet in ${catName}!`;
    tasks.appendChild(empty);
  } else {
    tasksList.forEach(task => {
      addElement(task);
    });
  }
  showMore();
}
