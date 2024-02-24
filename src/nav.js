import { categories } from "./categories";

const categoriesList = document.querySelector('.categories-list');

export function displayCategories() {
  for (const category in categories) {
    const element = document.createElement('li');
    element.textContent = category;
    element.classList.add('category');
    categoriesList.appendChild(element);
  }
}

