import { saveProjects } from "./storage";
export function createProjects() {
  let projects = [
    {
      name: "General",
      todos: [
        {
          title: "Morning run",
          notes:"wake up at 5 in morning and do not forget to take water bottle",
          completed: false,
          dueDate: "2025-09-02",
          priority: "High",
           id: crypto.randomUUID(),
        },
        {
          title: "Yoga session",
          notes:"yogamat has to be taken",
          completed: false,
          dueDate: "2025-09-02",
          priority: "Low",
           id: crypto.randomUUID(),
        },
      ],
      id: crypto.randomUUID(),
    },
    // {
    //   name: "Hobbies",
    //   todos: [
    //     {
    //       title: "Read a book",
    //       completed: true,
    //       priority: "medium",
    //       dueDate: "2025-09-02",
    //       id: crypto.randomUUID(),
    //     },
    //     {
    //       title: "Paint landscape",
    //       dueDate: "2025-09-02",
    //       completed: false,
    //       priority: "high",
    //       id: crypto.randomUUID(),
    //     },
    //     {
    //       title: "Practice guitar",
    //       dueDate: "2025-09-02",
    //       completed: false,
    //       priority: "medium",
    //       id: crypto.randomUUID(),
    //     },
    //   ],
    //   id: crypto.randomUUID(),
    // },
  ];

function addnameProject(projectname) {
  // Check if project already exists
  const existing = projects.find((project) => project.name === projectname);

  if (existing) {
    console.log("A project with this name already exists!");
    return existing.id; // return existing project's ID
  }

  // Create new project
  const newProject = {
    name: projectname,
    todos: [],
    id: crypto.randomUUID(),
  };

  projects.push(newProject);
  console.log(projects);
saveProjects(projects)
  return newProject.id; // return the new project's ID
}

  function deleteProject(id) {
    projects = projects.filter((project) => project.id !== id);
  saveProjects(projects)
    return projects;
  }
  function getProjects() {

    return projects;
  }


  return {
    addnameProject,
    getProjects,
    deleteProject,
  };
}
