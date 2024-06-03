
import Navbar from "./components/navbar/navbar";
import "./App.css";
import ServiceList from "./components/navbar/ServiceList";
import ServiceProviderList from "./components/ServiceProvider/ServiceProviderList";
import PlansArticle from "./components/navbar/PlansArticle";
import BrowseByCategory from "./components/navbar/BrowseByCategory";
import AuthPage from "./components/Auth/Auth";
import AdminAR from "./components/Admin/Admin_a-r";
import SpProfile from "./components/ServiceProvider/SpProfile";
import SpCv from "./components/Admin/SpCv";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./components/Auth/Auth";
import ChatInterface from "./components/chatInterface";
import Navbar from "./components/navbar/navbar";
function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<AuthPage />}></Route>

        <Route path="/chat" element={<> <Navbar></Navbar>
            <div className="ml-[20vw] bg-[#4B4B4B33]">
                <ChatInterface />
            </div></>}></Route>
           <Route path="/sp" element={<ServiceProviderList />} />
            <Route path="/profile/:id" element={<SpProfile />} />
      </Routes>
    

    </Router>

  );
}

 }

export default App;
