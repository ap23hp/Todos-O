import { saveProjects } from "./storage";
export function createTodo(getProjects) {
  function addTodo(projectId, todoObj) {
    const project = getProjects().find((project) => project.id === projectId);
    if(project){
  project.todos.push({ id: crypto.randomUUID(), ...todoObj })
        saveProjects(getProjects()); 
    }
     else{
 console.log(" no such project");
     }
  }

  function updateTodo(projectId, todoId, updatedData) {
    const project = getProjects().find((project) => project.id === projectId);

    if (!project) {
      console.log("No such project");
      return;
    }
    const todo = project.todos.find((todo) => todo.id === todoId);

    if (!todo) {
      console.log("No such todo");
      return;
    }
    // Update the existing todo object directly
    Object.assign(todo, updatedData);
    saveProjects(getProjects())
    console.log("Todo updated:", todo);
  }

  function deleteTodo(projectId, todoId) {
    const project = getProjects().find((project) => project.id === projectId);
    if (project) {
      project.todos = project.todos.filter((todo) => todo.id !== todoId);
     saveProjects(getProjects())
    } else {
      console.log("No such project");
    }
  }
  function toggleCompleted(projectId, todoId) {
    // mark complete/incomplete
    const project = getProjects().find((project) => project.id === projectId);
    if (project) {
      let todo = project.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.completed = !todo.completed; // flip true/false
       saveProjects(getProjects());
      }
    }
  }

  return {
    addTodo,
    updateTodo,
    deleteTodo,
    toggleCompleted,
  };
}
