
import Navbar from "./components/navbar/navbar";
import "./App.css";
import ServiceProviderList from "./components/ServiceProvider/ServiceProviderList";
import AuthPage from "./components/Auth/Auth";
import SpProfile from "./components/ServiceProvider/SpProfile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import ChatInterface from "./components/chatInterface";
function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<AuthPage />}></Route>

        <Route path="/chat" element={<> <Navbar></Navbar>
            <div className="ml-[20vw] bg-[#4B4B4B33]">
                <ChatInterface />
            </div></>}></Route>
           <Route path="/sp" element={
               <> <Navbar></Navbar>
                   <div className="ml-[20vw] bg-gray-200 p-4">
                       <ServiceProviderList />
                   </div></>} />
            <Route path="/profile/:id" element={
                <> <Navbar></Navbar>
                    <div className="ml-[20vw] bg-gray-200 p-4">
                        <SpProfile />
                    </div></>
                } />
      </Routes>
    

    </Router>

  );
}



export default App;
