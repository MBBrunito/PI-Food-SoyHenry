const { Router } = require("express");
const getRecipesHandler = require("../handlers/getRecipesHandler");
const getRecipesRouter = Router();

getRecipesRouter.get("/", getRecipesHandler);

module.exports = getRecipesRouter;
