import Navbar from "./components/navbar/navbar";
import './App.css';
import ServiceList from "./components/navbar/ServiceList";
import ServiceListProvider from "./components/navbar/Manage";


function App() {
  return (
      <>
          <Navbar></Navbar>
          <div className="ml-[20vw] bg-gray-200 p-4">
            <ServiceListProvider /> {ServiceListProvider}
          </div>
      </>
  );
}

export default App;
