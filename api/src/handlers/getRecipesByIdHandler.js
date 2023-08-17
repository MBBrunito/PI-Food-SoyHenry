const getRecipesByIdContoller = require("../controllers/getRecipesByIdController");

const getRecipesByIdHandler = async (req, res) => {
   const { id } = req.params;
   const source = isNaN(id) ? "db" : "api";
   try {
      const results = await getRecipesByIdContoller(id, source);
      return res.status(200).json(results);
   } catch (error) {
      return res.status(400).json({ error: error.message + " (ID)" });
   }
};

module.exports = getRecipesByIdHandler;
