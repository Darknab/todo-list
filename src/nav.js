import { getCategories } from "./categories";

let categories = getCategories();

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
  displayCategories();
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
  // Delete all previous content in case of a refresh and retrieve a fresh version on categories
  // but keeping the active one...active
  const activeCategory = checkActiveCategory();
  categoriesList.innerHTML = '';
  categories = getCategories();
  for (const category in categories) {
    displayElement(category);
  }
  restoreActive(activeCategory);
}

function checkActiveCategory() {
  const list = document.querySelectorAll('.category');
  let activeElement;
  list.forEach((element) => {
    if (element.classList.contains('active')) {
      activeElement = element
    }
  })
  return activeElement;
}

function restoreActive(activeCategory) {
  if (activeCategory instanceof Element) {
    const content = activeCategory.textContent;
    const list = document.querySelectorAll('.category');
    list.forEach((element) => {
      if (element.textContent === content) {
        element.classList.add('active');
      }
    })
  }

}
