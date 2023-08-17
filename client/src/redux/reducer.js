/* eslint-disable no-unused-vars */

import {
   CLEAN_DETAIL,
   CREATE_RECIPE,
   FILTERBYDIET,
   FILTERBYSOURCE,
   GET_DIETS,
   GET_RECIPES,
   GET_RECIPE_BY_ID,
   GET_RECIPE_BY_NAME,
   GET_RECIPE_DETAIL,
   ORDERBYNAME,
   PAGINATE,
   SEARCH_RECIPE,
} from "./action-types";
import { getRecipesByName } from "./actions";

const initialState = {
   allHomeRecipes: [],
   allHomeRecipesCopy: [],
   dietTypes: [],
   recipeDetails: null,
   recipesFiltered: [],
   sourceFilter: "ALL",
   currentPage: 0,
};

const reducer = (state = initialState, action) => {
   const ITEMS_PAGE = 9;
   switch (action.type) {
      case GET_RECIPES:
         if (!state.allHomeRecipes.lenght) {
            return {
               ...state,
               allHomeRecipes: [...action.payload].splice(0, ITEMS_PAGE),
               allHomeRecipesCopy: action.payload,
               recipesFiltered: action.payload,
            };
         }
         return {
            ...state,
            allHomeRecipes: [...state.recipesFiltered].splice(ITEMS_PAGE),
         };

      case GET_DIETS:
         return {
            ...state,
            dietTypes: action.payload,
         };

      case PAGINATE:
         const nextPage = state.currentPage + 1;
         const prevPage = state.currentPage - 1;
         const firstIndex =
            action.payload === "next"
               ? nextPage * ITEMS_PAGE
               : prevPage * ITEMS_PAGE;
         if (
            action.payload === "next" &&
            firstIndex >= state.recipesFiltered.length
         ) {
            return { ...state };
         } else if (action.payload === "prev" && prevPage < 0) {
            return { ...state };
         }
         return {
            ...state,
            allHomeRecipes: [...state.recipesFiltered].splice(
               firstIndex,
               ITEMS_PAGE
            ),
            currentPage: action.payload === "next" ? nextPage : prevPage,
         };

      case ORDERBYNAME:
         if (action.payload === "az") {
            const allRecipesOrder = [...state.recipesFiltered].sort(
               (prev, next) => {
                  if (prev.name > next.name) return 1;
                  if (prev.name < next.name) return -1;
                  return 0;
               }
            );
            return {
               ...state,
               allHomeRecipes: [...allRecipesOrder].splice(0, ITEMS_PAGE),
               recipesFiltered: allRecipesOrder,
               currentPage: 0,
            };
         }

         if (action.payload === "za") {
            const allRecipesOrder = [...state.recipesFiltered].sort(
               (prev, next) => {
                  if (prev.name < next.name) return 1;
                  if (prev.name > next.name) return -1;
                  return 0;
               }
            );
            return {
               ...state,
               allHomeRecipes: [...allRecipesOrder].splice(0, ITEMS_PAGE),
               recipesFiltered: allRecipesOrder,
               currentPage: 0,
            };
         }

         if (action.payload === "hu") {
            const allRecipesOrder = [...state.recipesFiltered].sort(
               (prev, next) => {
                  if (prev.healthscore < next.healthscore) return 1;
                  if (prev.healthscore > next.healthscore) return -1;
                  return 0;
               }
            );
            return {
               ...state,
               allHomeRecipes: [...allRecipesOrder].splice(0, ITEMS_PAGE),
               recipesFiltered: allRecipesOrder,
               currentPage: 0,
            };
         }

         if (action.payload === "hd") {
            const allRecipesOrder = [...state.recipesFiltered].sort(
               (prev, next) => {
                  if (prev.healthscore > next.healthscore) return 1;
                  if (prev.healthscore < next.healthscore) return -1;
                  return 0;
               }
            );
            return {
               ...state,
               allHomeRecipes: [...allRecipesOrder].splice(0, ITEMS_PAGE),
               recipesFiltered: allRecipesOrder,
               currentPage: 0,
            };
         }

         if (action.payload === "none") {
            return {
               ...state,
               allHomeRecipes: [...state.allHomeRecipesCopy].splice(
                  0,
                  ITEMS_PAGE
               ),
            };
         }
         return;

      case FILTERBYSOURCE:
         const filterRecipes =
            action.payload === "ALL"
               ? (state.recipesFiltered = state.allHomeRecipesCopy)
               : state.recipesFiltered.filter((recipe) => {
                    if (action.payload === "API") {
                       if (isNaN(recipe.id)) return false;
                       return true;
                    } else if (isNaN(recipe.id)) return true;
                    return false;
                 });
         return {
            ...state,
            allHomeRecipes: filterRecipes.splice(0, ITEMS_PAGE),
            sourceFilter: action.payload,
         };

      case FILTERBYDIET:
         const filterDiets =
            action.payload === "ALL"
               ? (state.recipesFiltered = state.allHomeRecipesCopy)
               : state.recipesFiltered.filter((recipe) => {
                    if (recipe.diets.length) {
                       for (let i = 0; i < recipe.diets.length; i++) {
                          if (recipe.diets[i] === action.payload) return true;
                       }
                       return false;
                    } else if (recipe.diets === action.payload) return true;
                    return false;
                 });
         return {
            ...state,
            allHomeRecipes: filterDiets.splice(0, ITEMS_PAGE),
         };

      case GET_RECIPE_DETAIL:
         return {
            ...state,
            recipeDetails: action.payload,
         };

      case CLEAN_DETAIL:
         return {
            ...state,
            recipe: [],
         };

      case CREATE_RECIPE:
         return {
            ...state,
            allHomeRecipes: [],
         };

      case SEARCH_RECIPE:
         return {
            ...state,
            recipe: action.payload,
         };

      case GET_RECIPE_BY_ID:
         return {
            ...state,
            allHomeRecipes: action.payload,
         };

      case GET_RECIPE_BY_NAME:
         console.log(action.payload);
         return {
            ...state,
            filterRecipes: action.payload,
         };

      default:
         return state;
   }
};

export default reducer;
