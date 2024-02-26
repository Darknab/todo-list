import { getCategories } from "./categories";

const categories = getCategories();

const categoriesList = document.querySelector('.categories-list');

function displayElement(category) {
  const element = document.createElement('li');
  element.textContent = category;
  element.classList.add('category');
  categoriesList.appendChild(element);
}

const submitBtn = document.querySelector('#submit-category');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.querySelector('#category-input');
  categories[input.value] = [];
  const updatedCategories = JSON.stringify(categories);
  localStorage.setItem('categories', updatedCategories);
  displayElement(input.value);
  toggleForm();
  input.value = '';
  toggleAddBtn();
});

function toggleForm() {
  const form = document.querySelector('.category-form');
  form.classList.toggle('hidden');
}

function toggleAddBtn() {
  addBtn.classList.toggle('hidden');
}

const addBtn = document.querySelector('#add-category-btn');
addBtn.addEventListener('click', () => {
  toggleForm();
  toggleAddBtn();
})

export function displayCategories() {
  for (const category in categories) {
    displayElement(category);
  }
}
