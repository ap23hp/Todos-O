export function createProjects() {
  let projects = [
    {
      name: "Fitness",
      todos: [],
      id: crypto.randomUUID(),
    },
    {
      name: "Hobbies",
      todos: [
        {
          title: "Read a book",
          completed: true,
          priority: "medium",
          id: crypto.randomUUID(),
        },
        {
          title: "Paint landscape",
          completed: false,
          priority: "high",
          id: crypto.randomUUID(),
        },
        {
          title: "Practice guitar",
          completed: false,
          priority: "medium",
          id: crypto.randomUUID(),
        },
      ],
      id: crypto.randomUUID(),
    },
  ];

  // const projects = [
  //   {
  //     name: "Fitness",
  //     todos: [
  //       { title: "Morning jog", completed: false, priority: "high" },
  //       { title: "Yoga session", completed: true, priority: "medium" },
  //       { title: "Meal prep", completed: false, priority: "low" },
  //     ],
  //   },
  //   {
  //     name: "Hobbies",
  //     todos: [
  //       { title: "Read a book", completed: true, priority: "medium" },
  //       { title: "Paint landscape", completed: false, priority: "high" },
  //       { title: "Practice guitar", completed: false, priority: "medium" },
  //     ],
  //   },
  // ];

  function addnameProject(projectname, id) {
    const project = projects.some((project) => project.name == projectname);

    project
      ? console.log("already same project exists!")
      : projects.push({
          name: projectname,
          todos: [],
          id: crypto.randomUUID(),
        });
    console.log(projects);
  }

  function deleteProject(id) {
    projects = projects.filter((project) => project.id !== id);
    return projects;
  }
  function getProjects() {
    return projects;
  }

  function gettodos() {}
  return {
    addnameProject,
    getProjects,
    deleteProject,
  };
}
