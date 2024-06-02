
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
      </Routes>
    </Router>

  );
}

export default App;
