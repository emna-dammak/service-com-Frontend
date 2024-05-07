import Navbar from "./components/navbar/navbar";
import "./App.css";
import ServiceList from "./components/navbar/ServiceList";
import ServiceProviderList from "./components/navbar/ServiceProviderList";
import PlansArticle from "./components/navbar/PlansArticle";
import BrowseByCategory from "./components/navbar/BrowseByCategory";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="ml-[20vw] bg-gray-200 p-4">
        <ServiceList />
        <PlansArticle/>
        <ServiceProviderList/>
        <BrowseByCategory/>
      </div>

    </>
  );
}

export default App;
