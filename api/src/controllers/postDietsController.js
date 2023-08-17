const { Recipe, Diets } = require("../db");

const postDietsController = async (name) => {
   console.log(name);
   const newDiet = await Diets.create({ name });
   return newDiet;
};

module.exports = postDietsController;
