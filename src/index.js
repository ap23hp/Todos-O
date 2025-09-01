import { createProjects } from "./project";
import { createTodo } from "./todo";
const projectModule = createProjects();
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

const todoModule = createTodo(projectModule.getProjects);
// Add todo to Home
const homeProject = allProjects.find((p) => p.name === "Home");
todoModule.addTodo(homeProject.id, {
  title: "change curtains",
  dueDate: "22 sept",
  priority: "low",
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
console.table( hobbiesProject.todos);