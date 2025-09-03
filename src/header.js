import { projectModule } from "./index";
import { todoModule } from "./index";
import { renderProjects } from "./dom";

export function renderHeader() {
  const header = document.querySelector("header");
  const addTodoBtn = document.querySelector("#todo-add");
  addTodoBtn.addEventListener("click", function () {
    console.log("clicked");
    const dialog = document.querySelector(".dialog");
    if (!dialog) {
      console.error("Dialog not found in DOM");
      return;
    }
    // Remove any previously appended form
    const oldForm = dialog.querySelector("form");
    if (oldForm) oldForm.remove();
    // Create form
    const form = document.createElement("form");
    form.setAttribute("method", "dialog");
    form.classList.add("todoAdd-form");
    // project selection dropdown
    // When opening the "Add Todo" form

    const projectselectionLabel = document.createElement("label");
    projectselectionLabel.textContent = "Project Selection:";
    const projectSelect = document.createElement("select");
    projectSelect.name = "projects";

    projectModule.getProjects().forEach((project) => {
      const option = document.createElement("option");
      option.value = project.name.toLowerCase();
      option.textContent = project.name;
      projectSelect.appendChild(option);
    });
    const option = document.createElement("option");
    option.value = "new";
    option.textContent = "➕ Create New Project";
    projectSelect.appendChild(option);

    //input for new project add dropdown

    const newProjectInput = document.createElement("input");
    newProjectInput.type = "text";
    newProjectInput.name = "text";
    newProjectInput.placeholder = "Add name of new Project";
    newProjectInput.required = true;
    newProjectInput.style.display = "none"; // hide by default
newProjectInput.required = false; // default
    // Title
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.required = true;

    // Due Date
    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Due Date:";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "dueDate";

    // Priority
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority:";
    const prioritySelect = document.createElement("select");
    prioritySelect.name = "priority";

    ["Low", "Medium", "High"].forEach((level) => {
      const option = document.createElement("option");
      option.value = level.toLowerCase();
      option.textContent = level;
      prioritySelect.appendChild(option);
    });

    // Buttons
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Save";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => dialog.close());
    // Append all
    form.append(
      document.createElement("br"),
      projectselectionLabel,
      projectSelect,
      newProjectInput,
      document.createElement("br"),
      titleLabel,
      titleInput,
      document.createElement("br"),
      dateLabel,
      dateInput,
      document.createElement("br"),
      priorityLabel,
      prioritySelect,
      document.createElement("br"),
      submitBtn,
      cancelBtn
    );

    dialog.appendChild(form);

    projectSelect.addEventListener("change", function () {
      console.log("changes");
      if (projectSelect.value === "new") {
        // Show input if user selects "➕ Create New Project"

        newProjectInput.style.display = "inline-block";
        newProjectInput.focus(); // optional: focus immediately
      } else {
        // Hide input if existing project is selected
        newProjectInput.style.display = "none";
        newProjectInput.value = ""; // optional: clear old input
      }
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let projectId;
      if (projectSelect.value === "new") {
        const newProjectName = newProjectInput.value;
        projectId = projectModule.addnameProject(newProjectName); // should return new ID

        // Re-render dropdown options
        projectSelect.innerHTML = ""; // clear all
        projectModule.getProjects().forEach((project) => {
          const option = document.createElement("option");
       option.value = project.id; // use ID
          option.textContent = project.name;
          projectSelect.appendChild(option);
        });

        // Add "Create New Project" option again
        const newOption = document.createElement("option");
        newOption.value = "new";
        newOption.textContent = "➕ Create New Project";
        projectSelect.appendChild(newOption);

        // Select the newly added project
        projectSelect.value = projectId;
      } else {
       // find the project by name and get its id
    const selectedProject = projectModule.getProjects().find(
        (proj) => proj.name.toLowerCase() === projectSelect.value
    );
    projectId = selectedProject.id;
      }

      const todoObj = {
        title: titleInput.value,
        dueDate: dateInput.value,
        priority: prioritySelect.value,
         id: crypto.randomUUID(), // unique todo id
      };

      todoModule.addTodo(projectId, todoObj);
      dialog.close();
      renderProjects();
      projectModule.getProjects();
    });
    dialog.showModal();
  });
}
