/* eslint-disable no-unused-vars */
import style from "./SearchBar.module.css";
import { useState, useEffect } from "react";
import {
   getAllRecipes,
   getRecipesByName,
   getRecipesbyId,
   searchRecipas,
} from "../../redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = (getAllRecipes, re) => {
   const [searchTerm, setSearchTerm] = useState("");
   const [prevSerschTerm, setPrevSeachTerm] = useState("");
   const dispatch = useDispatch();

   const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
   };

   const handleClean = () => {
      setSearchTerm("");
   };

   const handleSearch = (event) => {
      event.preventDefault();
      if (parseInt(searchTerm)) dispatch(getRecipesbyId(searchTerm));
      else dispatch(getRecipesByName(searchTerm));
   };

   useEffect(() => {
      if (prevSerschTerm) {
         if (parseInt(prevSerschTerm)) getRecipesbyId(prevSerschTerm);
         else getRecipesByName(prevSerschTerm);
         setPrevSeachTerm("");
      }
   }, [prevSerschTerm]);

   return (
      <div className={style.contentSearchBar}>
         <input
            className={style.inputSearch}
            type="text"
            placeholder="Search recipes by name or ID"
            value={searchTerm}
            onChange={handleInputChange}
         />
         <button
            className={style.cleanButton}
            type="button"
            onClick={handleClean}
         >
            X
         </button>
         <button className={style.searchbutton} onClick={handleSearch}>
            Search!
         </button>
      </div>
   );
};

export default SearchBar;
