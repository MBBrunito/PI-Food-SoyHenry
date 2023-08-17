const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diets } = require("../db");

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
const getRecipesByNameController = async (name) => {
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
   const response = [...databaseRecipes, ...apiRecipes];
   const filteredApi = response.filter((recipe) =>
      recipe.name.toLowerCase().includes(name.toLowerCase())
   );
   if (filteredApi.length) {
      const response = [...filteredApi];
      return response;
   }
   throw new Error("Receta inexistente");
};

module.exports = getRecipesByNameController;
