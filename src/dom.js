import { projectModule } from "./index";
import { todoModule } from "./index";
import { format, parseISO } from "date-fns";
import { renderHeader } from "./header";
let container = document.querySelector(".container");
console.log(container);
const dialog = document.querySelector(".dialog");
console.log(document.querySelector(".dialog")); // should NOT be null
export function renderProjects() {
  const projects = projectModule.getProjects();
  container.innerHTML = ""; // clear old stuff before re-rendering

  projects.forEach((project) => {
    const div = document.createElement("div");

    const headingProject = document.createElement("h3");
    headingProject.textContent = project.name;
    div.appendChild(headingProject);

    const ul = document.createElement("ul"); // append ul once per project

    project.todos.forEach((todo) => {
      const editbtn = document.createElement("button");
      const completebtn = document.createElement("button");
      const deletebtn = document.createElement("button");
      const plusNotesBtn=document.createElement("button");
      plusNotesBtn.classList.add("plus-notes-btn")
      editbtn.textContent = "Edit";
      completebtn.textContent = "Mark Complete";
      deletebtn.textContent = "Delete";
      plusNotesBtn.textContent="+"

      const listItem = document.createElement("li");
      const todomainrowDiv=document.createElement("div");
      todomainrowDiv.classList.add("todo-main-row")
      //notes
      const divNotes = document.createElement("div");
      divNotes.classList.add("notes-container");
      divNotes.textContent = `notes : ${todo.notes || "—"}`;
    divNotes.style.display = "none";
      todomainrowDiv.textContent = todo.title + " "; // show title
      todomainrowDiv.appendChild(editbtn);
      todomainrowDiv.appendChild(completebtn);
      todomainrowDiv.appendChild(deletebtn);
      
      const spanCompleted = document.createElement("span");
      spanCompleted.classList.add("completed-span");
      spanCompleted.textContent = todo.completed ? "✅" : "❌";

      const spanPriority = document.createElement("span");
      spanPriority.classList.add("priority-span");
      spanPriority.textContent = `priority : ${todo.priority}`;

      const spanDuedate = document.createElement("span");
      spanDuedate.classList.add("duedate-span");
      let formattedDate = "";
      if (todo.dueDate) {
        const parsedDate = parseISO(todo.dueDate);
        if (!isNaN(parsedDate)) {
          formattedDate = format(parsedDate, "MMM d, yyyy");
        }
      }
      spanDuedate.textContent = formattedDate;

      todomainrowDiv.appendChild(spanCompleted);
      todomainrowDiv.appendChild(spanDuedate);
      todomainrowDiv.appendChild(spanPriority);
      todomainrowDiv.appendChild(plusNotesBtn);
      listItem.appendChild(todomainrowDiv);
      listItem.appendChild(divNotes)
      ul.appendChild(listItem);
plusNotesBtn.addEventListener("click",function(){
   divNotes.style.display = divNotes.style.display === "none" ? "block" : "none";
})
      completebtn.addEventListener("click", function () {
        console.log("cliked");
        todoModule.toggleCompleted(project.id, todo.id);
        renderProjects();
      });

      deletebtn.addEventListener("click", function () {
        todoModule.deleteTodo(project.id, todo.id);
        renderProjects();
      });
      editbtn.addEventListener("click", function () {
        //const dialog = document.querySelector("dialog");
        //console.log(document.querySelector(".dialog")); // should NOT be null
        if (!dialog) {
          console.error("Dialog not found in DOM");
          return;
        }

        // Remove only previously injected form (if any)
        const oldForm = dialog.querySelector("form");
        if (oldForm) oldForm.remove();

        // Create form
        const form = document.createElement("form");
        form.setAttribute("method", "dialog");
        form.classList.add("todo-form");

        // Title
        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Title:";
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.name = "title";
        titleInput.required = true;
        //notes
        const descLabel = document.createElement("label");
        descLabel.textContent = "Description:";

        const descInput = document.createElement("textarea");
        descInput.name = "description";
        descInput.rows = 4; // adjust height
        descInput.cols = 30; // adjust width
        descInput.placeholder = "Add notes or details about this task...";
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

        // Pre-fill
        titleInput.value = todo.title;
        dateInput.value = todo.dueDate;
        prioritySelect.value = todo.priority;

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
          titleLabel,
          titleInput,
          document.createElement("br"),
          descLabel,
          descInput,
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

        // Handle form submit
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const updatedData = {
            title: titleInput.value,
            notes: descInput.value,
            dueDate: dateInput.value,
            priority: prioritySelect.value,
          };
          todoModule.updateTodo(project.id, todo.id, updatedData);
          dialog.close();
          renderProjects();
        });

        dialog.showModal();
      });
    });

    div.appendChild(ul); // append ul after all todos are added

    container.appendChild(div);
  });
}

renderHeader();

export function renderTodos(todosArray) {
  container.innerHTML = ""; // clear container

  const ul = document.createElement("ul");

  todosArray.forEach(todo => {
    const listItem = document.createElement("li");

    // Main row with title, buttons, and spans
    const todoRow = document.createElement("div");
    todoRow.classList.add("todo-main-row");

    todoRow.textContent = todo.title + " ";

    // Buttons
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Mark Complete";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    const notesToggleBtn = document.createElement("button");
    notesToggleBtn.textContent = "+";

    // Spans
    const spanCompleted = document.createElement("span");
    spanCompleted.classList.add("completed-span");
    spanCompleted.textContent = todo.completed ? "✅" : "❌";

    const spanPriority = document.createElement("span");
    spanPriority.classList.add("priority-span");
    spanPriority.textContent = `priority: ${todo.priority}`;

    const spanDuedate = document.createElement("span");
    spanDuedate.classList.add("duedate-span");
    spanDuedate.textContent = todo.dueDate
      ? format(parseISO(todo.dueDate), "MMM d, yyyy")
      : "";

    // Append buttons and spans
    todoRow.appendChild(spanCompleted);
    todoRow.appendChild(spanDuedate);
    todoRow.appendChild(spanPriority);
    todoRow.appendChild(editBtn);
    todoRow.appendChild(completeBtn);
    todoRow.appendChild(deleteBtn);
    todoRow.appendChild(notesToggleBtn);

    // Notes container
    const divNotes = document.createElement("div");
    divNotes.classList.add("notes-container");
    divNotes.textContent = `notes: ${todo.notes || "—"}`;
    divNotes.style.display = "none";

    notesToggleBtn.addEventListener("click", () => {
      divNotes.style.display = divNotes.style.display === "none" ? "block" : "none";
    });

    // Button actions
    completeBtn.addEventListener("click", () => {
      todoModule.toggleCompleted(todo.projectId, todo.id);
      renderTodos(todosArray); // re-render filtered list
    });

    deleteBtn.addEventListener("click", () => {
      todoModule.deleteTodo(todo.projectId, todo.id);
      renderTodos(todosArray);
    });

    editBtn.addEventListener("click", () => {
      if (!dialog) return;
      const oldForm = dialog.querySelector("form");
      if (oldForm) oldForm.remove();

      const form = document.createElement("form");
      form.classList.add("todo-form");

      // Title
      const titleLabel = document.createElement("label");
      titleLabel.textContent = "Title:";
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = todo.title;

      // Notes
      const descLabel = document.createElement("label");
      descLabel.textContent = "Description:";
      const descInput = document.createElement("textarea");
      descInput.value = todo.notes || "";

      // Due date
      const dateLabel = document.createElement("label");
      dateLabel.textContent = "Due Date:";
      const dateInput = document.createElement("input");
      dateInput.type = "date";
      dateInput.value = todo.dueDate || "";

      // Priority
      const priorityLabel = document.createElement("label");
      priorityLabel.textContent = "Priority:";
      const prioritySelect = document.createElement("select");
      ["low", "medium", "high"].forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
        if (level === todo.priority.toLowerCase()) option.selected = true;
        prioritySelect.appendChild(option);
      });

      // Buttons
      const saveBtn = document.createElement("button");
      saveBtn.type = "submit";
      saveBtn.textContent = "Save";

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", () => dialog.close());

      form.append(titleLabel, titleInput, descLabel, descInput, dateLabel, dateInput, priorityLabel, prioritySelect, saveBtn, cancelBtn);
      dialog.appendChild(form);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const updatedData = {
          title: titleInput.value,
          notes: descInput.value,
          dueDate: dateInput.value,
          priority: prioritySelect.value,
        };
        todoModule.updateTodo(todo.projectId, todo.id, updatedData);
        dialog.close();
        renderTodos(todosArray);
      });

      dialog.showModal();
    });

    listItem.appendChild(todoRow);
    listItem.appendChild(divNotes);
    ul.appendChild(listItem);
  });

  container.appendChild(ul);
}