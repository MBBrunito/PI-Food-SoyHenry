const postRecipesController = require("../controllers/postRecipesController");

const postRecipesHandler = async (req, res) => {
   const { name, summary, image, healthscore, diets, steps } = req.body;

   try {
      const results = await postRecipesController(
         name,
         summary,
         image,
         healthscore,
         diets,
         steps
      );
      return res.status(200).json({
         message: "Recipe created successfully.",
      });
   } catch (error) {
      return res.status(400).json({ error: error.message });
   }
};

module.exports = postRecipesHandler;
