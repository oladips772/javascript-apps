/** @format */
const daystext = document.getElementById("days");
const hrstext = document.getElementById("hrs");
const minstext = document.getElementById("mins");
const secstext = document.getElementById("secs");

function countDown() {
  const newYearDate = new Date("1 jan 2023");
  const currentDate = new Date();
  const totalSeconds = (newYearDate - currentDate) / 1000;
  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  console.log(days, hours, minutes, seconds);
  daystext.innerText = days;
  hrstext.innerText = hours;
  minstext.innerText = minutes;
  secstext.innerText = seconds;
}

countDown();
setInterval(countDown, 1000);
