import Navbar from "./components/navbar/navbar";
import './App.css';
import ServiceList from "./components/ServiceList";
import ServiceListProvider from "./components/Manage";
import AuthPage from "./components/Auth/Auth";
import LandingPage from "./components/homepage/LandingPage";
import SubscriptionPacks from "./components/homepage/Packs";
import Services from "./components/homepage/Services";
import Categories from "./components/homepage/Categories";
import Footer from "./components/homepage/Footer";
import ServicePage from "./components/ServicePage/ServicePage";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "./components/homepage/Homepage";


const AppWrapper = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/HomePage/';

  return (
    <>
      {!isHomePage && <Navbar />}
      <div className={`bg-gray-200 p-4 ${!isHomePage ? 'ml-[20vw]' : ''}`}>
        <Routes>
          <Route exact path="/HomePage" element={<HomePage />} />
          <Route exact path="/service" element={<ServiceList />} />
          <Route path="/service/:id" element={<ServicePage />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};
/*
function App() {
  return (
      <>
      
          <Navbar></Navbar>
          <div className="ml-[20vw] bg-gray-200 p-4">
            <ServicePage />
          </div>
      </>
  );
}


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gray-200 p-4">
        <LandingPage />
        <SubscriptionPacks />
        <Services />
        <Categories />
      </div>
      <Footer/>
    </div>
  );
}
*/
/*
function App() {
  return (
   <>
       <AuthPage />
   </>
  );
}
*/
export default App;
