import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./screen/Login";
import Home from "./screen/Home";
import Registration from "./screen/Registration";



function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/Home" element={<Home/>}></Route>
              <Route path="/Registration" element={<Registration/>}></Route>
          </Routes>
    
    </BrowserRouter>
  );
}

export default App;
