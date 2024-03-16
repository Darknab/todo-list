// Create categories in localStorage
function createCategories() {
  const categories = {
    'Default': [],
  }
  localStorage.setItem('categories', JSON.stringify(categories));
  return categories;
}

// Retrieve categories from localStorage
function retieveCategories() {
  const categories = localStorage.getItem('categories');

  return JSON.parse(categories);
}

export function getCategories() {
  if (!localStorage.getItem('categories')) {
    return createCategories();
  } else return retieveCategories();
}





