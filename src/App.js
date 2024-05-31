import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./components/Auth/Auth";
import ChatInterface from "./components/chatInterface";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
        <Route path="/chat" element={<ChatInterface />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
