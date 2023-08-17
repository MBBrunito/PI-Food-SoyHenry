const { Router } = require("express");
const getDietsHandler = require("../handlers/getDietsHandler");

const getDietsRouter = Router();

getDietsRouter.get("/diets", getDietsHandler);

module.exports = getDietsRouter;
