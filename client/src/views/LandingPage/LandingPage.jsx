/* eslint-disable no-unused-vars */
import { useNavigate, NavLink } from "react-router-dom";
import style from "./LandingPage.module.css";

const LandingPage = () => {
   const navigate = useNavigate();

   const toHomePage = () => {
      navigate("/home");
   };

   return (
      <div className={style.landingPageContent}>
         <div className={style.titleContent}>
            <h1 className={style.h1Title}>Grandma's recipes</h1>
         </div>
         <NavLink className={style.buttonStart} to="/home">
            START
         </NavLink>
      </div>
   );
};

export default LandingPage;
