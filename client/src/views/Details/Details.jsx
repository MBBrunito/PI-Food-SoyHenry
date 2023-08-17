/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { cleanDetail, getRecipeDetail } from "../../redux/actions";
import style from "./Details.module.css";

export const Details = () => {
   const dispatch = useDispatch();
   const id = useParams();
   const recipeDetail = useSelector((state) => state.recipeDetails);

   useEffect(() => {
      dispatch(getRecipeDetail(id));
      return () => {
         dispatch(cleanDetail());
      };
   }, [dispatch, id]);
   console.log(recipeDetail);

   const handleHomeClick = () => {
      if (window.location.pathname === "/home") window.location.reload();
   };

   return (
      <div
         className={style.back}
         style={{ backgroundImage: `url(${recipeDetail?.image})` }}
      >
         {/* <div className={style.titId}> */}
         <div className={style.titleCont}>
            <h2 className={style.title}>{recipeDetail?.name}</h2>
         </div>
         <h3 className={style.h3}>ID: {recipeDetail?.id}</h3>
         {/* </div> */}
         <div className={style.recipeDetail}>
            <div>
               <div className={style.dietsCont}>
                  <h3 className={style.h3}>Diets:</h3>
                  <ul title="Diets" className={style.customList}>
                     {recipeDetail?.diets.map((diet, index) => {
                        return <li key={index}>{diet}</li>;
                     })}
                  </ul>
               </div>
               <div className={style.summaryCont}>
                  <h3 className={style.h3}>Summary</h3>
                  <div className={style.summary}>
                     <h3>{recipeDetail?.summary}</h3>
                  </div>
               </div>
            </div>
            <div className={style.steps}>
               <h3 className={style.h3}>Steps</h3>

               <ol className={style.customSteps}>
                  {recipeDetail?.steps.map((step, index) => (
                     <li key={index}>{step}</li>
                  ))}
               </ol>
            </div>
         </div>
         <NavLink
            className={style.goHomeImg}
            to="/home"
            onClick={handleHomeClick}
         >
            <img
               className={style.imgLogo}
               src="https://images.squarespace-cdn.com/content/v1/531dfad2e4b026b4af0daca0/1533059953767-KOEZJMDEU6NPUUTHVLTK/Back-Button.gif"
               alt="go back"
               title="Go back"
            />
         </NavLink>
      </div>
   );
};
