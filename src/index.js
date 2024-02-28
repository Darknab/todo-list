import '/src/assets/stylesheets/style.css';

import { Todo } from "./todo";
import { displayCategories } from './nav';
import { displayTasks } from './content';
import { getCategories } from './categories';
import { format } from 'date-fns';

const categories = getCategories();

displayCategories();
displayTasks();

const dialog = document.querySelector('dialog');

const addTask = document.querySelector('#add-task');
addTask.addEventListener('click', () => {
  dialog.showModal();
  populateSelect();
})

function clearElement(element) {
  element.innerHTML = '';
}

function populateSelect() {
  const select = document.querySelector('#select-category');
  // Clear the select node to refresh the categories list
  clearElement(select);
  const cat = getCategories();
  for (const catName in cat ) {
    const option = document.createElement('option');
    option.value = catName;
    option.textContent = catName;
    select.appendChild(option);
  }
}

const submitTask = document.querySelector('#submit-task');
submitTask.addEventListener('click', (e) => {
  e.preventDefault();
  const task = createTask();
  saveTask(task);
  displayCategories();
  dialog.close();
})

function createTask() {
  const task = new Todo;
  task.title = document.querySelector('#title').value;
  task.description = document.querySelector('#description').value;
  task.category = document.querySelector('#select-category').value;
  const date = document.querySelector('#due-date').value;
  const formattedDate = format(new Date(date), 'dd/MM/yyyy');
  task.date = formattedDate;
  task.priority = document.querySelector('#priority');
  task.complete = false;
  return task;
}

function saveTask(task) {
  categories[task.category].push(task);
  const updatedCategories = JSON.stringify(categories);
  localStorage.setItem('categories', updatedCategories);
}

