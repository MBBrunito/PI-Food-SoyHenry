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

const getRecipesByIdContoller = async (id, source) => {
   let recipe = null;
   if (source === "api") {
      const { data } = await axios(
         `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      let aux = data;
      const apiRecipes = cleanArray([data]);
      recipe = apiRecipes[0];
      console.log("encontró", id);
   } else {
      const responseDB = await Recipe.findOne({
         where: { id },
         include: {
            model: Diets,
            attributes: ["name"],
            through: { atributes: [] },
         },
      });
      console.log(responseDB);
      for (let j = 0; j < responseDB.dataValues.diets.length; j++) {
         responseDB.dataValues.diets[j] =
            responseDB.dataValues.diets[j].dataValues.name;
      }
      recipe = responseDB.dataValues;
   }
   if (recipe) {
      return recipe;
   }
   console.log("nones");
   throw new Error("No existe Receta");
};

module.exports = getRecipesByIdContoller;
