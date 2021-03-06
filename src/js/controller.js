"use strict";

import icons from "url:../img/icons.svg";
console.log(icons);

const recipeContainer = document.querySelector(".recipe");


console.log("test");

const renderSpinner = function(parentEl) {
    const markup = `
    <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
    `

    parentEl.innerHTML = "";
    parentEl.insertAdjacentHTML("afterbegin", markup);
} 

const showRecipe = async function() {
    try {

        // 1. Loading Recipe

        renderSpinner(recipeContainer);

        const result = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcaf5");
        const data = await result.json();

        // If fetch fails
        if (!result.ok) throw new Error (`${data.message} (${result.status})`
         )
        console.log(result);
        console.log(data);

        // Create new object based on the data info received
        // const recipe = data.data.recipe;
        let {recipe} = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,

        }
        console.log(recipe);

        // 2. Render Recipe
        const markup = `
        <div class="recipe">
            <h3 class="recipe--select empty">
              Select a tab to view the full recipe
            </h3>
            <div class="recipe--image">
              <img src="${recipe.image}" alt="${recipe.title}" />
              <h3 class="recipe--title">${recipe.title}</h3>
            </div>
            <div class="recipe--details">
              <div class="recipe--details__top">
                <div class="recipe--time">
                  <i class="far fa-clock"></i>
                  ${recipe.cookingTime} minutes
                </div>
                <div class="recipe--servings">
                  <i class="fas fa-user-friends"></i>
                  ${recipe.servings} Servings

                  <div class="recipe--servings__buttons">
                    <button class="btn btn--decrease">
                      <span>-</span>
                    </button>
                    <button class="btn btn--increase">
                      <span>+</span>
                    </button>
                  </div>
                </div>
              </div>

              <hr />

              <div class="recipe--details__bottom">
                Recipe crafted by
                <a class="recipe--publisher" href="${recipe.sourceUrl}">${recipe.publisher}</a>
              </div>
            </div>
            <div class="recipe--ingredients">
              <h1>Ingredients</h1>
              <i class="far fa-bookmark recipe--bookmark"></i>
              <ul class="recipe--ingredients--list">

            ${recipe.ingredients.map(ing => {
                return `
                <li>
                  <div class="recipe--quantity">${ing.quantity}</div>
                  <div class="recipe--description">
                    <span class="recipe--unit">${ing.unit}</span>
                    ${ing.description}
                  </div>
                </li>
                `
            }).join("")}

              </ul>
            </div>
          </div>
        `
        // recipeContainer.innerHTML = "";
        // recipeContainer.insertAdjacentHTML("afterbegin", markup);

    } catch (err) {
        console.error(err);
    }
}

showRecipe();