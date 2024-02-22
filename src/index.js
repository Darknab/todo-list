import '/src/assets/stylesheets/style.css';

import { Todo } from "./todo";
import { categories } from "./categories";

const newNote = new Todo;

newNote.title = 'New note';
newNote.category = 'default';
newNote.complete = false;
newNote.description = 'A very important thing to do';
newNote.dueDate = '21/02/2024';
newNote.priority = 'Urgent';


newNote.updateCategory();

console.log(categories)



