/** @format */
const profileCard = document.getElementById("profile_card");
const searchTerm = document.getElementById("search");
const searchBtn = document.querySelector("#searchBtn");
const GIT_URL = `https://api.github.com/users/`;

searchBtn.onclick = () => {
  profileCard.innerHTML = "";
  showUser();
  searchTerm.value = "";
};

async function getUser(user) {
  const respData = await fetch(`${GIT_URL}${user}`);
  const userData = await respData.json();
  console.log(userData);
  return userData;
}

async function showUser() {
  const userData = await getUser(searchTerm.value);
  const userCard = document.createElement("div");
  userCard.classList = "user_card";

  if (userData) {
    userCard.innerHTML = `
  <img
            src=${userData.avatar_url}
            alt=""
          />
          <div class="stats_div">
            <h3>${userData.name}</h3>
            <div class="stat">
              <i class="fa fa-star"></i>
              <span>${userData.public_repos}</span>
            </div>
            <div class="stat">
              <i class="fa-solid fa-users"></i>
              <span>${userData.followers}</span>
            </div>
            <div class="stat">
              <i class="fa-solid fa-address-card"></i>
              <span>${userData.bio}</span>
            </div>
          </div>
  `;
  } else if (userData.message === "Not Found") {
    userCard.innerHTML = `
      <h3>User not found</h3>
    `;
  }
  profileCard.appendChild(userCard);
}
