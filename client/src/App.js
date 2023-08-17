/* eslint-disable no-unused-vars */
import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import HomePage from "./views/HomePage/HomePage";
import { Details } from "./views/Details/Details";
import CreateForm from "./Components/CreateForm/CreateForm";

function App() {
   const [currentPage, setCurrentPage] = useState();
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
               path="/home"
               element={
                  <HomePage
                     currentPage={currentPage}
                     setCurrentPage={setCurrentPage}
                  />
               }
            />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/create" element={<CreateForm />} />
         </Routes>
      </div>
   );
}

export default App;
