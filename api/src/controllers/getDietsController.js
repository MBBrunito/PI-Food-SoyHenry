const axios = require("axios");
const { Recipe, Diets } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

const cleanArray = (arr) =>
   arr.map((elements) => {
      return {
         diets: elements.diets.map((diet) => diet.trim().replace(/-+$/, "")),
      };
   });
const getDietsContoller = async () => {
   const { data } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=25&addRecipeInformation=true`
   );
   const apiDiets = cleanArray(data.results);

   const dietNames = new Set();
   apiDiets.forEach((element) => {
      element.diets.forEach((diet) => dietNames.add(diet));
   });

   const dietNameUniques = [...dietNames];

   dietNameUniques.forEach(async (dietNames) => {
      await Diets.findOrCreate({
         where: { name: dietNames },
      });
   });
   const databaseDiets = await Diets.findAll();

   if (databaseDiets.length) {
      return [...databaseDiets];
   }
   throw new Error("No existen Recetas");
};

module.exports = getDietsContoller;
