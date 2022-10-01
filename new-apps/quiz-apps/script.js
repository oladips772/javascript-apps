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
    a: "Mineapolis",
    b: "Peru",
    c: "Washignton dc",
    d: "new york",
    correct: "c",
  },
  {
    question: "What is the best laptop product company?",
    a: "Apple",
    b: "Lenovo",
    c: "HP",
    d: "Dell",
    correct: "d",
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
const quizCont = document.getElementById("quizCont");
const resultBox = document.getElementById("resultBox");
const startBtn = document.getElementById("startBtn");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restartBtn");

startBtn.onclick = () => {
  startBtn.classList.add("hidden");
  quizCont.classList.add("active");
};

restartBtn.onclick = () => {
  window.location.reload();
};

let currrentQuiz = 0;
let score = 0;

function loadQuiz() {
  deselctAll();
  const currrentQuizData = quizData[currrentQuiz];
  question.innerText = currrentQuizData.question;
  a_text.innerText = currrentQuizData.a;
  b_text.innerText = currrentQuizData.b;
  c_text.innerText = currrentQuizData.c;
  d_text.innerText = currrentQuizData.d;
}

loadQuiz();

function getAnswer() {
  let userAnswer = undefined;
  answersEl.forEach((answerEl) => {
    if (answerEl.checked) {
      userAnswer = answerEl.id;
    }
  });
  return userAnswer;
}

function deselctAll() {
  answersEl.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.onclick = () => {
  const userAnswer = getAnswer();
  if (userAnswer === quizData[currrentQuiz].correct) {
    score++;
    console.log(score);
  }

  if (userAnswer) {
    currrentQuiz++;
    if (currrentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quizCont.classList.remove("active");
      resultBox.classList.add("active");
      resultText.innerText = `You scored ${score} out of ${quizData.length} questions`;
    }
  } else {
    alert("select an answer");
  }
};

function changeBackground() {}
