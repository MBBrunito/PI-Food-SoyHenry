const getDietsContoller = require("../controllers/getDietsController");

const getDietsHandler = async (req, res) => {
   try {
      const results = await getDietsContoller();
      return res.status(200).json(results);
   } catch (error) {
      return res.status(400).json({ error: error.message });
   }
};

module.exports = getDietsHandler;
