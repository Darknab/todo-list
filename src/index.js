import '/src/assets/stylesheets/style.css';

import { Todo } from "./todo";
import { displayCategories } from './nav';
import { displayTasks } from './content';
import { getCategories } from './categories';
import { format } from 'date-fns';

let categories = getCategories();

displayCategories();

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
  displayTasks();
  dialog.close();
})

function createTask() {
  const task = new Todo;
  task.title = document.querySelector('#title').value;
  task.description = document.querySelector('#description').value;
  task.category = document.querySelector('#select-category').value;
  const date = document.querySelector('#due-date').value;
  const formattedDate = format(new Date(date), 'MM/dd/yyyy');
  task.dueDate = formattedDate;
  task.priority = document.querySelector('#priority').value;
  task.complete = false;
  return task;
}

function saveTask(task) {
  categories[task.category].push(task);
  const updatedCategories = JSON.stringify(categories);
  localStorage.setItem('categories', updatedCategories);
  displayCategories();
}

// Event listener to select the active category

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('category')) {
    const categoriesList = document.querySelectorAll('.category');
    categoriesList.forEach((element) => {
      element.classList.remove('active');
    })
    e.target.classList.add('active');
    displayTasks();
  }
})

//Handle the delete button

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('delete')) {
    // find the right task in the right category and deletes it
    const activeCategory = document.querySelector('.active').textContent;
    const taskTitle = e.target.id.slice(4);
    let task
    categories[activeCategory].forEach((element) => {
      if (element.title === taskTitle) {
        task = element;
      }
    })
    const index = categories[activeCategory].indexOf(task);
    categories[activeCategory].splice(index, 1);
    const updatedCategories = JSON.stringify(categories);
    localStorage.setItem('categories', updatedCategories);
    displayTasks();
  }
})
