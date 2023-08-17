/* eslint-disable no-unused-vars */
import React from "react";
import style from "./Recipe.module.css";
import { NavLink } from "react-router-dom";

const Recipe = ({ name, id, image, diets, healthscore, summary, steps }) => {
   return (
      <div className={style.recipeCont}>
         <NavLink to={`/details/${id}`} className={style.link}>
            <div
               title={name}
               className={style.Recipe}
               style={{ backgroundImage: `url(${image})` }}
            >
               <h3 className={style.h3}>{name}</h3>
               <div className={style.diet}>
                  <ul title="Diets" className={style.customLi}>
                     {diets.map((diet, index) => {
                        return <li key={index}>{diet}</li>;
                     })}
                  </ul>
                  <h4 title="HealthScore" className={style.h4}>
                     HS: {healthscore}
                  </h4>
               </div>
            </div>
         </NavLink>
      </div>
   );
};

export default Recipe;
