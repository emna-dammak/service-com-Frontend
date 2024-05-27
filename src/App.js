import Navbar from "./components/navbar/navbar";
import './App.css';
import ServiceList from "./components/ServiceList";
import ServiceListProvider from "./components/Manage";
import AuthPage from "./components/Auth/Auth";



function App() {
  return (
      <>
      
          <Navbar></Navbar>
          <div className="ml-[20vw] bg-gray-200 p-4">
            <ServiceListProvider /> {ServiceList}
          </div>
      </>
  );
}

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
