
export function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
  const stored = localStorage.getItem("projects");
  if (!stored) return null; // or fallback to createProjects() in your index
  return JSON.parse(stored);
}