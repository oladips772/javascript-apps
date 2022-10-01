/** @format */
const inputBox = document.getElementById("inputBox");
const copyBtn = document.getElementById("copyBtn");
const passwordLength = document.getElementById("passwordLength");
const upperCase = document.getElementById("upperCase");
const lowerCase = document.getElementById("lowerCase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");

const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const Numbers = "0123456789";
const Symbols = "~!@#$%^&**()_";

// ? functions
function getLowerCase() {
  return lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
}

function getUpperCase() {
  return upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
}

function getNumbers() {
  return Numbers[Math.floor(Math.random() * Numbers.length)];
}

function getSymbols() {
  return Symbols[Math.floor(Math.random() * Symbols.length)];
}

function allData() {
  const data = [];
  if (upperCase.checked) {
    data.push(getUpperCase());
  }
  if (lowerCase.checked) {
    data.push(getLowerCase());
  }
  if (numbers.checked) {
    data.push(getNumbers());
  }
  if (symbols.checked) {
    data.push(getSymbols());
  }
  if (data.length === 0) return "";
  return data[Math.floor(Math.random() * data.length)];
}

function generatePassword() {
  let password = "";
  const lenValue = passwordLength.value;

  for (let i = 0; i < lenValue; i++) {
    const x = allData();
    password += x;
  }
  console.log(password);
  inputBox.value = password;
}

generateBtn.onclick = () => {
  generatePassword();
};

copyBtn.onclick = () => {
  const textarea = document.createElement("textarea");
  const password = inputBox.value;
  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("copied to clipboard");
};
