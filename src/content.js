import { categories } from "./categories";

const tasks = document.querySelector('.tasks');

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
  const taskDescription = document.createElement('p');
  taskDescription.classList.add('task-description', 'closed');
  taskDescription.textContent = task.description;

  firstLine.append(taskTitle, taskDueDate, more)
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
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('category')) {
      tasks.textContent = '';
      const catName = e.target.textContent;
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
    }
  })
  showMore();
}
