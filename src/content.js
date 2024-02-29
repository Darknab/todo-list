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

  // handleCheckBox(task);
  return box;
}

function handleCheckBox(task) {
  document.addEventListener('click', (e) => {
    if (e.target.id === task.title) {
      task.complete = true;
      e.target.textContent = String.fromCharCode(10004) + ' completed';
      e.target.disabled = true;
      e.target.parentNode.classList.add('complete')
      console.log('disabled');
      const updatedCategories = JSON.stringify(categories);
      localStorage.setItem('categories', updatedCategories);
    }
  })
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

  const taskDescription = document.createElement('p');
  taskDescription.classList.add('task-description', 'closed');
  taskDescription.textContent = task.description;

  firstLine.append(checkBox, taskTitle, taskDueDate, more)
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

// export function displayTasks() {
//   document.addEventListener('click', (e) => {
//     if (e.target.classList.contains('category')) {
//       refresh data
//       categories = getCategories();
//       tasks.textContent = '';
//       const catName = e.target.textContent;
//       const tasksList = categories[catName];
//       if (tasksList.length === 0) {
//         const empty = document.createElement('p');
//         empty.classList.add('empty-list');
//         empty.textContent = `no tasks yet in ${catName}!`;
//         tasks.appendChild(empty);
//       } else {
//         tasksList.forEach(task => {
//           addElement(task);
//         });
//       }
//     }
//   })
//   showMore();
// }

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
