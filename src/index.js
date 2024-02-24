import '/src/assets/stylesheets/style.css';

import { Todo } from "./todo";
import { categories } from "./categories";
import { displayCategories } from './nav';
import { displayTasks } from './content';

const newNote = new Todo;

newNote.title = 'New note';
newNote.category = 'default';
newNote.complete = false;
newNote.description = 'A very important thing to do';
newNote.dueDate = '21/02/2024';
newNote.priority = 'Urgent';

const task1 = new Todo('Task 1', 'blablabla', '28/02/2024', 'important', false, 'work');
const task2 = new Todo('Task 2', 'blablabla', '26/02/2024', 'not important', false, 'work');
const task3 = new Todo('Task 3', 'blablabla', '06/03/2024', 'important', true, 'work');
const task4 = new Todo('Task 4', 'blablabla', '28/02/2024', 'dunno', false, 'hobbies');
const task5 = new Todo('Task 5', 'blablabla', '28/02/2024', 'important', false, 'work');
const task6 = new Todo('Task 6', 'blablabla', '28/02/2024', 'important', false, 'hobbies');

console.log(task1)
task1.updateCategory();
task2.updateCategory();
task3.updateCategory();
task4.updateCategory();
task5.updateCategory();
task6.updateCategory();


newNote.updateCategory();

console.log(categories);

displayCategories();
displayTasks();



