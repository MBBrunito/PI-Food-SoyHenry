/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
   const handleHomeClick = () => {
      if (window.location.pathname === "/home") window.location.reload();
   };

   return (
      <header>
         <div className={style.contentNavBar}>
            <nav className={style.navBar}>
               <NavLink className={style.goHomeImg} to="/">
                  <img
                     className={style.imgLogo}
                     src="https://city-confidential.com/img/plans/zuppa-madrid.gif"
                     alt="Go Wellcome"
                     title="Go Wellcome"
                  />
               </NavLink>
               <NavLink to="/Create" className={style.NewRecipe}>
                  📝Create New Recipe
               </NavLink>
               <NavLink
                  onClick={handleHomeClick}
                  className={style.goWelcome}
                  to="/home"
               >
                  🥣 Go to home
               </NavLink>
            </nav>
            <SearchBar />
         </div>
      </header>
   );
};

export default NavBar;
