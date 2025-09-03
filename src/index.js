import { createProjects } from "./project";
import { createTodo } from "./todo";
import { renderProjects } from "./dom";
import { loadProjects, saveProjects } from "./storage";

import './style.css';

// 1️Load projects from localStorage (if any)
let projectsFromStorage = loadProjects();

// 2️ Initialize project module
export const projectModule = createProjects();
export const todoModule = createTodo(projectModule.getProjects);
if (projectsFromStorage) {
const projects = projectModule.getProjects();
  projects.length = 0;  // clear defaults
  projects.push(...projectsFromStorage);
} else {
  // First run → save default projects into storage
  saveProjects(projectModule.getProjects());
}

// 4️ Render projects to the DOM
renderProjects();







// // Initialize project module
// export const projectModule = createProjects();
// export const todoModule = createTodo(projectModule.getProjects);


//   projectsData = projectModule.getProjects();

//   // projectModule.addnameProject("Home");
//   // projectModule.addnameProject("Work");

//   //let allProjects = projectModule.getProjects();

//   // //  delete "Fitness" safely only if it exists
//   // const indexOfele = allProjects.findIndex(
//   //   (project) => project.name === "Fitness"
//   // );
//   // let idTodelet = allProjects[indexOfele].id;
//   // projectModule.deleteProject(idTodelet);
//   // // Refresh the array after deletion
//   // allProjects = projectModule.getProjects();
//   // console.log("After deletion:", allProjects);

//   // Add todo to Home
//   // const homeProject = allProjects.find((p) => p.name === "Home");
//   // todoModule.addTodo(homeProject.id, {
//   //   title: "change curtains",
//   //    dueDate:"2025-09-02"   ,
//   //   priority: "low",
//   // });
//   // todoModule.addTodo(homeProject.id, {
//   //   title: "Clean garage",
//   //    dueDate:"2025-09-02"   ,
//   //   priority: "Medium",
//   // });

//   // // Add todos to Work
//   // const workProject = allProjects.find((p) => p.name === "Work");
//   // todoModule.addTodo(workProject.id, {
//   //   title: "Prepare presentation",
//   //    dueDate:"2025-09-02"   ,
//   //   priority: "High",
//   // });
//   // todoModule.addTodo(workProject.id, {
//   //   title: "Send client email",
//   //    dueDate:"2025-09-02"   ,
//   //   priority: "Medium",
//   // });



// //console.log("After adding todo in home project:", allProjects);
// // // Delete todo from Hobbies
// // const hobbiesProject = allProjects.find((p) => p.name === "Hobbies");
// // console.table(hobbiesProject.todos);
// // const todoToDelete = hobbiesProject.todos.find(
// //   (t) => t.title === "Read a book"
// // );
// // console.log(todoToDelete);
// // if (todoToDelete) {
// //   todoModule.deleteTodo(hobbiesProject.id, todoToDelete.id);
// // }
// // allProjects = projectModule.getProjects();
// // console.log("After deletion in hobbies:", allProjects);

// // // change complete status of 'Paint landscape'
// // const todolandscpe = hobbiesProject.todos.find(
// //   (t) => t.title === "Paint landscape"
// // );
// // console.log(todolandscpe);

// // if (todolandscpe) {
// //   todoModule.toggleCompleted(hobbiesProject.id, todolandscpe.id);
// // }

// // allProjects = projectModule.getProjects();
// // console.table( hobbiesProject.todos);

// // //update todo

// // todoModule.updateTodo(hobbiesProject.id, todolandscpe.id,{priority:"low"})

// // allProjects = projectModule.getProjects();
// // console.table( allProjects);

// renderProjects();
// //renderTodos(projectModule.getProjects())
