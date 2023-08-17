const postDietsController = require("../controllers/postDietsController");

const postDietsHandler = async (req, res) => {
   const { name } = req.body;
   try {
      const newDiet = await postDietsController(name);
      return res.status(200).json(newDiet);
   } catch (error) {
      return res.status(400).json({ error: error.message });
   }
};

module.exports = postDietsHandler;
