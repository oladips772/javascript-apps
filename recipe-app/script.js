/** @format */
const searchTerm = document.getElementById("search_term");
const mealsContainer = document.getElementById("favorite_meals");
const searchBtn = document.getElementById("search_btn");
const mealPopUp = document.getElementById("meal_info_container");

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
  randomMealDiv.querySelector("img").addEventListener("click", () => {
    showMealInfo(mealData);
  });

  const heartBtn = randomMealDiv.querySelector(".heart");
  heartBtn.addEventListener("click", () => {
    if (heartBtn.classList.contains("active")) {
      heartBtn.classList.remove("active");
      removeMealFromLocalStorage(mealData.idMeal);
    } else {
      addMealsToLocalStorage(mealData.idMeal);
      heartBtn.classList.add("active");
    }
    getFavoriteMeals();
  });
}

function removeMealFromLocalStorage(mealId) {
  const mealsId = getMealsFromLocalStorage();
  mealsId.splice(mealsId.indexOf(mealId), 1);
  localStorage.setItem("mealsId", JSON.stringify(mealsId));
}

function addMealsToLocalStorage(mealId) {
  const mealsId = getMealsFromLocalStorage();
  mealsId.push(mealId);
  localStorage.setItem("mealsId", JSON.stringify(mealsId));
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
  mealsContainer.innerHTML = "";
  const mealsId = getMealsFromLocalStorage();
  for (i = 0; i < mealsId.length; i++) {
    const mealId = mealsId[i];
    const meal = await getMealById(mealId);
    addMealToFavorite(meal);
  }
}

async function addMealToFavorite(meal) {
  const MealDiv = document.createElement("div");
  MealDiv.classList.add("fav_meal");

  if (meal) {
    MealDiv.innerHTML = `
            <img
              src="${meal.strMealThumb}"
              alt=""
            />
            <p>${meal.strMeal}</p>
            <i class="fa fa-trash" aria-hidden="true"></i>
    `;
  }

  MealDiv.querySelector("p").addEventListener("click", () => {
    showMealInfo(meal);
  });

  mealsContainer.appendChild(MealDiv);

  const trashBtn = MealDiv.querySelector(".fa-trash");
  trashBtn.addEventListener("click", () => {
    removeMealFromLocalStorage(meal.idMeal);
    getFavoriteMeals();
  });
}

async function getMealBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const mealData = await resp.json();
  const meals = mealData.meals;
  console.log(meals);
  return meals;
}

searchBtn.addEventListener("click", async () => {
  const search = searchTerm.value;
  if (search.trim()) {
    const meals = await getMealBySearch(search);
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

function showMealInfo(meal) {
  const mealInfo = document.createElement("div");
  mealPopUp.classList.add("active");
  mealInfo.classList.add("meal_info");
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal["strIngredient" + i]) {
      ingredients.push(
        `${meal["strIngredient" + i]}${" - "}${meal["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  mealInfo.innerHTML = `
   <div class="meal_header">
            <h3>${meal.strMeal}</h3>
            <i class="fas fa-times close_btn"></i>
          </div>
          <img
            src="${meal.strMealThumb}"
            alt=""
          />
          <span>description</span>
          <p>
            ${meal.strInstructions}
          </p>
          <span>INGREDIENTS</span>
          <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join(" ")}
          </ul>
  `;
  mealPopUp.appendChild(mealInfo);

  const closeBtn = mealInfo.querySelector(".close_btn");
  closeBtn.addEventListener("click", () => {
    mealPopUp.innerHTML = "";
    mealPopUp.classList.remove("active");
  });
}
