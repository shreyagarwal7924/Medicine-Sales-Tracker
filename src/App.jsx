import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Page1 from './Pages/page1';
import LoginForm from "./LoginForm/LoginForm";
import SignUp from "./SignUpForm/SignUp";
import Analytics from './Pages/Analytics'
import Products from './Pages/Products'
import Parties from './Pages/Parties'
import Orders from './Pages/Orders'

function App() {
  return (
    <Router>
      <Routes>
        <Route path= "/" element= {<WelcomePage/>}/>
        <Route path= "/LoginForm" element= {<LoginForm/>}/>
        <Route path= "/SignUp" element= {<SignUp/>}/>
        <Route path= "/page1" element= {<Page1/>}/>
        <Route path = '/Analytics' element= {<Analytics/>}> </Route>
        <Route path = '/Products' element= {<Products/>}> </Route>
        <Route path = '/Parties' element= {<Parties/>}> </Route>
        <Route path = '/Orders' element= {<Orders/>}> </Route>
      </Routes>
    </Router>
  );
}

export default App
