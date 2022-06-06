/** @format */
const searchTerm = document.getElementById("search_term").value;

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const responseData = await resp.json();
  const randomMeal = responseData.meals[0];
  console.log(randomMeal);
  addMeal(randomMeal);
}

function addMeal(mealData) {
  const randomMealDiv = document.getElementById("random_mealDiv");
  if (mealData) {
    randomMealDiv.innerHTML = `
      <p>Random Meal</p>
        <img
          src="${mealData.strMealThumb}"
          alt=""
        />
        <span>'${mealData.strMeal}'</span>
        <i class="fa fa-heart heart" aria-hidden="true"></i>

    `;
  }
}

getRandomMeal();

// async function getMealById(id) {
//   const response = await fetch(
//     "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
//   );
// }

// async function getMealBySearch(searchTerm) {
//   const response = await fetch(
//     "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm
//   );
// }
