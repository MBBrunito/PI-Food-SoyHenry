const { Router } = require("express");
const postDietsHandler = require("../handlers/postDietsHandler");

const postDietsRouter = Router();

postDietsRouter.post("/diets", postDietsHandler);

module.exports = postDietsRouter;
