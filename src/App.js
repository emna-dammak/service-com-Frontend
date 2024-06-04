import Navbar from "./components/navbar/navbar";
import "./App.css";
import ServiceProviderList from "./components/ServiceProvider/ServiceProviderList";
import AuthPage from "./components/Auth/Auth";
import SpProfile from "./components/ServiceProvider/SpProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import ChatInterface from "./components/chatInterface";
import ServiceList from "./components/ServiceList";
import ServicePage from "./components/ServicePage/ServicePage";
import HomePage from "./components/homepage/Homepage";
import AuthGuard from "./components/authGuard/authGuard";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="bg-gray-200 p-4">
                <HomePage />
              </div>
            </>
          }
        />
        <Route exact path="/login" element={<AuthPage />}></Route>
        <Route
          exact
          path="/service"
          element={
            <AuthGuard>
            <>

              <Navbar></Navbar>
              <div className="ml-[20vw] bg-gray-200 p-4">
                <ServiceList />
              </div>
            </>
            </AuthGuard>
          }
        />
        <Route
          path="/service/:id"
          element={
              <AuthGuard>
            <>

              <Navbar></Navbar>
              <div className="ml-[20vw] bg-gray-200 p-4">
                <ServicePage />
              </div>
            </>
              </AuthGuard>
          }
        />

        <Route
          path="/chat"
          element={
              <AuthGuard>
                  <>
                      <Navbar />
                      <div className="ml-[20vw] bg-[#4B4B4B33]">
                          <ChatInterface />
                      </div>
                  </>
              </AuthGuard>
          }
        ></Route>
        <Route
          path="/sp"
          element={
              <AuthGuard>
            <>

              <Navbar></Navbar>
              <div className="ml-[20vw] bg-gray-200 p-4">
                <ServiceProviderList />
              </div>
            </>
              </AuthGuard>
          }
        />
        <Route
          path="/profile/:id"
          element={
              <AuthGuard>
            <>

              <Navbar></Navbar>
              <div className="ml-[20vw] bg-gray-200 p-4">
                <SpProfile />
              </div>
            </>
              </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
