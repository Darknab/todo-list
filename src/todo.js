import { getCategories } from "./categories";

const categories = getCategories();

class Todo {
  constructor (title, description, dueDate, priority, complete, category) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = complete;
    this.category = category;
  }

  updateCategory() {
    const cat = this.category;
    console.log(categories.cat)
    if (cat in categories) {
      categories[cat].push(this);
    }
  }
}

export { Todo };