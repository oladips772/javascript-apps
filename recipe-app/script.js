/** @format */
const searchTerm = document.getElementById("search_term").value;
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const responseData = await resp.json();
  const randomMeal = responseData.meals[0];
  addMeal(randomMeal);
}

getRandomMeal();
getFavoriteMeals();

function addMeal(mealData) {
  const randomContainer = document.getElementById("random_container");
  const randomMealDiv = document.createElement("div");
  randomMealDiv.classList.add("random_meal");

  if (mealData) {
    randomMealDiv.innerHTML = `
    <p>Random Meal</p>
    <img src="${mealData.strMealThumb}" alt="" />
    <span>'${mealData.strMeal}'</span>
    <i class="fa fa-heart heart" id="heart" aria-hidden="true"></i>
    `;
  }

  randomContainer.appendChild(randomMealDiv);

  const heartBtn = randomMealDiv.querySelector(".heart");
  heartBtn.addEventListener("click", () => {
    if (heartBtn.classList.contains("active")) {
      heartBtn.classList.remove("active");
      removeMealFromLocalStorage(mealData.idMeal);
    } else {
      addMealsToLocalStorage(mealData.idMeal);
      heartBtn.classList.add("active");
    }
  });
}

function removeMealFromLocalStorage(mealId) {
  const mealsId = getMealsFromLocalStorage();
  mealsId.splice(mealsId.indexOf(mealId), 1);
  localStorage.setItem("mealsId", JSON.stringify(mealsId));
  getFavoriteMeals();
}

function addMealsToLocalStorage(mealId) {
  const mealsId = getMealsFromLocalStorage();
  mealsId.push(mealId);
  localStorage.setItem("mealsId", JSON.stringify(mealsId));
  getFavoriteMeals();
}

function getMealsFromLocalStorage() {
  const mealsId = JSON.parse(localStorage.getItem("mealsId"));
  return mealsId ? mealsId : [];
}

async function getMealById(id) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const responseData = await response.json();
  const meal = responseData.meals[0];
  return meal;
}

async function getFavoriteMeals() {
  const mealsId = getMealsFromLocalStorage();
  const meals = [];
  for (i = 0; i < mealsId.length; i++) {
    const mealId = mealsId[i];
    const meal = await getMealById(mealId);
    meals.push(meal);
  }
  console.log(meals);
}

// async function getMealBySearch(searchTerm) {
//   const response = await fetch(
//     "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm
//   );
// }
