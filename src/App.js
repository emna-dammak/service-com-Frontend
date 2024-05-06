import Navbar from "./components/navbar/navbar";
import './App.css';
import ServiceList from "./components/navbar/ServiceList";


function App() {
  return (
      <>
          <Navbar></Navbar>
          <div className="ml-[20vw] bg-gray-200 p-4">
            <ServiceList /> {ServiceList}
          </div>
      </>
  );
}

export default App;
