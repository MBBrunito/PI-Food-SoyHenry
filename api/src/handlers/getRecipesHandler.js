const getRecipesController = require("../controllers/getRecipesContoller");

const getRecipesHandler = async (req, res) => {
   try {
      const results = await getRecipesController();
      return res.status(200).json(results);
   } catch (error) {
      return res.status(400).json({ error: error.message });
   }
};

module.exports = getRecipesHandler;
