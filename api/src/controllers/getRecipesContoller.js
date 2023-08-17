const axios = require("axios");
const { Recipe, Diets } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

const cleanArray = (arr) =>
   arr.map((elements) => {
      return {
         id: elements.id,
         name: elements.title,
         image: elements.image,
         summary: elements.summary.replace(/<[^>]+>/g, ""), // es un regex para eliminar las lineas html
         healthscore: elements.healthScore,
         diets: elements.diets,
         steps: elements.analyzedInstructions[0].steps.map((step) => step.step),
      };
   });

const getRecipesContoller = async (id) => {
   let databaseRecipes = await Recipe.findAll({
      include: {
         model: Diets,
         attributes: ["name"],
         through: { attributes: [] },
      },
   });

   for (let i = 0; i < databaseRecipes.length; i++) {
      for (let j = 0; j < databaseRecipes[i].dataValues.diets.length; j++) {
         databaseRecipes[i].dataValues.diets[j] =
            databaseRecipes[i].dataValues.diets[j].dataValues.name;
      }
   }

   const { data } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=25&addRecipeInformation=true`
   );
   databaseRecipes = databaseRecipes.map((recipe) => {
      recipe = recipe.dataValues;
      return recipe;
   });

   const apiRecipes = cleanArray(data.results);
   if (apiRecipes.length) {
      const response = [...databaseRecipes, ...apiRecipes];
      return response;
   }
   throw new Error("No existen Recetas");
};

module.exports = getRecipesContoller;
