/** @format */
const GIT_URL = `https://api.github.com/users/`;

async function getUser(user) {
  const respData = await fetch(`${GIT_URL}${user}`);
  const userData = await respData.json();
  console.log(userData);
  return userData;
}

getUser("oladips772");
