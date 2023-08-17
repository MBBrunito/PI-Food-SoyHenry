const { Router } = require("express");
const getRecipesByNameHandler = require("../handlers/getRecipesByNameHandler");
require("dotenv").config();
const { API_KEY } = process.env;

getRecipesByNameRouter = Router();

getRecipesByNameRouter.get("/?name", getRecipesByNameHandler);

module.exports = getRecipesByNameRouter;
