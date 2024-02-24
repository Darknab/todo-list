import { categories } from "./categories";

const tasks = document.querySelector('.tasks');

function addElement(task) {
  const element = document.createElement('div');
  element.classList.add('task-element');
  const taskTitle = document.createElement('span');
  taskTitle.textContent = task.title;
  const taskDueDate = document.createElement('span');
  taskDueDate.textContent = task.dueDate;

  element.append(taskTitle, taskDueDate);
  tasks.append(element);
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
}
