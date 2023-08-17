const { Recipe, Diets, DietRecipes } = require("../db");

const postRecipesController = async (
   name,
   summary,
   image,
   healthscore,
   diets,
   steps
) => {
   if (!Array.isArray(diets)) {
      throw new Error("Diets must be an array.");
   }
   const newRecipe = await Recipe.create({
      name,
      summary,
      image,
      healthscore,
      diets,
      steps,
   });
   const dietRecords = await Promise.all(
      diets.map(async (diet) => {
         const [newDiet] = await Diets.findOrCreate({
            where: { name: diet },
            defaults: { name: diet },
         });
         await DietRecipes.create({
            recipeId: newRecipe.id,
            dietId: newDiet.id,
         });
         return newDiet;
      })
   );
   return { newRecipe, diets: dietRecords };
};

module.exports = postRecipesController;
