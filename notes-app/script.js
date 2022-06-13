/** @format */
const notesCont = document.querySelector(".notes");
const addBtn = document.querySelector("button");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

//? creating a new note
addBtn.onclick = () => {
  addNewNote();
};

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
     <div class="note_tools">
          <p>Saved</p>
          <i class="fa-solid fa-pen-to-square" id="editBtn"></i>
          <i class="fa-solid fa-trash-can" id="deleteBtn"></i>
        </div>
        <div class="main">${text}</div>
        <textarea id="textarea" spellcheck="false"></textarea>
    `;

  const deleteBtn = note.querySelector("#deleteBtn");
  const editBtn = note.querySelector("#editBtn");
  const mainEl = note.querySelector(".main");
  const textEl = note.querySelector("textarea");
  const Ptext = note.querySelector("p");

  textEl.value = text;

  deleteBtn.addEventListener("click", () => {
      note.remove();
      updateLocalStorage()
  });

  editBtn.onclick = () => {
    mainEl.classList.toggle("active");
    textEl.classList.toggle("active");
    editBtn.classList.toggle("active");

    if (textEl.classList.contains("active")) {
      Ptext.innerText = "Editing..";
    } else if (!textEl.classList.contains("active")) {
      Ptext.innerText = "Saved";
    }
  };

  textEl.addEventListener("input", (e) => {
    const { value } = e.target;
    mainEl.innerHTML = value;
    updateLocalStorage();
  });

  notesCont.appendChild(note);
}




function updateLocalStorage() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
