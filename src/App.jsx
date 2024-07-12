import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Page1 from './page1';
import LoginForm from "./LoginForm/LoginForm";
import SignUp from "./SignUpForm/SignUp";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3001`)
      const data = await res.json();
      console.log(data);
    }
    fetchData();
  },[])
  return (
    <Router>
      <Routes>
        <Route path= "/" element= {<WelcomePage/>}/>
        <Route path= "/LoginForm" element= {<LoginForm/>}/>
        <Route path= "/SignUp" element= {<SignUp/>}/>
        <Route path= "/page1" element= {<Page1/>}/>
      </Routes>
    </Router>
  );
}

export default App
