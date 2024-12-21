import React from "react";
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import Dashboard from "../Components/Dashboard";
import Authentication from "../Pages/AuthenticationPage";

const AppNavigation = ()=> {
   return (
    
    <BrowserRouter>
    <Routes>
        <Route path="/" Component={Authentication}/>
        <Route path="/dashboard" Component={Dashboard}/>
    </Routes>
    </BrowserRouter>
   )


}

export default AppNavigation