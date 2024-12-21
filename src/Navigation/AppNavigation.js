import React from "react";
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import Authentication from "../Components/Authentication";
import Dashboard from "../Components/Dashboard";

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