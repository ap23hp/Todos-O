import { projectModule } from "./index";
import { todoModule } from "./index";
import { format ,parseISO} from 'date-fns';
import { renderHeader } from "./header";
let container = document.querySelector(".container");
console.log(container)
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
      editbtn.textContent = "Edit";
      completebtn.textContent = "Mark Complete";
      deletebtn.textContent = "Delete";

      const listItem = document.createElement("li");
      listItem.textContent = todo.title + " "; // show title
      listItem.appendChild(editbtn);
      listItem.appendChild(completebtn);
      listItem.appendChild(deletebtn);
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

      listItem.appendChild(spanCompleted);
      listItem.appendChild(spanDuedate);
      listItem.appendChild(spanPriority);
      ul.appendChild(listItem);

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
        dateInput.value = todo.dueDate
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

renderHeader()