import { createProjects } from "./project";

export function createTodo(getProjects) {
  function addTodo(projectId, todoObj) {
    const project = getProjects().find((project) => project.id === projectId);
    project
      ? // assign an id to the todo
        project.todos.push({ id: crypto.randomUUID(), ...todoObj })
      : console.log(" no such project");
  }

  // function updateTodo(projectId, todoId, updatedData) {

  // }

  function deleteTodo(projectId, todoId) {
    const project = getProjects().find((project) => project.id === projectId);
    if (project) {
      project.todos = project.todos.filter((todo) => todo.id !== todoId);
    } else {
      console.log("No such project");
    }
  }

  // function toggleCompleted(projectId, todoId) {
  // //→ mark complete/incomplete
  // }

  return {
    addTodo,
    // ,updateTodo,
    deleteTodo,
    //toggleCompleted
  };
}
