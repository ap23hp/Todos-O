import { createProjects } from "./project";
import { createTodo } from "./todo";
import { renderProjects } from "./dom";
//import { renderTodos } from "./dom";

import './style.css';
 export const projectModule = createProjects();
projectModule.addnameProject("Home");
projectModule.addnameProject("Work");
 


let allProjects = projectModule.getProjects();
console.log("Before deletion:", allProjects);
//  delete "Fitness" safely only if it exists
const indexOfele = allProjects.findIndex(
  (project) => project.name === "Fitness"
);
let idTodelet = allProjects[indexOfele].id;
projectModule.deleteProject(idTodelet);
// Refresh the array after deletion
allProjects = projectModule.getProjects();
console.log("After deletion:", allProjects);

export const todoModule = createTodo(projectModule.getProjects);
// Add todo to Home
const homeProject = allProjects.find((p) => p.name === "Home");
todoModule.addTodo(homeProject.id, {
  title: "change curtains",
  dueDate: "22 sept",
  priority: "low",
});
todoModule.addTodo(homeProject.id, {
  title: "Clean garage",
  dueDate: "23 Sept",
  priority: "Medium",
});

// Add todos to Work
const workProject = allProjects.find((p) => p.name === "Work");
todoModule.addTodo(workProject.id, {
  title: "Prepare presentation",
  dueDate: "25 Sept",
  priority: "High",
});
todoModule.addTodo(workProject.id, {
  title: "Send client email",
  dueDate: "24 Sept",
  priority: "Medium",
});


allProjects = projectModule.getProjects();
console.log("After adding todo in home project:", allProjects);
// Delete todo from Hobbies
const hobbiesProject = allProjects.find((p) => p.name === "Hobbies");
console.table(hobbiesProject.todos);
const todoToDelete = hobbiesProject.todos.find(
  (t) => t.title === "Read a book"
);
console.log(todoToDelete);
if (todoToDelete) {
  todoModule.deleteTodo(hobbiesProject.id, todoToDelete.id);
}
allProjects = projectModule.getProjects();
console.log("After deletion in hobbies:", allProjects);

// change complete status of 'Paint landscape'
const todolandscpe = hobbiesProject.todos.find(
  (t) => t.title === "Paint landscape"
);
console.log(todolandscpe);

if (todolandscpe) {
  todoModule.toggleCompleted(hobbiesProject.id, todolandscpe.id);
}

allProjects = projectModule.getProjects();
console.table( hobbiesProject.todos);


//update todo

todoModule.updateTodo(hobbiesProject.id, todolandscpe.id,{priority:"low"})

allProjects = projectModule.getProjects();
console.table( allProjects);

renderProjects()
//renderTodos(projectModule.getProjects())