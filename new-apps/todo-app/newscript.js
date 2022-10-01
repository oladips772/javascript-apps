/** @format */
const addBtn = document.getElementById("addBtn");
const inputText = document.getElementById("inputText");
const todoWrapper = document.getElementById("todoWrapper");
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    createTodo(todo);
  });
}

addBtn.onclick = () => {
  createTodo();
};

function createTodo(todo) {
  let todoText = inputText.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText.trim()) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo_div");
    todoDiv.innerHTML = `
        <li>${todoText}</li>
        <i class="fa-solid fa-trash" id="deleteBtn"></i>
            `;
    inputText.value = "";
    const list = todoDiv.querySelector("li");
    list.onclick = () => {
      list.classList.toggle("completed");
      updateLocalStorage();
    };
    const deleteBtn = todoDiv.querySelector("#deleteBtn");
    deleteBtn.onclick = () => {
      todoDiv.remove();
      updateLocalStorage();
    };

    todoWrapper.appendChild(todoDiv);
    updateLocalStorage();
    if (todo.completed) {
      list.classList.add("completed");
    }
  }
}

function updateLocalStorage() {
  const allTodos = document.querySelectorAll("li");
  const todos = [];

  allTodos.forEach((todo) => {
    todos.push({
      text: todo.innerText,
      completed: todo.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
