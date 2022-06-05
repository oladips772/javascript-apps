/** @format */
const quizData = [
  {
    question: "What is the capital of India?",
    a: "New Delhi",
    b: "Mumbai",
    c: "Chennai",
    d: "Kolkata",
    correct: "b",
  },
  {
    question: "What is the capital of USA?",
    a: "New Delhi",
    b: "Peru",
    c: "los angeles",
    d: "new york",
    correct: "c",
  },
  {
    question: "What is the best laptop product company?",
    a: "Apple",
    b: "Lenovo",
    c: "HP",
    d: "Dell",
    correct: "b",
  },
  {
    question: "What is the best mobile product company?",
    a: "Apple",
    b: "Samsung",
    c: "Nokia",
    d: "LG",
    correct: "a",
  },
  {
    question: "What does HTML stands for?",
    a: "Hyper Text Markup Language",
    b: "Hyper Text Multipurpose Language",
    c: "Hyper Text Monetary Language",
    d: "Hyper Text Markin Language",
    correct: "a",
  },
  {
    question: "what year was javasript launched",
    a: "1997",
    b: "1996",
    c: "1995",
    d: "1998",
    correct: "c",
  },
];

const question = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submitBtn");
const answersEl = document.querySelectorAll(".answer");

const start = document.getElementById("start");
const quiz_Cont = document.getElementById("quiz_container");
const result_Cont = document.getElementById("result_container");
const restartBtn = document.getElementById("restartBtn");
const scoreText = document.getElementById("score");

start.addEventListener("click", () => {
  start.classList.add("inactive");
  quiz_Cont.classList.add("active");
});

restartBtn.addEventListener("click", () => {
  window.location.reload();
});

let currrentQuiz = 0;
let score = 0;

loadQuiz();
function loadQuiz() {
  deselctAll();
  const currentQuizData = quizData[currrentQuiz];
  question.innerText = currentQuizData.question;
  (a_text.innerText = currentQuizData.a),
    (b_text.innerText = currentQuizData.b),
    (c_text.innerText = currentQuizData.c),
    (d_text.innerText = currentQuizData.d);
}

function getSelected() {
  let answer = undefined;
  answersEl.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselctAll() {
  answersEl.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  answer === quizData[currrentQuiz].correct && score++;
  console.log(answer);
  if (answer) {
    currrentQuiz++;
    if (currrentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz_Cont.classList.remove("active");
      result_Cont.classList.add("active");
      scoreText.innerText = `You scored ${score} out of ${quizData.length} questions`;
    }
  } else {
    alert("please select an answer");
  }
});
