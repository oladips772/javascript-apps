/** @format */
const inputText = document.getElementById("inputText");
const addBtn = document.getElementById("addBtn");
const todoWrapper = document.getElementById("todoWrapper");
const newTodos = JSON.parse(localStorage.getItem("newTodos1"));

if (newTodos) {
  newTodos.forEach((todo) => {
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
  const todosBucket = [];

  allTodos.forEach((todo) => {
    todosBucket.push({
      text: todo.innerText,
      completed: todo.classList.contains("completed"),
    });
  });

  localStorage.setItem("newTodos1", JSON.stringify(todosBucket));
}
