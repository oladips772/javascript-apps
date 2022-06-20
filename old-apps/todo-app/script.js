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

inputText.oninput = () => {
  if (inputText.value.trim()) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

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
    todoDiv.className = "todo_div";
    todoDiv.innerHTML = `
     <li>${todoText}</li>
        <i class="fa-solid fa-trash" id="deleteBtn"></i>
    `;
    const deleteBtn = todoDiv.querySelector("#deleteBtn");
    const list = todoDiv.querySelector("li");
    list.onclick = () => {
      list.classList.toggle("completed"), updateLocalStorage();
    };
    deleteBtn.onclick = () => {
      todoDiv.remove(), updateLocalStorage();
    };
    todoWrapper.appendChild(todoDiv);
    inputText.value = "";
    updateLocalStorage();
    if (todo.completed) {
      list.classList.add("completed");
    }
  }
}

function updateLocalStorage() {
  const notesText = document.querySelectorAll("li");
  const todos = [];

  notesText.forEach((note) => {
    todos.push({
      text: note.innerText,
      completed: note.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
