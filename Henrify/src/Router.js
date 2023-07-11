import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';

const Router = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          
        </Route>
        
        <Route index element={<LandingPage/>}/>
      </Routes>
    </BrowserRouter>
   );
}
 
export default Router;