/** @format */
const notesCont = document.querySelector(".notes");
const addBtn = document.querySelector("button");

//? creating a new note
addBtn.onclick = () => {
  addNewNote();
};

function addNewNote() {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
     <div class="note_tools">
          <p>Saved</p>
          <i class="fa-solid fa-pen-to-square" id="editBtn"></i>
          <i class="fa-solid fa-trash-can" id="deleteBtn"></i>
        </div>
        <div class="main"></div>
        <textarea id="textarea" spellcheck="false"></textarea>
    `;

  notesCont.appendChild(note);

  const deleteBtn = note.querySelector("#deleteBtn");
  const editBtn = note.querySelector("#editBtn");
  const mainEl = note.querySelector(".main");
  const textEl = note.querySelector("#textarea");
  const Ptext = note.querySelector("p");

  deleteBtn.addEventListener("click", () => {
    note.remove();
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
  });
}
