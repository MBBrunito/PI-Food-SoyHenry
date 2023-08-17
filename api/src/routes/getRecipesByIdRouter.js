const { Router } = require("express");
const getRecipesByIdHandler = require("../handlers/getRecipesByIdHandler");
require("dotenv").config();
const { API_KEY } = process.env;
getRecipesByIdRouter = Router();

getRecipesByIdRouter.get("/:id", getRecipesByIdHandler);

module.exports = getRecipesByIdRouter;
