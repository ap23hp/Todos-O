import { isToday, isTomorrow, isAfter, isBefore, parseISO , startOfToday, 

 } from "date-fns";

// Filter todos due today
export function filterToday(todos) {
  return todos.filter(todo => isToday(parseISO(todo.dueDate)));
}


export function filterTomorrow(todos) {
  return todos.filter(todo => isTomorrow(parseISO(todo.dueDate)));
}


export function filterUpcoming(todos) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // tomorrow's date
  return todos.filter(todo => todo.dueDate && isAfter(parseISO(todo.dueDate), tomorrow));
}

export function filterOverdue(todos) {
  return todos.filter(todo => !todo.completed && todo.dueDate && isBefore(parseISO(todo.dueDate), startOfToday()));
}

export function filterCompleted(todos) {
  return todos.filter(todo => todo.completed);
}