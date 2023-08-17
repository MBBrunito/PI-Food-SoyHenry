const { Router } = require("express");
const postRecipesHandler = require("../handlers/postRecipesHandler");

const postRecipesRouter = Router();

postRecipesRouter.post("/", postRecipesHandler);

module.exports = postRecipesRouter;
