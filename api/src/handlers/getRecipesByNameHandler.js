const getRecipesByNameController = require("../controllers/getRecipesByNameController");

const getRecipesByNameHandler = async (req, res) => {
   const { name } = req.query;
   try {
      const results = await getRecipesByNameController(name);
      return res.status(200).json(results);
   } catch (error) {
      return res.status(400).json({error: error.message});
   }
};

module.exports = getRecipesByNameHandler;
