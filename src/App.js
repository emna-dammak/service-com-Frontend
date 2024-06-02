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


// function App() {
//   return (
//     <Router>
//     <>
//      <Navbar></Navbar>
//      <div className="ml-[20vw] bg-gray-200 p-4">
//      <Routes>
//             <Route path="/" element={<AdminAR />} />
//             <Route path="/cv/:id" element={<SpCv/>} />
//           </Routes>
//      </div>
//     </>
//     </Router>

//   );
// }


function App() {
  return (
    <Router>
    <>
     <Navbar></Navbar>
     <div className="ml-[20vw] bg-gray-200 p-4">
     <Routes>
            <Route path="/" element={<ServiceProviderList />} />
            <Route path="/profile/:id" element={<SpProfile />} />
          </Routes>
     </div>
    </>
    </Router>

  );
}


// function App() {
//   return (
//     <>
//      <AuthPage/>
//     </>
//   );
// }

export default App;
